// ── ADMIN SUB-TAB LOADER ──────────────────────────────────────────
// Each admin sub-tab's HTML lives in admin/{name}.html
// It is fetched once on first click and injected into id="admin-{name}"
const _adminTabLoaded = {};
function loadAdminSection(tab, callback) {
  if (_adminTabLoaded[tab]) { if (callback) callback(); return; }
  fetch('admin/' + tab + '.html?nc=' + Date.now())
    .then(r => r.text())
    .then(html => {
      const el = document.getElementById('admin-' + tab);
      if (el) el.innerHTML = html;
      _adminTabLoaded[tab] = true;
      if (callback) callback();
    })
    .catch(err => {
      console.error('[Admin Loader] Failed to load admin section:', tab, err);
      if (callback) callback();
    });
}

/* ── Admin Panel: Overview, Goals, Team Breakdown, Attendance ──
   All admin-only functions.
*/

function showAdminUI(){
  document.body.classList.add('is-admin');
  // Force fresh roster load immediately so all admin views have correct data
  rosterLoaded = false;
  loadRoster().then(() => {
    // Start auto-polling AFTER initial load so first fingerprint is accurate
    startRosterPolling();
  });
  // Load saved goal
  db.collection('config').doc('settings').get().then(snap=>{
    if(snap.exists && snap.data().goal){
      dailyGoal = snap.data().goal;
      const el = document.getElementById('goal-val-display');
      if(el) el.textContent = dailyGoal;
    }
  }).catch(()=>{});

  // ── REAL-TIME LISTENER: today's stats report ──
  // When any admin uploads a CSV, this fires on ALL open admin sessions
  // so the Daily Overview goal bars update automatically without a page reload.
  if(_todayReportListener) _todayReportListener(); // detach previous listener if any
  const todayStr = getTodayGY();
  _todayReportListener = db.collection('reports').doc(todayStr)
    .onSnapshot(snap=>{
      if(!snap.exists || !snap.data().statsJSON) return;
      try{
        const d = snap.data();
        // Only apply if this is newer than what we have (avoid no-op re-renders)
        if(d.statsJSON && d.date === todayStr){
          statsData = JSON.parse(d.statsJSON);
          // Team was already resolved correctly at upload time — do NOT re-resolve here.
          // Re-running resolveAgentTeam on reload causes BB/PR to swap when the ROSTER
          // is stale or an agent isn't found, because it falls back to 'BB' for everyone.
          statsDataDate = todayStr;
          updateGoalBars();
          // If the Daily Overview tab is currently open, refresh the overview too
          const ovEl = document.getElementById('admin-overview');
          if(ovEl && ovEl.style.display !== 'none') loadAdminOverview();
          // Refresh team breakdown popup if open
          refreshBreakdownIfOpen();
          // If Agent Stats tab is open, refresh its table
          const stEl = document.getElementById('admin-stats');
          if(stEl && stEl.style.display !== 'none'){
            renderStatsTable();
            renderReportHistory();
          }
        }
      }catch(e){ console.warn('Live report listener parse error:', e); }
    }, e=>{ console.warn('Live report listener error:', e); });
}

// ── SWITCH ADMIN SUBTAB ──
function switchAdminTab(tab, btn){
  // Lazy-load this sub-tab's HTML if not already loaded
  loadAdminSection(tab, function() { _activateAdminTab(tab, btn); });
}

function _activateAdminTab(tab, btn){
  // Hide all regular tab pages
  document.querySelectorAll('.tab-page').forEach(p=>{
    p.classList.remove('active');
    p.classList.remove('admin-page-active');
  });
  // Show admin page — CSS body.is-admin + .admin-page-active makes it visible
  const adminPage = document.getElementById('page-admin');
  if(adminPage) adminPage.classList.add('admin-page-active');
  // Update tab button highlight
  document.querySelectorAll('.tab-btn,.admin-tab-btn').forEach(b=>b.classList.remove('active'));
  const adminBtn = document.getElementById('tab-admin');
  if(adminBtn) adminBtn.classList.add('active');
  // Show correct sub-section
  ['overview','attendance','weekly','monthly','stats','profiles','coaching','monitoring','rebuttal','weekperf'].forEach(t=>{
    const el=document.getElementById('admin-'+t);
    if(el) el.style.display = t===tab?'':'none';
    const b=document.getElementById('atab-'+t);
    if(b) b.classList.toggle('active',t===tab);
  });
  if(tab==='profiles')    loadAgentProfiles();
  if(tab==='overview')    loadAdminOverview();
  if(tab==='attendance')  loadAdminAttendance();
  if(tab==='weekly')      loadWeeklyAttendance('BB');
  if(tab==='monthly')     loadMonthlyAttendance();
  if(tab==='coaching')    loadCoachingNotes();
  if(tab==='monitoring')  loadMonitoringNotes();
  if(tab==='rebuttal')    loadRebuttalIntel();
  if(tab==='weekperf')   loadWeeklyPerformance();
  if(tab==='stats'){
    rosterLoaded = false;
    loadRoster().then(()=>{
      // Only auto-render if statsData is already loaded AND it's from today
      if(statsData.length && statsDataDate === getTodayGY()) renderStatsTable();
      // Only auto-load a previous report if it's from TODAY
      if(!statsData.length && reportHistory.length){
        const todayReport = reportHistory.find(r=>r.date===getTodayGY());
        if(todayReport){
          const idx = reportHistory.indexOf(todayReport);
          loadReportByIndex(idx);
        }
        // If no today report exists — show empty state, don't load stale data
      }
    });
    loadReportHistory();
    adminStatsTapCount++;
    clearTimeout(adminStatsTapTimer);
    adminStatsTapTimer = setTimeout(()=>{adminStatsTapCount=0;},1800);
    if(adminStatsTapCount>=5){
      adminStatsTapCount=0;
      clearTimeout(adminStatsTapTimer);
      const tabBtn=document.getElementById('tab-admin');
      if(tabBtn){tabBtn.style.borderColor='#34d399';tabBtn.style.color='#34d399';setTimeout(()=>{tabBtn.style.borderColor='';tabBtn.style.color='';},600);}
      document.getElementById('stats-csv-upload').click();
    }
  }
}

