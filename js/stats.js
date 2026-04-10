/* ── Stats CSV Import & Table Rendering ──
   Handles CSV upload, parsing, and stats table display.
*/

function handleStatsCSV(input){
  const file=input.files[0];
  if(!file) return;
  // Reset input value so re-uploading the same file triggers onchange again
  input.value='';
  const reader=new FileReader();
  reader.onload=e=>{
    const text = e.target.result;

    // ── Extract real report date ──
    // Priority:
    //  1. Filename  e.g. Agent_Status_Details_Report_03_21_2026__3_.csv → 2026-03-21
    //  2. CSV line  e.g. "AGENT STATUS DETAIL REPORTS 2026-03-21 07:31:57"
    //  3. CSV Time Range end date
    //  4. Today as last resort
    let reportDate = getTodayGY();

    // 1 — Filename: matches MM_DD_YYYY anywhere in the name
    const mf = file.name.match(/(\d{2})_(\d{2})_(\d{4})/);
    if(mf){
      reportDate = `${mf[3]}-${mf[1]}-${mf[2]}`;
    } else {
      // 2 — CSV content: "AGENT STATUS DETAIL REPORTS YYYY-MM-DD HH:MM:SS"
      const m1 = text.match(/AGENT STATUS DETAIL REPORTS\s+(\d{4}-\d{2}-\d{2})/i);
      if(m1){ reportDate = m1[1]; }
      else {
        // 3 — Time Range end date: "To YYYY-MM-DD"
        const m2 = text.match(/To\s+(\d{4}-\d{2}-\d{2})/i);
        if(m2){ reportDate = m2[1]; }
      }
    }

    pendingCSVData={text, filename:file.name, date:reportDate};
    selectedExpiryDays=7;
    updateExpiryDisplay();

    // Show the detected date to the admin before they confirm
    const picker = document.getElementById('expiry-picker');
    picker.style.display='';
    // Pre-fill the date override field with detected date
    const overrideEl = document.getElementById('csv-date-override');
    if(overrideEl) overrideEl.value = reportDate;
  };
  reader.readAsText(file);
}

function selectExpiry(days,btn){
  selectedExpiryDays=days;
  document.querySelectorAll('.expiry-opt').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  document.getElementById('custom-expiry-days').value='';
  updateExpiryDisplay();
}

function selectCustomExpiry(val){
  const n=parseInt(val);
  if(!n||n<1) return;
  selectedExpiryDays=n;
  document.querySelectorAll('.expiry-opt').forEach(b=>b.classList.remove('active'));
  updateExpiryDisplay();
}

function updateExpiryDisplay(){
  const d=new Date();
  d.setDate(d.getDate()+selectedExpiryDays);
  document.getElementById('expiry-date-display').textContent=d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
}