// ── EDIT GOAL ──
async function editGoal(){
  const val = prompt('Set daily transfer goal (current: '+dailyGoal+'):',dailyGoal);
  if(!val||isNaN(val)) return;
  dailyGoal = parseInt(val);
  document.getElementById('goal-val-display').textContent = dailyGoal;
  try{ await db.collection('config').doc('settings').set({goal:dailyGoal},{merge:true}); }catch(e){}
  updateGoalBars();
}

// ── UPDATE GOAL BARS ──
function updateGoalBars(){
  const today      = getTodayGY();
  const hasToday   = statsDataDate === today && statsData.length > 0;

  const bbXfer  = hasToday ? statsData.filter(r=>r.team==='BB').reduce((s,r)=>s+r.xfer,0) : 0;
  const prXfer  = hasToday ? statsData.filter(r=>r.team==='PR').reduce((s,r)=>s+r.xfer,0) : 0;
  const combined = bbXfer + prXfer;
  const combPct  = dailyGoal > 0 ? Math.min(Math.round((combined/dailyGoal)*100),100) : 0;

  // Combined bar
  const combEl    = document.getElementById('combined-xfer');
  const combBar   = document.getElementById('combined-bar');
  const combPctEl = document.getElementById('combined-pct');
  if(combEl)    combEl.textContent    = hasToday ? combined+' / '+dailyGoal : '— / '+dailyGoal;
  if(combBar)   combBar.style.width   = combPct+'%';
  if(combPctEl) combPctEl.textContent = hasToday ? combPct+'% of goal' : 'Upload today\'s CSV to see progress';

  // BB bar
  const bbPct   = dailyGoal > 0 ? Math.min(Math.round((bbXfer/dailyGoal)*100),100) : 0;
  const bbVal   = document.getElementById('bb-xfer-val');
  const bbBar   = document.getElementById('bb-xfer-bar');
  const bbPctEl = document.getElementById('bb-xfer-pct');
  if(bbVal)   bbVal.textContent   = hasToday ? bbXfer : '—';
  if(bbBar)   bbBar.style.width   = bbPct+'%';
  if(bbPctEl) bbPctEl.textContent = hasToday ? bbXfer+' transfers' : 'No data yet';

  // PR bar
  const prPct   = dailyGoal > 0 ? Math.min(Math.round((prXfer/dailyGoal)*100),100) : 0;
  const prVal   = document.getElementById('pr-xfer-val');
  const prBar   = document.getElementById('pr-xfer-bar');
  const prPctEl = document.getElementById('pr-xfer-pct');
  if(prVal)   prVal.textContent   = hasToday ? prXfer : '—';
  if(prBar)   prBar.style.width   = prPct+'%';
  if(prPctEl) prPctEl.textContent = hasToday ? prXfer+' transfers' : 'No data yet';
}

// Tracks which team's breakdown popup is currently open (null = closed)
let openBreakdownTeam = null;

function renderTeamBreakdown(team){
  const title   = document.getElementById('tbm-title');
  const sub     = document.getElementById('tbm-subtitle');
  const totalEl = document.getElementById('tbm-total');
  const tbody   = document.getElementById('tbm-tbody');

  if(team==='BB'){
    title.textContent   = '🏠 Berbice (BB) — Rep Breakdown';
    title.style.color   = 'var(--accent)';
    totalEl.style.color = 'var(--accent)';
  } else {
    title.textContent   = '🌴 Providence (PR) — Rep Breakdown';
    title.style.color   = 'var(--purple)';
    totalEl.style.color = 'var(--purple)';
  }

  // Filter and sort by transfers desc
  const agents = statsData.filter(r=>r.team===team).sort((a,b)=>b.xfer-a.xfer);
  const teamTotal = agents.reduce((s,r)=>s+r.xfer,0);
  sub.textContent     = agents.length + ' agents · ' + getTodayGY();
  totalEl.textContent = teamTotal + ' transfers';

  if(!agents.length){
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:20px;">No data for this team yet.</td></tr>`;
  } else {
    tbody.innerHTML = agents.map((r,i)=>{
      const cc = r.conv>=5?'var(--green)':r.conv>=2?'var(--gold)':'var(--red)';
      return `<tr>
        <td style="color:var(--muted);font-size:0.7rem;">${i+1}</td>
        <td style="font-weight:700;">${r.name}</td>
        <td style="text-align:center;"><span class="att-badge att-p">${r.xfer}</span></td>
        <td style="text-align:center;color:var(--muted);">${r.calls.toLocaleString()}</td>
        <td style="text-align:center;color:${cc};font-weight:800;">${r.conv}%</td>
      </tr>`;
    }).join('');
  }
}

function openTeamBreakdown(team){
  if(!statsData.length){
    alert('No CSV data loaded yet. Upload the daily CSV first in Agent Stats tab.');
    return;
  }
  openBreakdownTeam = team;
  renderTeamBreakdown(team);
  document.getElementById('team-breakdown-overlay').style.display = 'flex';
}

function closeTeamBreakdown(){
  openBreakdownTeam = null;
  document.getElementById('team-breakdown-overlay').style.display='none';
}

// Call this whenever statsData changes — refreshes the popup if it's open
function refreshBreakdownIfOpen(){
  if(openBreakdownTeam && document.getElementById('team-breakdown-overlay').style.display !== 'none'){
    renderTeamBreakdown(openBreakdownTeam);
  }
}


// ── LOAD OVERVIEW ──
async function loadAdminOverview(){
  const today = getTodayGY();

  // Always ensure roster is loaded first
  if(!rosterLoaded) await loadRoster();

  try{
    // Primary source: attendance collection
    const snap = await db.collection('attendance').where('date','==',today).get();
    allAttRecords=[];
    snap.forEach(doc=>allAttRecords.push(doc.data()));

    // Fallback: also check sessions collection — catches reps whose attendance
    // write failed but session write succeeded (they ARE logged in)
    try{
      const sessSnap = await db.collection('sessions').where('date','==',today).get();
      const attIds = new Set(allAttRecords.map(r=>String(r.id||'').trim()));
      sessSnap.forEach(doc=>{
        const d = doc.data();
        const sid = String(d.id||'').trim();
        if(sid && !attIds.has(sid)){
          // Rep has a session but no attendance record
          // Look up their shift from ROSTER to correctly determine Present vs Late
          const rosterAgent = ROSTER[sid] || Object.values(ROSTER).find(r=>r.name===d.name);
          const shift = rosterAgent ? (rosterAgent.shift||'') : '';
          const status = getAttendanceStatus(shift) || 'P';
          allAttRecords.push({
            id: sid, name: d.name||'', team: d.team||'',
            date: today, status, shift
          });
          // Also backfill Firebase so next refresh doesn't need the fallback
          db.collection('attendance').doc(sid+'_'+today).set({
            id: sid, name: d.name||'', team: d.team||'',
            date: today, status, shift,
            loginTime: firebase.firestore.FieldValue.serverTimestamp()
          },{merge:true}).catch(()=>{});
          attIds.add(sid);
        }
      });
    }catch(e){ /* non-fatal */ }

    // ── Reconcile team field in attendance records against current ROSTER ──
    // Firestore records may have been written with the wrong team before a roster fix.
    // Always trust ROSTER (built from the authoritative Google Sheet) over stored Firestore data.
    allAttRecords.forEach(r => {
      const rosterAgent = ROSTER[String(r.id||'').trim()]
                       || Object.values(ROSTER).find(a => a.name && r.name &&
                            a.name.toLowerCase().trim() === (r.name||'').toLowerCase().trim());
      if (rosterAgent && rosterAgent.team && r.team !== rosterAgent.team) {
        r.team = rosterAgent.team;
      }
    });

    const online = allAttRecords.filter(r=>r.status==='Present'||r.status==='P');
    const late   = allAttRecords.filter(r=>r.status==='Late'||r.status==='L');
    const allAgents = Object.values(ROSTER);

    // Build sets of logged-in IDs AND names for matching
    const loggedIds   = new Set(allAttRecords.map(r=>String(r.id||'').trim()));
    const loggedNames = new Set(allAttRecords.map(r=>(r.name||'').toLowerCase().trim()));

    // Agent is "logged in" if their ID OR name appears in attendance records
    const notLogged = allAgents.filter(a=>{
      const byId   = loggedIds.has(String(a.userId||'').trim());
      const byName = loggedNames.has((a.name||'').toLowerCase().trim());
      return !byId && !byName;
    }).sort((a,b)=>a.name.localeCompare(b.name));

    document.getElementById('glance-total').textContent  = allAgents.length||'—';
    document.getElementById('glance-online').textContent = online.length;
    document.getElementById('glance-late').textContent   = late.length;
    document.getElementById('glance-absent').textContent = notLogged.length;

    const og=document.getElementById('online-grid');
    og.innerHTML = online.length
      ? online.map(r=>`<div class="status-chip online" onclick="openRepProfile('${r.id}','${r.name}','${r.team||''}','${r.shift||''}')"><span class="pulse green"></span>${r.name.split(' ').slice(0,2).join(' ')}</div>`).join('')
      : '<div style="font-size:0.72rem;color:var(--muted);">No one online yet</div>';

    const lg=document.getElementById('late-grid');
    lg.innerHTML = late.length
      ? late.map(r=>`<div class="status-chip late-chip" onclick="openRepProfile('${r.id}','${r.name}','${r.team||''}','${r.shift||''}')"><span class="pulse amber"></span>${r.name.split(' ').slice(0,2).join(' ')}</div>`).join('')
      : '<div style="font-size:0.72rem;color:var(--muted);">None</div>';

    const ag2=document.getElementById('absent-grid');
    ag2.innerHTML = notLogged.length
      ? notLogged.map(a=>`<div class="status-chip absent-chip" onclick="openRepProfile('${a.userId||''}','${a.name}','${a.team||''}','${a.shift||''}')"><span class="pulse red-p"></span>${a.name.split(' ').slice(0,2).join(' ')}</div>`).join('')
      : '<div style="font-size:0.72rem;color:var(--green);">Everyone is logged in! ✅</div>';

  }catch(e){ console.error('Overview error:',e); }

  // ── AUTO-LOAD TODAY'S STATS REPORT ──
  // If today's report is not already in memory, fetch it from Firebase automatically
  // so the goal bars and transfer counts are always visible when this tab opens.
  const todayStr = getTodayGY();
  if(!(statsData.length && statsDataDate === todayStr)){
    try{
      const rSnap = await db.collection('reports').doc(todayStr).get();
      if(rSnap.exists){
        const rData = rSnap.data();
        if(rData.statsJSON){
          statsData = JSON.parse(rData.statsJSON);
          // Team already correctly resolved at upload — do NOT re-resolve (causes BB/PR swap)
          statsDataDate = todayStr;
          // Update goal label in case it changed
          const goalSnap = await db.collection('config').doc('settings').get().catch(()=>null);
          if(goalSnap && goalSnap.exists && goalSnap.data().goal) dailyGoal = goalSnap.data().goal;
          const goalEl = document.getElementById('goal-val-display');
          if(goalEl) goalEl.textContent = dailyGoal;
          updateGoalBars();
        }
      }
    }catch(e){ console.warn('Overview: could not auto-load today report', e); }
  } else {
    // Data already in memory for today — just refresh goal bars
    updateGoalBars();
  }
}

// ── LOAD DAILY ATTENDANCE ──
async function loadAdminAttendance(){
  const today = getTodayGY();
  const dateEl = document.getElementById('att-date');
  if(dateEl) dateEl.textContent = new Date().toLocaleDateString('en-US',{timeZone:'America/Guyana',weekday:'long',month:'long',day:'numeric'});

  // Make sure roster is loaded first
  if(!rosterLoaded) await loadRoster();

  try{
    const snap = await db.collection('attendance').where('date','==',today).get();
    allAttRecords=[];
    snap.forEach(doc=>allAttRecords.push(doc.data()));
    renderAttTable();
  }catch(e){
    console.error('Attendance load error:',e);
    // Still render with roster even if Firebase fails
    renderAttTable();
  }
}

function filterAtt(f,btn){
  attFilter=f;
  document.querySelectorAll('[id^="att-filter-"]').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  renderAttTable();
}