async function confirmCSVUpload(){
  if(!pendingCSVData) return;

  // Force fresh roster reload from Google Sheet to get latest IDs and teams
  const uploadBtn = document.querySelector('#expiry-picker button');
  if(uploadBtn){ uploadBtn.textContent = '⏳ Loading roster...'; uploadBtn.disabled = true; }
  rosterLoaded = false;
  await loadRoster();
  if(uploadBtn){ uploadBtn.textContent = '✅ UPLOAD & SAVE REPORT'; uploadBtn.disabled = false; }

  const expiryDate=new Date();
  expiryDate.setDate(expiryDate.getDate()+selectedExpiryDays);

  // Parse CSV first
  parseStatsCSV(pendingCSVData.text);

  // Save to Firebase — same date = overwrite (set not add)
  try{
    await db.collection('reports').doc(pendingCSVData.date).set({
      date: pendingCSVData.date,
      filename: pendingCSVData.filename,
      uploadedAt: firebase.firestore.FieldValue.serverTimestamp(),
      expiryDate: expiryDate.toISOString().split('T')[0],
      expiryDays: selectedExpiryDays,
      agentCount: statsData.length,
      // Store parsed data for reload
      statsJSON: JSON.stringify(statsData)
    });
    console.log('Report saved to Firebase — date:', pendingCSVData.date);
  }catch(e){ console.error('Report save error:',e); }

  document.getElementById('expiry-picker').style.display='none';
  document.getElementById('csv-date-lbl').textContent='📅 '+pendingCSVData.date;
  document.getElementById('csv-expiry-lbl').textContent='🗑 Expires: '+expiryDate.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});

  // Show matched vs total count — helps diagnose why CSV total ≠ marked count
  const rosterIds = new Set(Object.keys(ROSTER));
  const matched   = statsData.filter(a => a.ytelId && rosterIds.has(a.ytelId)).length;
  const total     = statsData.length;
  const unmatched = statsData.filter(a => !a.ytelId || !rosterIds.has(a.ytelId));
  const matchLbl  = document.getElementById('csv-match-lbl');
  if(matchLbl){
    matchLbl.textContent = total + ' in CSV · ' + matched + ' matched roster';
    matchLbl.style.color = matched < total ? 'var(--gold)' : 'var(--green)';
  }
  if(unmatched.length){
    console.warn('⚠️ CSV agents NOT matched to roster (' + unmatched.length + '):', unmatched.map(a=>a.nameRaw+'(ID:'+a.ytelId+')').join(', '));
  }
  statsDataDate = pendingCSVData.date;
  pendingCSVData=null;

  updateGoalBars();
  renderStatsTable();

  // Reload report history so the new upload appears in the buttons immediately
  await loadReportHistory();

  // Clear weekly performance cache so it rebuilds with new data on next view
  wpAllReports = [];
  wpWeekRanges = [];

  // If weekly performance tab is currently open, refresh it immediately
  const wpEl = document.getElementById('admin-weekperf');
  if(wpEl && wpEl.style.display !== 'none'){
    loadWeeklyPerformance();
  }

  // Refresh daily overview if it's open — same-day upload should update transfer counts
  const ovEl = document.getElementById('admin-overview');
  if(ovEl && ovEl.style.display !== 'none'){
    loadAdminOverview();
  }
  // Refresh team breakdown popup if open
  refreshBreakdownIfOpen();
}

// ── CANONICAL TEAM RESOLVER ──
// Priority:
//  1. ytelId  → ROSTER lookup (most reliable)
//  2. nameRaw prefix  → GUYP=PR, GUY/GUYB=BB (direct CSV source)
//  3. ytelName in ROSTER (agent.name exact match → use ytelName prefix)
//  4. Fallback to saved team value
function resolveAgentTeam(agent){
  const rosterAgents = Object.values(ROSTER);

  // Helper: get team from a ytelName string
  // GUYP = Providence (PR), GUYB = Berbice (BB)
  // Plain GUY (no suffix) = ambiguous, return null so caller uses other signals
  const teamFromYtel = (yn)=>{
    const u = (yn||'').toUpperCase().replace(/[\s-]/g,'');
    if(u.startsWith('GUYP')) return 'PR';
    if(u.startsWith('GUYB')) return 'BB';
    return null;
  };

  // 1. nameRaw prefix from saved CSV — HIGHEST PRIORITY
  // GUYP = Providence (PR), GUYB = Berbice (BB)
  // This is the most direct signal and must not be overridden by stale ROSTER data
  if(agent.nameRaw){
    const t = teamFromYtel(agent.nameRaw);
    if(t) return t;
  }

  // 2. ytelId → ROSTER lookup → use ytelName prefix
  if(agent.ytelId){
    const r = ROSTER[String(agent.ytelId).trim()];
    if(r){ return teamFromYtel(r.ytelName) || r.team || 'BB'; }
  }

  // 3. Match name in ROSTER → use that entry's ytelName
  const nameLow = (agent.name||'').toLowerCase().trim();
  const parts   = nameLow.split(' ').filter(p=>p.length>1);
  const first   = parts[0]||'';
  const last    = parts[parts.length-1]||'';

  // Exact name match first
  let match = rosterAgents.find(r=>r.name.toLowerCase()===nameLow);

  // First + last name match (both must be 2+ chars)
  if(!match && first.length>=2 && last.length>=2 && first!==last){
    match = rosterAgents.find(r=>{
      const rn = r.name.toLowerCase();
      const rp = rn.split(' ').filter(p=>p.length>1);
      return rp[0]===first && rp[rp.length-1]===last;
    });
  }

  if(match){ return teamFromYtel(match.ytelName) || match.team || 'BB'; }

  // 4. Keep saved value
  return agent.team || 'BB';
}

// ── CHECK IF AN AGENT IS INACTIVE ──
// Used to filter out inactive roster entries from the stats table and weekly performance
function isAgentInactive(agent){
  const nameLow = (agent.name||'').toLowerCase().trim();

  // 1. NH tag means "New Hire" — NOT inactive. Do NOT filter based on NH alone.
  //    NH agents are shown unless they are explicitly inactive in the roster.
  //    (Old behaviour of skipping all NH agents has been removed.)

  // 2. Known NH agent names — these people are confirmed inactive
  // Only list agents confirmed permanently inactive/terminated — do NOT put active trainees here
  const knownNH = ['angelica alert','esha singh','keisha graig'];
  if(knownNH.some(n=>nameLow===n)) return true;

  // 3. Hardcoded INACTIVE_AGENTS list
  if(INACTIVE_AGENTS.some(n=>n.toLowerCase()===nameLow)) return true;

  // 4. ytelId found in ROSTER — check status
  if(agent.ytelId){
    const inRoster = ROSTER[String(agent.ytelId).trim()];
    if(inRoster && (inRoster.status||'').toLowerCase()==='inactive') return true;
    // NOTE: Do NOT mark agents as inactive just because their ID is missing from
    // the current ROSTER — ID mismatches happen due to CSV format, new hires, or
    // roster sync delays. Only explicitly inactive entries should be filtered.
  }

  // 5. Check by name in ROSTER — if found and inactive
  const byName = Object.values(ROSTER).find(r=>r.name.toLowerCase()===nameLow);
  if(byName && (byName.status||'').toLowerCase()==='inactive') return true;

  return false;
}