function renderAttTable(){
  const tbody=document.getElementById('att-tbody');
  if(!tbody) return;

  // Get ALL agents from roster sorted alphabetically — apply team filter
  const allAgents = Object.values(ROSTER)
    .filter(a => attTeamFilter === 'all' || a.team === attTeamFilter)
    .sort((a,b)=>a.name.localeCompare(b.name));

  if(!allAgents.length){
    tbody.innerHTML='<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:20px;">Loading roster... please wait a moment and try again.</td></tr>';
    return;
  }

  // Build a lookup map from attendance records — match by name AND by id
  const attByName = {};
  const attById   = {};
  allAttRecords.forEach(r=>{
    if(r.name) attByName[r.name.toLowerCase().trim()] = r;
    if(r.id)   attById[String(r.id).trim()] = r;
  });

  // Build rows — one per agent from roster
  let rows = allAgents.map(agent=>{
    // Try to find their attendance record by ID first, then by name
    const rec = attById[String(agent.userId||'').trim()]
             || attByName[agent.name.toLowerCase().trim()]
             || null;
    return {
      id:     agent.userId,
      name:   agent.name,
      team:   agent.team,
      shift:  agent.shift,
      status: rec ? rec.status : 'none',
      loginTime: rec ? rec.loginTime : null,
      hasRecord: !!rec
    };
  });

  // Apply filter
  if(attFilter !== 'all'){
    if(attFilter === 'none'){
      rows = rows.filter(r => !r.hasRecord);
    } else if(attFilter === 'P'){
      rows = rows.filter(r => r.status==='P' || r.status==='Present');
    } else if(attFilter === 'L'){
      rows = rows.filter(r => r.status==='L' || r.status==='Late');
    } else if(attFilter === 'A'){
      rows = rows.filter(r => r.status==='A' || r.status==='Absent' || r.status==='S' || r.status==='PO');
    }
  }

  if(!rows.length){
    tbody.innerHTML='<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:16px;">No records match this filter.</td></tr>';
    return;
  }

  tbody.innerHTML = rows.map((r,i)=>{
    const s = r.status;
    const badge =
        s==='Present'||s==='P'  ? `<span class="att-badge att-p">Present</span>`
      : s==='Late'   ||s==='L'  ? `<span class="att-badge att-l">Late</span>`
      : s==='Absent' ||s==='A'  ? `<span class="att-badge att-a">Absent</span>`
      : s==='S'                  ? `<span class="att-badge att-a">Sick</span>`
      : s==='PO'                 ? `<span class="att-badge att-a">Personal Out</span>`
      : s==='V'                  ? `<span class="att-badge att-l">Vacation</span>`
      :                            `<span class="att-badge att-pending">Not In</span>`;

    const loginTime = r.loginTime
      ? new Date(r.loginTime.seconds*1000).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',timeZone:'America/Guyana'})
      : '—';

    const team = r.team==='BB'
      ? '<span style="color:var(--accent);font-weight:800;font-size:0.78rem;">BB</span>'
      : '<span style="color:var(--purple);font-weight:800;font-size:0.78rem;">PR</span>';

    return `<tr onclick="openRepProfile('${r.id||''}','${r.name}','${r.team||''}','${r.shift||''}')">
      <td style="color:var(--muted);font-size:0.72rem;">${i+1}</td>
      <td style="font-weight:700;color:var(--text);">${r.name||'—'}</td>
      <td>${team}</td>
      <td style="color:var(--muted);font-size:0.72rem;">${r.shift||'—'}</td>
      <td>${badge}</td>
      <td style="color:var(--muted);">${loginTime}</td>
      <td><button class="mark-absent-btn" onclick="event.stopPropagation();markAgentAbsentDirect('${r.id||''}','${r.name}','${r.team||''}')">Edit</button></td>
    </tr>`;
  }).join('');
}

// ── WEEKLY ATTENDANCE — merges Google Sheet + Firebase ──
let weeklyTeam      = 'BB';
let weeklySheetData = null;
let weeklyFirebase  = {}; // date -> {agentName -> status} from Firebase
let weekRanges      = [];
let monthlyCache    = {};

async function loadWeeklyAttendance(team){
  weeklyTeam = team;
  document.getElementById('wk-bb-btn').classList.toggle('active', team==='BB');
  document.getElementById('wk-pr-btn').classList.toggle('active', team==='PR');
  document.getElementById('weekly-table-wrap').innerHTML='<div style="text-align:center;color:var(--muted);padding:20px;">Loading...</div>';
  document.getElementById('week-chips').innerHTML='';

  const today      = getTodayGY();
  const monthStart = today.substring(0,7);

  // ── Fetch both sources in parallel ──
  const [sheetResult, firebaseResult] = await Promise.allSettled([
    callBridge({action:'getWeeklyAttendance', team}),
    db.collection('attendance')
      .where('date','>=',monthStart+'-01')
      .where('date','<=',monthStart+'-31')
      .get()
  ]);

  // ── Process Firebase ──
  weeklyFirebase = {};
  if(firebaseResult.status==='fulfilled'){
    firebaseResult.value.forEach(doc=>{
      const d = doc.data();
      if(d.team !== team) return;
      if(!weeklyFirebase[d.date]) weeklyFirebase[d.date]={};
      if(d.name){
        weeklyFirebase[d.date][d.name]                      = d.status;
        weeklyFirebase[d.date][d.name.toLowerCase().trim()] = d.status;
      }
    });
  }

  // ── Process Sheet ──
  if(sheetResult.status==='fulfilled' && sheetResult.value.success){
    weeklySheetData = sheetResult.value.weeks || [];
  } else {
    console.warn('Sheet weekly load failed — using Firebase only');
    weeklySheetData = [];
  }

  // Build week chips
  const container = document.getElementById('week-chips');
  if(weeklySheetData.length){
    container.innerHTML = weeklySheetData.map((w,i)=>
      `<button class="week-chip${i===weeklySheetData.length-1?' active':''}" onclick="selectSheetWeek(${i},this)">${w.label}</button>`
    ).join('');
    renderSheetWeeklyTable(weeklySheetData[weeklySheetData.length-1]);
  } else {
    // No sheet data — build weeks from Firebase dates
    const dates = Object.keys(weeklyFirebase).sort();
    if(dates.length){
      buildWeekRangesFromDates(dates, monthStart);
      container.innerHTML = weekRanges.map((w,i)=>
        `<button class="week-chip${i===weekRanges.length-1?' active':''}" onclick="selectFirebaseWeek(${i},this)">${w.label}</button>`
      ).join('');
      if(weekRanges.length) renderFirebaseWeeklyTable(weekRanges[weekRanges.length-1]);
    } else {
      document.getElementById('weekly-table-wrap').innerHTML='<div style="text-align:center;color:var(--muted);padding:20px;">No attendance data found yet for this month.</div>';
    }
  }
}

function switchWeeklyTeam(team){
  loadWeeklyAttendance(team);
}

function selectSheetWeek(idx, btn){
  document.querySelectorAll('.week-chip').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  if(weeklySheetData && weeklySheetData[idx]) renderSheetWeeklyTable(weeklySheetData[idx]);
}

function selectFirebaseWeek(idx, btn){
  document.querySelectorAll('.week-chip').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  if(weekRanges[idx]) renderFirebaseWeeklyTable(weekRanges[idx]);
}

// ── Normalize any status value to a short code ──
function normalizeStatus(raw){
  if(!raw) return '';
  const s = String(raw).toLowerCase().trim();
  if(s==='p'||s==='present')        return 'P';
  if(s==='l'||s==='late')           return 'L';
  if(s==='a'||s==='absent')         return 'A';
  if(s==='s'||s==='sick')           return 'S';
  if(s==='po'||s==='personal out')  return 'PO';
  if(s==='v'||s==='vacation')       return 'V';
  if(s==='off')                     return 'OFF';
  return String(raw).toUpperCase().trim();
}

function statusClass(code){
  return code==='P'?'wk-p':code==='L'?'wk-l':code==='A'?'wk-a'
    :code==='S'?'wk-s':code==='PO'?'wk-po':(code==='V'||code==='OFF')?'wk-off'
    :code?'wk-off':'wk-blank';
}

// ── Render from Sheet data (merged with Firebase) ──
function renderSheetWeeklyTable(week){
  if(!week) return;
  document.getElementById('weekly-range-lbl').textContent = week.label;

  const cols         = week.columns || [];
  const sheetAgents  = [...week.agents].sort((a,b)=>a.name.localeCompare(b.name));

  let html = '<table class="wk-table"><thead><tr>';
  html += '<th style="text-align:left;min-width:140px;">Agent Name</th><th>Shift</th>';
  cols.forEach(col=>{ html += `<th>${col.header}</th>`; });
  html += '<th style="color:var(--green);">P</th><th style="color:var(--gold);">L</th><th style="color:var(--red);">A</th><th>Comments</th>';
  html += '</tr></thead><tbody>';

  sheetAgents.forEach((agent,i)=>{
    const rAgent = Object.values(ROSTER).find(r=>
      r.name.toLowerCase()===agent.name.toLowerCase() ||
      r.name.toLowerCase().includes(agent.name.toLowerCase().split(' ')[0])
    );
    const shift = agent.shift || (rAgent ? rAgent.shift : '—');
    const rId   = rAgent ? rAgent.userId : '';
    const rTeam = rAgent ? rAgent.team : weeklyTeam;

    let p=0,l=0,a=0, dayCells='';

    cols.forEach(col=>{
      // ── MERGE: Sheet value wins; Firebase fills blank cells ──
      let sheetVal = normalizeStatus(agent.days[col.header]||'');

      // Try to get Firebase value for this day if sheet is blank
      if(!sheetVal){
        // Find the date for this column header (Mon/Tue etc.)
        // We match by looking at weeklyFirebase for any date that matches
        const dayKey = col.header.toLowerCase().substring(0,3);
        const dayMap = {mon:1,tue:2,wed:3,thu:4,fri:5,sat:6,sun:0};
        const targetDow = dayMap[dayKey];
        if(targetDow !== undefined){
          const fbDates = Object.keys(weeklyFirebase);
          const matchDate = fbDates.find(d=>{
            const dow = new Date(d).getDay();
            return dow === targetDow;
          });
          if(matchDate){
            const fbDay = weeklyFirebase[matchDate];
            const fbStatus = fbDay[agent.name] || fbDay[agent.name.toLowerCase().trim()] || '';
            sheetVal = normalizeStatus(fbStatus);
          }
        }
      }

      const code = sheetVal;
      const cls  = statusClass(code);
      if(code==='P') p++;
      else if(code==='L') l++;
      else if(code==='A'||code==='S'||code==='PO') a++;
      dayCells += `<td><span class="wk-cell ${cls}">${code}</span></td>`;
    });

    html += `<tr>
      <td onclick="openRepProfile('${rId}','${agent.name}','${rTeam}','${shift}')" style="cursor:pointer;font-weight:700;">${agent.name}</td>
      <td style="font-size:0.65rem;color:var(--muted);">${shift}</td>
      ${dayCells}
      <td style="color:var(--green);font-weight:800;">${p}</td>
      <td style="color:var(--gold);font-weight:800;">${l}</td>
      <td style="color:var(--red);font-weight:800;">${a}</td>
      <td style="color:var(--muted);font-size:0.7rem;">${agent.comments||'—'}</td>
    </tr>`;
  });

  html += '</tbody></table>';
  document.getElementById('weekly-table-wrap').innerHTML = html;
}

// ── Render from Firebase only (fallback when sheet unavailable) ──
function buildWeekRangesFromDates(dates, monthStart){
  const year  = parseInt(monthStart.split('-')[0]);
  const month = parseInt(monthStart.split('-')[1])-1;
  const daysInMonth = new Date(year, month+1, 0).getDate();
  weekRanges = [];
  let d = 1;
  while(d <= daysInMonth){
    const start = d;
    let dt = new Date(year, month, d);
    while(dt.getDay()!==6 && d<=daysInMonth){ d++; dt=new Date(year,month,d); }
    const end = Math.min(d, daysInMonth);
    const wkDates = [];
    for(let x=start;x<=end;x++){
      const ds = monthStart+'-'+(x<10?'0':'')+x;
      wkDates.push({date:ds, day:x, dow:new Date(year,month,x).getDay()});
    }
    if(wkDates.length){
      const mn = new Date(year,month,1).toLocaleDateString('en-US',{month:'long'});
      weekRanges.push({label:mn+' '+start+' – '+end, dates:wkDates});
    }
    d++;
  }
}