function parseStatsCSV(text){
  // Normalize line endings — Windows CSVs use \r\n, strip \r so splits are clean
  const lines = text.trim().replace(/\r\n/g,'\n').replace(/\r/g,'\n').split('\n');
  if(!lines.length) return;

  // ── AUTO-DETECT DELIMITER (comma vs semicolon) ──
  // Some computers (LibreOffice, non-English locales) export CSVs with semicolons.
  // Count occurrences in the header line to decide which delimiter to use.
  const firstLine = lines[0];
  const commaCount = (firstLine.match(/,/g)||[]).length;
  const semiCount  = (firstLine.match(/;/g)||[]).length;
  const DELIM = semiCount > commaCount ? ';' : ',';
  if(DELIM === ';') console.log('⚠️ CSV uses semicolon delimiter — adjusting parser');

  // Parse headers — strip BOM, quotes, spaces
  const headers = firstLine.split(DELIM).map(h=>h.replace(/^\uFEFF/,'').replace(/^"|"$/g,'').trim());

  // Build column index map by header name
  const col = {};
  headers.forEach((h,i)=>{ col[h.trim()]=i; });

  // Key columns — find by name regardless of position
  const getCol = (...names) => {
    for(const n of names){
      if(col[n]!==undefined) return col[n];
    }
    return -1;
  };

  const iCalls  = getCol('CALLS');
  const iCI     = getCol('CIcalls','CI');
  const iXfer   = getCol('XFER','TRANSFER','XFERS');
  const iDNC    = getCol('DNC');
  const iNI     = getCol('NI','NOINTR');
  const iHangup = getCol('HANGUP');
  const iSpnsh  = getCol('Spnsh','SPANISH');
  const iCRPull = getCol('CRPULL');
  const iCallbk = getCol('CALLBK','CALLBACK');
  const iDNCCI  = getCol(' DNC/CI','DNC/CI');
  const iName   = getCol('User Name','USER NAME');

  statsData     = [];
  statsDataDate = '';

  for(let i=1;i<lines.length;i++){
    const raw = lines[i];
    if(!raw.trim()) continue;

    // Parse CSV line properly handling quoted fields
    const cols = parseCSVLine(raw, DELIM);
    if(!cols.length) continue;

    const nameRaw = cols[iName]||'';
    // Skip total row, meta rows, empty rows
    if(!nameRaw || nameRaw.startsWith('TOTAL') || nameRaw.startsWith('AGENT STATUS') || nameRaw.startsWith('Time Range')) continue;

    // Extract 4-digit Ytel ID from the end of the User Name field
    // e.g. "GUY Angel Narine - 4413" → "4413"
    // Also works for NH-tagged names: "GUY Akeem Sullivan NH - 4446" → "4446"
    const csvIdMatch = nameRaw.match(/-\s*(\d{4,})\s*$/);
    const csvYtelId  = csvIdMatch ? csvIdMatch[1].trim() : null;

    // ── ROSTER LOOKUP — ID-first matching ──
    // ROSTER is guaranteed loaded at this point because parseStatsCSV
    // is only called from confirmUpload which runs after loadRoster()
    // NOTE: NH in the Ytel name means "New Hire" (trainee) — NOT inactive.
    // We do the roster lookup BEFORE any NH filtering so active trainees
    // tagged NH in Ytel are never dropped incorrectly.
    const rosterAgents = Object.values(ROSTER);

    // Clean name — strip prefix (GUY/GUYB/GUYP/GUYP4), NH suffix, and extension number
    const name = nameRaw
      .replace(/^GUYP\d*\s+/i,'')
      .replace(/^GUYB\d*\s+/i,'')
      .replace(/^GUY\s+/i,'')
      .replace(/^GUY[PB]?\d*-/i,'')
      .replace(/\s+NH\s*$/i,'')        // strip trailing NH suffix before the dash
      .replace(/\s+NH\s+-/i,' -')      // strip NH between name and ID dash
      .replace(/\s*-\s*\d{4,}$/,'')
      .trim();

    if(!name) continue;

    // ── ID-FIRST ROSTER MATCH ──
    // Step 1: match by the 4-digit ID extracted above (most reliable)
    let rosterMatch = null;
    if(csvYtelId){
      rosterMatch = ROSTER[csvYtelId] || rosterAgents.find(r => String(r.userId).trim() === csvYtelId) || null;
    }

    // Step 2: fallback — match by name if no ID match
    if(!rosterMatch){
      const nameLow = name.toLowerCase().trim();
      rosterMatch = rosterAgents.find(r => r.name.toLowerCase() === nameLow) || null;
      if(!rosterMatch){
        const cParts = nameLow.split(' ');
        const cF = cParts[0], cL = cParts[cParts.length-1];
        rosterMatch = rosterAgents.find(r => {
          const rn = r.name.toLowerCase().split(' ');
          const rF = rn[0], rL = rn[rn.length-1];
          return rF === cF && cL.length > 2 && rL.length > 2
            && (rL.startsWith(cL.substring(0,4)) || cL.startsWith(rL.substring(0,4)));
        }) || null;
      }
    }

    // ── NH means "New Hire" — always include NH agents regardless of roster match ──
    // NH agents appear in the CSV because they are active; never skip them.

    if(!rosterMatch){
      console.warn('⚠️ No roster match for CSV agent — including with prefix fallback:', nameRaw, 'ID:', csvYtelId);
    }

    // ── TEAM RESOLUTION ──
    // Priority: (1) roster Team column when matched → most reliable
    //           (2) GUYP/GUYB prefix in nameRaw → prefix-based fallback
    //           (3) Default BB
    let team;
    if(rosterMatch && rosterMatch.team){
      const teamUp = rosterMatch.team.toUpperCase().trim();
      if(teamUp === 'PROVIDENCE' || teamUp === 'PR') team = 'PR';
      else if(teamUp === 'BERBICE' || teamUp === 'BB') team = 'BB';
      else team = rosterMatch.team; // keep as-is if custom value
    } else {
      // Prefix fallback — handles GUYP = Providence, GUYB = Berbice
      // Plain GUY (no P/B suffix) is ambiguous — do NOT default to BB.
      // For plain GUY names, try to match by ID or name in ROSTER one more time
      // to get the saved team, then fall back to BB only as a last resort.
      const ynRaw = nameRaw.toUpperCase().replace(/[\s-]/g,'');
      const prefixClean = ynRaw.replace(/^(GUYP|GUYB)\d+/, '$1');
      if(prefixClean.startsWith('GUYP'))      team = 'PR';
      else if(prefixClean.startsWith('GUYB')) team = 'BB';
      else {
        // Plain GUY prefix — look up saved team from Firebase roster by ID or name
        let savedTeam = null;
        if(csvYtelId) {
          const fbEntry = ROSTER[csvYtelId] || Object.values(ROSTER).find(r=>String(r.userId).trim()===csvYtelId);
          if(fbEntry && fbEntry.team) savedTeam = fbEntry.team;
        }
        if(!savedTeam) {
          const nameLow = name.toLowerCase().trim();
          const fbEntry = Object.values(ROSTER).find(r=>r.name.toLowerCase()===nameLow);
          if(fbEntry && fbEntry.team) savedTeam = fbEntry.team;
        }
        if(savedTeam === 'PR' || savedTeam === 'BB') {
          team = savedTeam;
          console.log(`ℹ️ Plain GUY prefix — team from Firebase roster: ${team} for`, nameRaw);
        } else {
          console.warn('⚠️ Team unresolved — defaulting BB:', nameRaw, 'ID:', csvYtelId);
          team = 'BB';
        }
      }
    }

    const n = s => parseInt((cols[s]||'0').replace(/[^0-9]/g,''))||0;

    const calls  = n(iCalls);
    const ci     = n(iCI);
    const xfer   = n(iXfer);
    const dnc    = n(iDNC);
    const ni     = n(iNI);
    const hangup = n(iHangup);
    const spnsh  = n(iSpnsh);
    const crpull = n(iCRPull);
    const callbk = n(iCallbk);
    const conv   = calls > 0 ? parseFloat(((xfer/calls)*100).toFixed(1)) : 0;

    statsData.push({name, nameRaw, ytelId: csvYtelId||'', team, calls, ci, xfer, dnc, ni, hangup, spnsh, crpull, callbk, conv});
  }

  console.log('CSV parsed:', statsData.length, 'agents | delimiter:', DELIM === ',' ? 'comma' : 'semicolon');
}