function renderFirebaseWeeklyTable(week){
  if(!week) return;
  document.getElementById('weekly-range-lbl').textContent = week.label;
  const agents = Object.values(ROSTER).filter(a=>a.team===weeklyTeam).sort((a,b)=>a.name.localeCompare(b.name));
  const dowMap = {1:'Mon',2:'Tue',3:'Wed',4:'Thu',5:'Fri',6:'Sat',0:'Sun'};

  let html = '<table class="wk-table"><thead><tr>';
  html += '<th style="text-align:left;min-width:140px;">Agent Name</th><th>Shift</th>';
  week.dates.forEach(d=>{ html+=`<th>${dowMap[d.dow]||''}<br><span style="font-size:0.5rem;color:#4a6080;">${d.day}</span></th>`; });
  html += '<th style="color:var(--green);">P</th><th style="color:var(--gold);">L</th><th style="color:var(--red);">A</th></tr></thead><tbody>';

  agents.forEach(agent=>{
    let p=0,l=0,a=0,cells='';
    week.dates.forEach(d=>{
      const dayData = weeklyFirebase[d.date]||{};
      const raw = dayData[agent.name]||dayData[agent.name.toLowerCase().trim()]||'';
      const code = normalizeStatus(raw);
      const cls  = statusClass(code);
      if(code==='P') p++;
      else if(code==='L') l++;
      else if(code==='A'||code==='S'||code==='PO') a++;
      cells += `<td><span class="wk-cell ${cls}">${code}</span></td>`;
    });
    html+=`<tr>
      <td onclick="openRepProfile('${agent.userId}','${agent.name}','${agent.team}','${agent.shift}')" style="cursor:pointer;font-weight:700;">${agent.name}</td>
      <td style="font-size:0.65rem;color:var(--muted);">${agent.shift||'—'}</td>
      ${cells}
      <td style="color:var(--green);font-weight:800;">${p}</td>
      <td style="color:var(--gold);font-weight:800;">${l}</td>
      <td style="color:var(--red);font-weight:800;">${a}</td>
    </tr>`;
  });
  html += '</tbody></table>';
  document.getElementById('weekly-table-wrap').innerHTML = html;
}

function renderSheetWeeklyTable(week){
  if(!week) return;
  document.getElementById('weekly-range-lbl').textContent = week.label;

  if(!week.agents || !week.agents.length){
    document.getElementById('weekly-table-wrap').innerHTML='<div style="text-align:center;color:var(--muted);padding:20px;">No agents in this week.</div>';
    return;
  }

  // Get column headers from sheet (Mon, Tue, Wed, Thu, Fri, Sat, Sun etc.)
  const cols = week.columns || [];

  // Get all agent names sorted alphabetically — use roster order for team
  const sheetAgents = [...week.agents].sort((a,b)=>a.name.localeCompare(b.name));

  let html = '<table class="wk-table"><thead><tr>';
  html += '<th style="text-align:left;min-width:140px;">Agent Name</th>';
  html += '<th>Shift</th>';
  cols.forEach(col=>{
    html += `<th>${col.header}</th>`;
  });
  html += '<th style="color:var(--green);">P</th>';
  html += '<th style="color:var(--gold);">L</th>';
  html += '<th style="color:var(--red);">A</th>';
  html += '<th>Comments</th>';
  html += '</tr></thead><tbody>';

  sheetAgents.forEach((agent,i)=>{
    // Find matching roster agent for shift info
    const rosterAgent = Object.values(ROSTER).find(r=>
      r.name.toLowerCase()===agent.name.toLowerCase() ||
      r.name.toLowerCase().includes(agent.name.toLowerCase()) ||
      agent.name.toLowerCase().includes(r.name.toLowerCase().split(' ')[0].toLowerCase())
    );
    const shift = agent.shift || (rosterAgent ? rosterAgent.shift : '—');

    let p=0, l=0, a=0;
    let dayCells = '';
    cols.forEach(col=>{
      const rawStatus = agent.days[col.header] || '';
      const s = rawStatus.toLowerCase().trim();
      let code = rawStatus.toUpperCase().trim();

      // Normalize
      if(s==='present') code='P';
      else if(s==='late') code='L';
      else if(s==='absent') code='A';
      else if(s==='sick') code='S';
      else if(s==='personal out') code='PO';
      else if(s==='vacation') code='V';

      const cls = code==='P'?'wk-p'
        :code==='L'?'wk-l'
        :code==='A'?'wk-a'
        :code==='S'?'wk-s'
        :code==='PO'?'wk-po'
        :code==='V'?'wk-l'
        :code==='OFF'?'wk-off'
        :code?'wk-off':'wk-blank';

      if(code==='P') p++;
      else if(code==='L') l++;
      else if(code==='A'||code==='S'||code==='PO') a++;

      dayCells += `<td><span class="wk-cell ${cls}">${code}</span></td>`;
    });

    const rId = rosterAgent ? rosterAgent.userId : '';
    const rTeam = rosterAgent ? rosterAgent.team : weeklyTeam;
    html += `<tr>
      <td onclick="openRepProfile('${rId}','${agent.name}','${rTeam}','${shift}')" style="cursor:pointer;font-weight:700;">${agent.name}</td>
      <td style="font-size:0.65rem;color:var(--muted);">${shift}</td>
      ${dayCells}
      <td style="color:var(--green);font-weight:800;">${p}</td>
      <td style="color:var(--gold);font-weight:800;">${l}</td>
      <td style="color:var(--red);font-weight:800;">${a}</td>
      <td style="color:var(--muted);font-size:0.7rem;">${agent.comments||'—'}</td>
    </tr>`;
  });

  html += '</tbody></table>';
  document.getElementById('weekly-table-wrap').innerHTML = html;
}

// ── LOAD MONTHLY ATTENDANCE ──
async function loadMonthlyAttendance(){
  const today      = getTodayGY();
  const monthStart = today.substring(0,7);
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const monthIdx   = parseInt(monthStart.split('-')[1])-1;
  const year       = monthStart.split('-')[0];
  document.getElementById('monthly-month-lbl').textContent = monthNames[monthIdx]+' '+year;
  document.getElementById('monthly-table-wrap').innerHTML='<div style="text-align:center;color:var(--muted);padding:20px;">Loading from Google Sheet...</div>';

  // monthlyCache: keyed by lowercase agent name → { 'YYYY-MM-DD': 'P'/'L'/'A'/... }
  monthlyCache = {};

  try{
    const data = await callBridge({action:'getMonthlyAttendance'});
    if(!data.success || !Array.isArray(data.agents) || data.agents.length === 0){
      throw new Error(data.error || 'No agents returned');
    }

    data.agents.forEach(agent=>{
      const nameKey = (agent.name||'').toLowerCase().trim();
      if(!nameKey) return;
      const dayData = {};
      // days = { "2": "Present", "3": "Late", ... } — keys are day numbers as strings
      Object.entries(agent.days||{}).forEach(([dayStr, status])=>{
        const d = parseInt(dayStr);
        const code = normalizeStatus(status);
        if(code && d >= 1 && d <= 31){
          const dateStr = monthStart+'-'+(d<10?'0':'')+d;
          dayData[dateStr] = code;
        }
      });
      monthlyCache[nameKey] = dayData;
    });

    console.log('[Monthly] Loaded', Object.keys(monthlyCache).length, 'agents from sheet');

  }catch(e){
    console.error('[Monthly] Load failed:', e.message);
    document.getElementById('monthly-table-wrap').innerHTML=
      `<div style="color:var(--red);text-align:center;padding:20px;">Could not load monthly data: ${e.message}</div>`;
    return;
  }

  renderMonthly(monthlyCache, monthStart, year, monthIdx);
}

function reRenderMonthly(){
  loadMonthlyAttendance();
}

// ── REPORT HISTORY ──
let reportHistory=[];
async function loadReportHistory(){
  try{
    const snap=await db.collection('reports').orderBy('uploadedAt','desc').get();
    reportHistory=[];
    snap.forEach(doc=>{ const d=doc.data(); if(d.statsJSON) reportHistory.push(d); });
    renderReportHistory();
  }catch(e){ console.warn('History load:',e); }
}
function renderReportHistory(){
  const el=document.getElementById('report-history');
  if(!el||!reportHistory.length){if(el)el.innerHTML='';return;}
  // Always newest date first
  const sorted = [...reportHistory].sort((a,b)=>b.date.localeCompare(a.date));
  el.innerHTML='<div style="font-size:0.6rem;font-weight:800;letter-spacing:2px;color:var(--muted);margin-bottom:6px;text-transform:uppercase;">📂 Previous Reports — click to load</div>'
    +sorted.map((r)=>{
      const origIdx = reportHistory.indexOf(r);
      const isActive = r.date === statsDataDate;
      const isToday  = r.date === getTodayGY();
      const baseBorder = isToday ? 'var(--green)' : 'var(--border)';
      const baseBg     = isToday ? 'rgba(52,211,153,0.1)' : 'transparent';
      const baseColor  = isToday ? 'var(--green)' : 'var(--muted)';
      return `<button data-report-idx="${origIdx}" onclick="loadReportByIndex(${origIdx})"
        style="margin:0 4px 4px 0;display:inline-flex;align-items:center;gap:5px;padding:5px 12px;border-radius:20px;
        border:1.5px solid ${isActive?'var(--gold)':baseBorder};
        background:${isActive?'rgba(251,191,36,0.12)':baseBg};
        color:${isActive?'var(--gold)':baseColor};
        font-family:Barlow Condensed,sans-serif;font-size:0.75rem;font-weight:800;cursor:pointer;
        box-shadow:${isActive?'0 0 8px rgba(251,191,36,0.3)':'none'};">
        ${isToday?'⚡ ':isActive?'▶ ':''} ${r.date} <span style="opacity:0.6;">(${r.agentCount||'?'} agents)</span>
      </button>`;
    }).join('');
}
let compareData     = [];   // second dataset for comparison
let compareDataDate = '';
let compareModeOn   = false;

function toggleCompareMode(){
  if(!compareData.length){
    // Prompt to select a report to compare against
    const btn = document.getElementById('compare-toggle-btn');
    btn.textContent = '⚖️ SELECT REPORT TO COMPARE...';
    btn.style.borderColor = 'var(--gold)';
    btn.style.color = 'var(--gold)';
    window._pickingCompare = true;
  } else {
    compareModeOn = !compareModeOn;
    updateCompareBanner();
    renderStatsTable();
  }
}

function clearCompare(){
  compareData = []; compareDataDate = ''; compareModeOn = false;
  window._pickingCompare = false;
  document.getElementById('compare-toggle-btn').textContent = '⚖️ COMPARE';
  document.getElementById('compare-toggle-btn').style.borderColor = 'var(--border)';
  document.getElementById('compare-toggle-btn').style.color = 'var(--muted)';
  document.getElementById('compare-clear-btn').style.display = 'none';
  document.getElementById('compare-banner').style.display = 'none';
  renderStatsTable();
}

function updateCompareBanner(){
  const banner = document.getElementById('compare-banner');
  const text   = document.getElementById('compare-banner-text');
  if(compareModeOn && compareData.length){
    banner.style.display = '';
    text.innerHTML = `Comparing <strong style="color:var(--accent);">${statsDataDate}</strong> vs <strong style="color:var(--gold);">${compareDataDate}</strong> — <span style="color:var(--green);">▲ green = improved</span> · <span style="color:var(--red);">▼ red = declined</span>`;
  } else {
    banner.style.display = 'none';
  }
}