// Proper CSV line parser — handles quoted fields with commas or semicolons inside
// Pass the delimiter character detected from the header line (default: comma)
function parseCSVLine(line, delim){
  // Strip trailing \r in case of Windows \r\n line endings
  line = line.replace(/\r$/,'');
  delim = delim || ',';
  const result=[];
  let cur='', inQ=false;
  for(let i=0;i<line.length;i++){
    const c=line[i];
    if(c==='"'){ inQ=!inQ; }
    else if(c===delim&&!inQ){ result.push(cur.trim()); cur=''; }
    else cur+=c;
  }
  result.push(cur.trim());
  return result;
}

function renderStatsTable(){
  const tbody = document.getElementById('stats-tbody');
  const today = getTodayGY();
  const isOldReport = statsDataDate && statsDataDate !== today;

  if(!statsData.length){
    tbody.innerHTML=`<tr><td colspan="9" style="text-align:center;padding:40px;">
      <div style="font-family:'Barlow Condensed',sans-serif;font-size:1.3rem;font-weight:800;color:#64748b;letter-spacing:2px;margin-bottom:12px;">NO DATA YET</div>
      <div style="margin-bottom:16px;">
        <button onclick="document.getElementById('stats-csv-upload').click()" style="padding:12px 28px;border-radius:10px;border:none;background:linear-gradient(90deg,var(--accent),var(--cyan));color:#000;font-family:'Barlow Condensed',sans-serif;font-size:1.1rem;font-weight:800;letter-spacing:2px;cursor:pointer;">⬆ CLICK HERE TO UPLOAD CSV</button>
      </div>
      <div style="font-size:0.72rem;color:#3a4a6a;">Upload a daily CSV report to see agent stats</div>
    </td></tr>`;
    return;
  }

  // Show banner if viewing an old report
  const bannerEl = document.getElementById('old-report-banner');
  if(bannerEl) bannerEl.style.display = isOldReport ? '' : 'none';
  const bannerTxt = document.getElementById('old-report-date');
  if(bannerTxt && isOldReport) bannerTxt.textContent = statsDataDate;

  const q=(document.getElementById('stats-search')||{value:''}).value.toLowerCase();
  let rows=[...statsData].filter(r=>!isAgentInactive(r) && (!q||r.name.toLowerCase().includes(q)));
  const keys=['name','calls','ci','xfer','dnc','ni','conv'];
  rows.sort((a,b)=>typeof a[keys[statsSortCol]]==='string'
    ? a[keys[statsSortCol]].localeCompare(b[keys[statsSortCol]])*statsSortDir
    : (a[keys[statsSortCol]]-b[keys[statsSortCol]])*statsSortDir);

  if(!rows.length){
    tbody.innerHTML='<tr><td colspan="9" style="text-align:center;color:var(--muted);padding:16px;">No agents match search.</td></tr>';
    return;
  }
  tbody.innerHTML=rows.map((r,i)=>{
    const cc=r.conv>=5?'var(--green)':r.conv>=2?'var(--gold)':'var(--red)';
    const team=r.team==='BB'?'<span style="color:var(--accent);font-size:0.72rem;font-weight:800;">BB</span>':'<span style="color:var(--purple);font-size:0.72rem;font-weight:800;">PR</span>';
    return `<tr onclick="openRepProfile('',${JSON.stringify(r.name)},'${r.team}','')">
      <td style="color:var(--muted);font-size:0.7rem;">${i+1}</td>
      <td style="font-weight:700;">${r.name}</td>
      <td>${team}</td>
      <td>${r.calls.toLocaleString()}</td>
      <td>${r.ci.toLocaleString()}</td>
      <td><span class="att-badge att-p">${r.xfer}</span></td>
      <td><span class="att-badge att-a">${r.dnc}</span></td>
      <td><span class="att-badge att-l">${r.ni}</span></td>
      <td style="color:${cc};font-weight:800;">${r.conv}%</td>
    </tr>`;
  }).join('');
}

function sortStats(col){
  statsSortDir=statsSortCol===col?-statsSortDir:-1;
  statsSortCol=col;
  renderStatsTable();
}
function filterStatsTable(){ renderStatsTable(); }

// ── REP PROFILE ──
// ══════════════════════════════════════════════
//  FULL AGENT ANALYSIS PANEL
// ══════════════════════════════════════════════

async function openRepProfile(id,name,team,shift){
  // Always resolve full agent from ROSTER — id may be empty or stale (e.g. stats table)
  const rAll = Object.values(ROSTER);
  const rKeys = Object.keys(ROSTER);
  let rAgent = (id && id!=='') ? ROSTER[String(id)] : null;
  if(!rAgent && name){
    const nl = name.toLowerCase();
    rAgent = rAll.find(r=>r.name.toLowerCase()===nl)
          || rAll.find(r=>r.name.toLowerCase().includes(nl.split(' ')[0]) && r.name.toLowerCase().includes(nl.split(' ').slice(-1)[0]));
  }
  // Get the actual userId key from ROSTER map
  const resolvedId = rAgent
    ? String(rKeys.find(k=>ROSTER[k]===rAgent)||id||'')
    : String(id||'');

  // Pull break time from Firebase
  let brk = '';
  if(resolvedId && resolvedId!==''&&resolvedId!=='unknown'){
    try{
      const bSnap = await db.collection('roster').doc(resolvedId).get();
      if(bSnap.exists) brk = bSnap.data().brk||'';
    }catch(e){}
  }

  currentRepProfile = {
    id:     resolvedId,
    name:   rAgent ? rAgent.name   : name,
    team:   rAgent ? rAgent.team   : (team||'BB'),
    shift:  rAgent ? rAgent.shift  : (shift||''),
    lunch:  rAgent ? rAgent.lunch  : '',
    brk,
    status: rAgent ? (rAgent.status||'Agent') : 'Agent'
  };

  const p = currentRepProfile;
  const teamFull = p.team==='BB'?'Berbice':p.team==='PR'?'Providence':(p.team||'—');
  document.getElementById('rp-name').textContent          = p.name;
  document.getElementById('ap-avatar').textContent        = p.name.split(' ').map(x=>x[0]||'').join('').substring(0,2).toUpperCase();
  document.getElementById('rp-meta').textContent          = 'ID: '+(resolvedId||'—')+' · Lunch: '+(p.lunch||'—');
  document.getElementById('ap-team-badge').textContent    = p.team+' · '+teamFull;
  document.getElementById('ap-status-badge').textContent  = p.status;
  document.getElementById('ap-shift-badge').textContent   = p.shift||'No shift';

  document.getElementById('rep-profile-overlay').classList.add('open');
  document.body.style.overflow='hidden';

  // Pre-load monthly cache if not yet populated (so attendance data shows immediately)
  if(Object.keys(monthlyCache).length === 0){
    loadMonthlyAttendance().catch(()=>{}).then(()=>{
      // Refresh overview after monthly loads if still on that tab
      if(currentRepProfile && document.getElementById('apt-overview')?.classList.contains('active')){
        apLoadOverview(currentRepProfile.id, currentRepProfile.name);
      }
    });
  }

  apTab('overview', document.getElementById('apt-overview'));
}