function loadReportByIndex(idx){
  const r=reportHistory[idx];
  if(!r||!r.statsJSON) return;
  try{
    statsData=JSON.parse(r.statsJSON);

    // Team was already correctly resolved at upload time — do NOT re-resolve here.
    // Re-running resolveAgentTeam causes BB/PR to swap for agents not found in ROSTER.

    document.getElementById('csv-date-lbl').textContent='📅 '+r.date;
    document.getElementById('csv-expiry-lbl').textContent=r.expiryDate?'🗑 Expires: '+r.expiryDate:'';
    statsDataDate = r.date; // track which date this data is for
    updateGoalBars();
    renderStatsTable();
    // Re-render history so active state updates correctly (uses statsDataDate)
    renderReportHistory();
  }catch(e){ console.error('Load report:',e); }
}

function renderMonthly(attMap, monthStart, year, monthIdx){
  const teamFilter = document.getElementById('monthly-team-filter').value;
  const daysInMonth = new Date(parseInt(year), monthIdx+1, 0).getDate();
  const allAgents = Object.values(ROSTER)
    .filter(a=>!a.inactive && (teamFilter==='all'||a.team===teamFilter))
    .sort((a,b)=>a.name.localeCompare(b.name));

  if(allAgents.length===0){
    document.getElementById('monthly-table-wrap').innerHTML='<div style="text-align:center;color:var(--muted);padding:30px;">No active agents found — make sure the roster is loaded.</div>';
    return;
  }

  // Build day headers
  const dayNames=['Su','Mo','Tu','We','Th','Fr','Sa'];
  let html='<table style="border-collapse:collapse;font-size:0.68rem;width:100%;">';
  html+='<thead><tr style="background:#060d1a;"><th style="text-align:left;padding:8px 10px;color:var(--muted);font-family:Barlow Condensed,sans-serif;font-size:0.6rem;font-weight:800;letter-spacing:1.5px;border-bottom:2px solid #1a2a45;white-space:nowrap;min-width:130px;">Agent</th>';
  for(let d=1;d<=daysInMonth;d++){
    const dayOfWeek = new Date(parseInt(year),monthIdx,d).getDay();
    const isSun = dayOfWeek===0;
    html+=`<th style="padding:4px 3px;color:${isSun?'var(--red)':'var(--muted)'};font-family:Barlow Condensed,sans-serif;font-size:0.52rem;font-weight:800;letter-spacing:1px;text-align:center;border-bottom:2px solid #1a2a45;">${d}<br><span style="font-size:0.45rem;opacity:0.7;">${dayNames[dayOfWeek]}</span></th>`;
  }
  html+='<th style="padding:4px 8px;color:var(--green);font-family:Barlow Condensed,sans-serif;font-size:0.6rem;font-weight:800;border-bottom:2px solid #1a2a45;">P</th>';
  html+='<th style="padding:4px 8px;color:var(--gold);font-family:Barlow Condensed,sans-serif;font-size:0.6rem;font-weight:800;border-bottom:2px solid #1a2a45;">L</th>';
  html+='<th style="padding:4px 8px;color:var(--red);font-family:Barlow Condensed,sans-serif;font-size:0.6rem;font-weight:800;border-bottom:2px solid #1a2a45;">A</th>';
  html+='</tr></thead><tbody>';

  let totalP=0,totalL=0,totalA=0;

  allAgents.forEach((agent,i)=>{
    // monthlyCache is keyed by lowercase agent name
    const nameKey  = agent.name.toLowerCase().trim();
    const agentAtt = monthlyCache[nameKey] || {};
    let p=0,l=0,a=0;
    const rowBg = i%2===0 ? '#070e1c' : '#060b18';
    html+=`<tr style="background:${rowBg};"><td style="padding:7px 10px;font-size:0.72rem;color:var(--text);white-space:nowrap;font-weight:600;border-bottom:1px solid #0f1e35;">${agent.name.split(' ').slice(0,2).join(' ')}</td>`;
    for(let d=1;d<=daysInMonth;d++){
      const dateStr = monthStart+'-'+(d<10?'0':'')+d;
      const dayOfWeek = new Date(parseInt(year),monthIdx,d).getDay();
      const isSun = dayOfWeek===0;
      const isFuture = dateStr > getTodayGY();
      const rawStatus = agentAtt[dateStr];
      const status    = normalizeStatus(rawStatus);
      let cls='mcal-off', lbl='';

      if(status==='P'){cls='mcal-p';lbl='P';p++;}
      else if(status==='L'){cls='mcal-l';lbl='L';l++;}
      else if(status==='A'){cls='mcal-a';lbl='A';a++;}
      else if(status==='S'){cls='mcal-a';lbl='S';a++;}
      else if(status==='PO'){cls='mcal-a';lbl='PO';a++;}
      else if(status==='V'){cls='mcal-l';lbl='V';}
      else if(status==='OFF'){cls='mcal-off';lbl='OFF';}
      else if(isFuture){cls='mcal-off';lbl='';}
      else if(isSun && !status){cls='mcal-off';lbl='·';}
      else{cls='mcal-off';lbl='';}
      html+=`<td style="padding:4px 3px;text-align:center;border-bottom:1px solid #0f1e35;"><div class="mcal-cell ${cls}" title="${dateStr}">${lbl}</div></td>`;
    }
    totalP+=p;totalL+=l;totalA+=a;
    html+=`<td style="padding:7px 8px;text-align:center;color:var(--green);font-weight:800;font-size:0.75rem;border-bottom:1px solid #0f1e35;">${p}</td>`;
    html+=`<td style="padding:7px 8px;text-align:center;color:var(--gold);font-weight:800;font-size:0.75rem;border-bottom:1px solid #0f1e35;">${l}</td>`;
    html+=`<td style="padding:7px 8px;text-align:center;color:var(--red);font-weight:800;font-size:0.75rem;border-bottom:1px solid #0f1e35;">${a}</td>`;
    html+='</tr>';
  });

  html+='</tbody></table>';
  document.getElementById('monthly-table-wrap').innerHTML=html;

  // Summary
  const total = totalP+totalL+totalA;
  const rate = total>0?Math.round((totalP/total)*100):0;
  document.getElementById('ms-present').textContent=totalP;
  document.getElementById('ms-late').textContent=totalL;
  document.getElementById('ms-absent').textContent=totalA;
  document.getElementById('ms-rate').textContent=rate+'%';
  document.getElementById('monthly-summary').style.display='grid';
}

// ── CSV UPLOAD WITH EXPIRY ──
