// ── AGENT PROFILE SUB-TAB LOADER ────────────────────────────────
// Each agent profile sub-tab's HTML lives in agent/{name}.html
// Fetched once on first click and injected into id="ap-{name}"
const _agentTabLoaded = {};
function loadAgentSection(tab, callback) {
  if (_agentTabLoaded[tab]) { if (callback) callback(); return; }
  fetch('agent/' + tab + '.html?nc=' + Date.now())
    .then(r => r.text())
    .then(html => {
      const el = document.getElementById('ap-' + tab);
      if (el) el.innerHTML = html;
      _agentTabLoaded[tab] = true;
      if (callback) callback();
    })
    .catch(err => {
      console.error('[Agent Loader] Failed to load agent section:', tab, err);
      if (callback) callback();
    });
}

/* ── Rep/Agent Profile Panel ──
   Full-screen agent analysis: calendar, schedule, weekly performance.
*/

function closeRepProfile(){
  document.getElementById('rep-profile-overlay').classList.remove('open');
  document.body.style.overflow='';
  currentRepProfile = null;
}

function apTab(tab, btn){
  loadAgentSection(tab, function() { _activateAgentTab(tab, btn); });
}
function _activateAgentTab(tab, btn){
  ['overview','attendance','coaching','monitoring','schedule','audit','rebuttal','stats'].forEach(t=>{
    const el = document.getElementById('ap-'+t);
    if(el) el.style.display = t===tab ? '' : 'none';
    const b  = document.getElementById('apt-'+t);
    if(b){ b.classList.toggle('active', t===tab); }
  });
  if(!currentRepProfile) return;
  const {id, name} = currentRepProfile;
  if(tab==='overview')   { apLoadOverview(id,name); }
  if(tab==='attendance') { apLoadAttendance(id,name); }
  if(tab==='coaching')   { apLoadSessions(id,'coaching'); }
  if(tab==='monitoring') { apLoadSessions(id,'monitoring'); }
  if(tab==='schedule')   { apLoadSchedule(); }
  if(tab==='audit')      { loadRepAudit(id); }
  if(tab==='rebuttal')  { apLoadRebuttalUsage(id,name); }
  if(tab==='stats')     { apLoadStatsHistory(name); }
}

// ── OVERVIEW ──
async function apLoadOverview(id,name){
  const today      = getTodayGY();
  const monthStart = today.substring(0,7);
  const idStr      = String(id||'');

  // Show loading state
  ['rp-att-p','rp-att-l','rp-att-a','rp-att-rate','rp-live-calls','rp-live-xfer','rp-coach-count','rp-monitor-count'].forEach(i=>{
    const el=document.getElementById(i); if(el) el.textContent='…';
  });
  document.getElementById('rp-live-conv').textContent='…';
  document.getElementById('rp-att-status').innerHTML='<span style="color:#64748b;">Loading...</span>';

  // ── Today's attendance status ──
  try{
    const attSnap = await db.collection('attendance').doc(idStr+'_'+today).get();
    const el = document.getElementById('rp-att-status');
    if(attSnap && attSnap.exists){
      const d=attSnap.data();
      const s=normalizeStatus(d.status);
      const label=s==='P'?'Present':s==='L'?'Late':s==='A'?'Absent':s==='S'?'Sick':d.status||'—';
      const col=s==='P'?'#34d399':s==='L'?'#fbbf24':'#f87171';
      el.innerHTML=`<span style="color:${col};font-weight:800;font-size:0.9rem;">● ${label}</span>`;
    } else {
      el.innerHTML='<span style="color:#64748b;font-size:0.75rem;">Not logged in today</span>';
    }
  }catch(e){ document.getElementById('rp-att-status').innerHTML='<span style="color:#64748b;">—</span>'; }

  // ── Today's calls/xfer ──
  ['rp-live-calls','rp-live-xfer','rp-live-conv'].forEach(i=>{ const el=document.getElementById(i); if(el) el.textContent='0'; });
  const csvAgent = statsData.find(r=>r.name&&(r.name.toLowerCase()===name.toLowerCase()||name.toLowerCase().includes(r.name.toLowerCase())));
  if(csvAgent){
    document.getElementById('rp-live-calls').textContent = csvAgent.calls||'0';
    document.getElementById('rp-live-xfer').textContent  = csvAgent.xfer||'0';
    document.getElementById('rp-live-conv').textContent  = (csvAgent.conv||'0')+'%';
  } else {
    try{
      const tSnap = await db.collection('taps').doc(idStr+'_'+today).get();
      if(tSnap && tSnap.exists){
        const d=tSnap.data();
        document.getElementById('rp-live-calls').textContent = d.calls||0;
        document.getElementById('rp-live-xfer').textContent  = d.xfer||0;
        document.getElementById('rp-live-conv').textContent  = d.calls>0?Math.round((d.xfer/d.calls)*100)+'%':'0%';
      }
    }catch(e){}
  }

  // ── Monthly attendance ──
  // 1. Try monthlyCache (populated if Monthly tab was visited)
  let p=0,l=0,a=0;
  const nameKey  = name.toLowerCase().trim();
  const sheetAtt = monthlyCache[nameKey]||{};

  if(Object.keys(sheetAtt).length > 0){
    Object.values(sheetAtt).forEach(s=>{
      const c=normalizeStatus(s);
      if(c==='P') p++;
      else if(c==='L') l++;
      else if(c&&c!=='OFF') a++;
    });
  } else {
    // 2. Fallback: scan all attendance docs for this agent this month
    // Use a simple collection scan filtered client-side to avoid index requirement
    try{
      const allDocs = await db.collection('attendance')
        .where('id','==',idStr)
        .get();
      allDocs.forEach(doc=>{
        const d=doc.data();
        if(!d.date || !d.date.startsWith(monthStart)) return;
        const c=normalizeStatus(d.status);
        if(c==='P') p++;
        else if(c==='L') l++;
        else if(c&&c!=='OFF') a++;
      });
    }catch(e){
      // Last resort: scan by doc ID prefix pattern
      try{
        const daysInMonth = new Date(parseInt(monthStart.split('-')[0]), parseInt(monthStart.split('-')[1]), 0).getDate();
        const promises = [];
        for(let d=1;d<=daysInMonth;d++){
          const dateStr = monthStart+'-'+(d<10?'0':'')+d;
          promises.push(db.collection('attendance').doc(idStr+'_'+dateStr).get());
        }
        const snaps = await Promise.all(promises);
        snaps.forEach(snap=>{
          if(!snap.exists) return;
          const c=normalizeStatus(snap.data().status);
          if(c==='P') p++;
          else if(c==='L') l++;
          else if(c&&c!=='OFF') a++;
        });
      }catch(e2){}
    }
  }

  const total = p+l+a;
  const rate  = total>0?Math.round((p/total)*100):0;
  document.getElementById('rp-att-p').textContent    = p;
  document.getElementById('rp-att-l').textContent    = l;
  document.getElementById('rp-att-a').textContent    = a;
  document.getElementById('rp-att-rate').textContent = total>0?rate+'%':'—';
  if(total>0){
    document.getElementById('ap-bar-p').style.width = (p/total*100)+'%';
    document.getElementById('ap-bar-l').style.width = (l/total*100)+'%';
    document.getElementById('ap-bar-a').style.width = (a/total*100)+'%';
  } else {
    ['ap-bar-p','ap-bar-l','ap-bar-a'].forEach(i=>{ const el=document.getElementById(i); if(el) el.style.width='0%'; });
  }

  // ── Coaching & monitoring counts ──
  try{
    let cSnap = await db.collection('coaching_sessions').where('repId','==',idStr).get();
    if(cSnap.empty){
      cSnap = await db.collection('coaching_sessions').where('repName','==',name).get();
    }
    let coaching=0, monitoring=0, lastDate='';
    cSnap.forEach(doc=>{
      const d=doc.data();
      if(d.type==='monitoring') monitoring++; else coaching++;
      const ds=d.date||(d.createdAt?new Date(d.createdAt.seconds*1000).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'America/Guyana'}):'');
      if(ds>lastDate) lastDate=ds;
    });
    document.getElementById('rp-coach-count').textContent   = coaching;
    document.getElementById('rp-monitor-count').textContent = monitoring;
    document.getElementById('rp-last-coach').textContent    = lastDate?'Last session: '+lastDate:'No sessions yet';
  }catch(e){
    document.getElementById('rp-coach-count').textContent   = '0';
    document.getElementById('rp-monitor-count').textContent = '0';
    document.getElementById('rp-last-coach').textContent    = '';
  }

  // ── Streak ──
  try{
    loadAgentStreakForProfile(idStr, name);
  }catch(e){}

  // ── Rebuttal mini card ──
  apLoadRebuttalMini(idStr, name);
}

// ── ATTENDANCE ──
async function apLoadAttendance(id,name){
  const today      = getTodayGY();
  const monthStart = today.substring(0,7);
  const year       = parseInt(monthStart.split('-')[0]);
  const monthIdx   = parseInt(monthStart.split('-')[1])-1;
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const idStr      = String(id||'');

  document.getElementById('ap-cal-month-lbl').textContent = monthNames[monthIdx].toUpperCase()+' '+year;

  // Build attMap from monthlyCache first, then overlay Firebase docs
  const nameKey = name.toLowerCase().trim();
  const attMap  = {...(monthlyCache[nameKey]||{})};

  // Fetch all attendance docs for this month by doc ID (no index needed)
  const daysInMonth = new Date(year, monthIdx+1, 0).getDate();
  try{
    const promises = [];
    for(let d=1;d<=daysInMonth;d++){
      const dateStr = monthStart+'-'+String(d).padStart(2,'0');
      promises.push(db.collection('attendance').doc(idStr+'_'+dateStr).get());
    }
    const snaps = await Promise.all(promises);
    snaps.forEach(snap=>{
      if(!snap.exists) return;
      const d=snap.data();
      if(d.date) attMap[d.date] = normalizeStatus(d.status);
    });
  }catch(e){}

  renderAgentCalendar('ap-cal-current', year, monthIdx, attMap, today);
  renderWeekBars('ap-week-bars', year, monthIdx, attMap);

  // Previous month
  const prevMonthIdx = monthIdx===0?11:monthIdx-1;
  const prevYear     = monthIdx===0?year-1:year;
  const prevStart    = prevYear+'-'+String(prevMonthIdx+1).padStart(2,'0');
  const prevMonthPfx = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][prevMonthIdx];
  document.getElementById('ap-prev-month-lbl').textContent = monthNames[prevMonthIdx].toUpperCase()+' '+prevYear;

  // Build prev attMap: Firebase docs first
  const prevAtt = {};
  const daysInPrev = new Date(prevYear, prevMonthIdx+1, 0).getDate();
  try{
    const promises2 = [];
    for(let d=1;d<=daysInPrev;d++){
      const dateStr = prevStart+'-'+String(d).padStart(2,'0');
      promises2.push(db.collection('attendance').doc(idStr+'_'+dateStr).get());
    }
    const snaps2 = await Promise.all(promises2);
    snaps2.forEach(snap=>{
      if(!snap.exists) return;
      const d=snap.data();
      if(d.date) prevAtt[d.date]=normalizeStatus(d.status);
    });
  }catch(e){}

  // Also pull from Google Sheet previous month Monthly Overview
  try{
    const prevMonthData = await callBridge({action:'getMonthlyAttendance', month: prevMonthPfx});
    if(prevMonthData && prevMonthData.success && Array.isArray(prevMonthData.agents)){
      const nl = name.toLowerCase().trim();
      const agentRow = prevMonthData.agents.find(a=>(a.name||'').toLowerCase().trim()===nl
        || (a.name||'').toLowerCase().includes(nl.split(' ')[0]));
      if(agentRow){
        Object.entries(agentRow.days||{}).forEach(([dayNum,status])=>{
          const d = parseInt(dayNum);
          if(d>=1&&d<=31){
            const dateStr = prevStart+'-'+String(d).padStart(2,'0');
            if(!prevAtt[dateStr]) prevAtt[dateStr]=normalizeStatus(status);
          }
        });
      }
    }
  }catch(e){}

  renderAgentCalendar('ap-cal-prev', prevYear, prevMonthIdx, prevAtt, '');
}

function renderAgentCalendar(elId, year, monthIdx, attMap, todayStr){
  const el = document.getElementById(elId);
  if(!el) return;
  const dayNames    = ['Su','Mo','Tu','We','Th','Fr','Sa'];
  const daysInMonth = new Date(year, monthIdx+1, 0).getDate();
  const firstDow    = new Date(year, monthIdx, 1).getDay();

  // Header row
  let html = dayNames.map(d=>`<div class="ap-cal-hdr">${d}</div>`).join('');

  // Empty cells before day 1
  for(let i=0;i<firstDow;i++) html+=`<div class="ap-cal-cell ap-cal-empty"></div>`;

  for(let d=1;d<=daysInMonth;d++){
    const dd      = String(d).padStart(2,'0');
    const mm      = String(monthIdx+1).padStart(2,'0');
    const dateStr = `${year}-${mm}-${dd}`;
    const isToday = dateStr===todayStr;
    const isFuture= todayStr && dateStr>todayStr;
    const raw     = attMap[dateStr]||'';
    const status  = normalizeStatus(raw)||raw;

    let cls='ap-cal-off', lbl='';

    if(isFuture){
      cls='ap-cal-future'; lbl='';
    } else if(status==='P'){
      cls='ap-cal-p'; lbl='P';
    } else if(status==='L'){
      cls='ap-cal-l'; lbl='L';
    } else if(status==='A'){
      cls='ap-cal-a'; lbl='A';
    } else if(status==='S'){
      cls='ap-cal-s'; lbl='S';
    } else if(status==='PO'){
      cls='ap-cal-a'; lbl='PO';
    } else if(status==='OFF'){
      cls='ap-cal-off'; lbl='—';
    } else {
      cls='ap-cal-off'; lbl='';
    }

    html+=`<div class="ap-cal-cell ${cls}${isToday?' ap-cal-today':''}" title="${dateStr}${status?' · '+status:''}">
      <span class="ap-cal-daynum">${d}</span>
      ${lbl?`<span class="ap-cal-lbl">${lbl}</span>`:''}
    </div>`;
  }
  el.innerHTML=html;
}

function renderWeekBars(elId, year, monthIdx, attMap){
  const el=document.getElementById(elId);
  if(!el) return;
  const daysInMonth=new Date(year,monthIdx+1,0).getDate();
  const monthStr=year+'-'+(monthIdx+1<10?'0':'')+(monthIdx+1);

  // Group into Mon–Sun weeks
  const weeks=[];
  let week=null;
  for(let d=1;d<=daysInMonth;d++){
    const dateStr=monthStr+'-'+(d<10?'0':'')+d;
    const dow=new Date(year,monthIdx,d).getDay();
    if(!week||dow===1){ // start new week on Monday
      if(week) weeks.push(week);
      week={label:'',days:[]};
    }
    if(!week.label) week.label=monthStr.split('-')[1]+'/'+String(d).padStart(2,'0');
    else week.end=String(d).padStart(2,'0');
    week.days.push({dateStr,dow});
  }
  if(week) weeks.push(week);

  el.innerHTML=weeks.map(w=>{
    let p=0,l=0,a=0,worked=0;
    w.days.forEach(({dateStr,dow})=>{
      const s=attMap[dateStr]||'';
      if(dow===0) return; // skip Sunday for bar (still in calendar)
      if(s==='P'){p++;worked++;}
      else if(s==='L'){l++;worked++;}
      else if(s==='A'||s==='S'||s==='PO'){a++;worked++;}
    });
    const total=p+l+a||1;
    const lbl=w.label+(w.end?'–'+w.end:'');
    return `<div class="ap-week-row">
      <div class="ap-week-lbl">Week ${lbl}</div>
      <div class="ap-week-bar-wrap">
        <div class="ap-week-seg p" style="width:${p/total*100}%">${p>0?p:''}</div>
        <div class="ap-week-seg l" style="width:${l/total*100}%">${l>0?l:''}</div>
        <div class="ap-week-seg a" style="width:${a/total*100}%">${a>0?a:''}</div>
      </div>
      <div class="ap-week-counts" style="color:#34d399;">${p}P ${l>0?'<span style="color:#fbbf24;">'+l+'L</span>':''} ${a>0?'<span style="color:#f87171;">'+a+'A</span>':''}</div>
    </div>`;
  }).join('');
}

// ── COACHING / MONITORING SESSIONS in agent profile ──
async function apLoadSessions(id, type){
  const listId = type==='coaching' ? 'ap-coaching-list' : 'ap-monitoring-list';
  const el = document.getElementById(listId);
  if(!el) return;
  el.innerHTML='<div style="color:#64748b;font-size:0.78rem;">Loading...</div>';

  const renderDocs = docs => {
    const filtered = type==='monitoring'
      ? docs.filter(d=>d.type==='monitoring')
      : docs.filter(d=>d.type!=='monitoring');
    if(!filtered.length){
      el.innerHTML=`<div style="color:#64748b;font-size:0.78rem;padding:20px 0;">No ${type} sessions recorded yet.</div>`;
      return;
    }
    // Use the shared renderNoteCard with full edit/delete
    el.innerHTML = filtered.map(d=>renderNoteCard(d, type)).join('');
  };

  const idStr = String(id||'');
  const idNum = parseFloat(id);

  const fetchDocs = async () => {
    // Try string id first
    try{
      const snap = await db.collection('coaching_sessions')
        .where('repId','==',idStr)
        .orderBy('createdAt','desc').limit(100).get();
      if(!snap.empty){ const d=[]; snap.forEach(doc=>d.push({id:doc.id,...doc.data()})); return d; }
    }catch(e){}
    // Try numeric id
    if(!isNaN(idNum)){
      try{
        const snap = await db.collection('coaching_sessions')
          .where('repId','==',idNum)
          .orderBy('createdAt','desc').limit(100).get();
        if(!snap.empty){ const d=[]; snap.forEach(doc=>d.push({id:doc.id,...doc.data()})); return d; }
      }catch(e){}
    }
    // Fallback: by agent name
    try{
      const agentName = currentRepProfile ? currentRepProfile.name : '';
      if(agentName){
        const snap = await db.collection('coaching_sessions').where('repName','==',agentName).get();
        const d=[]; snap.forEach(doc=>d.push({id:doc.id,...doc.data()}));
        return d.sort((a,b)=>(b.createdAt?.seconds||0)-(a.createdAt?.seconds||0));
      }
    }catch(e){}
    // Last resort: no-order query
    try{
      const snap = await db.collection('coaching_sessions').where('repId','==',idStr).get();
      const d=[]; snap.forEach(doc=>d.push({id:doc.id,...doc.data()}));
      return d.sort((a,b)=>(b.createdAt?.seconds||0)-(a.createdAt?.seconds||0));
    }catch(e){ return []; }
  };

  try{
    const docs = await fetchDocs();
    renderDocs(docs);
  }catch(e){ el.innerHTML='<div style="color:#f87171;">Could not load sessions.</div>'; }
}

// ── SCHEDULE ──
function apLoadSchedule(){
  if(!currentRepProfile) return;
  const r=currentRepProfile;
  const s=document.getElementById('rp-shift-input');
  const l=document.getElementById('rp-lunch-input');
  const b=document.getElementById('rp-break-input');

  // For the shift dropdown, find the closest matching option
  if(s){
    const shiftVal = (r.shift||'').toLowerCase().replace(/\s+/g,'');
    let matched = '';
    Array.from(s.options).forEach(opt=>{
      if(opt.value && opt.value.toLowerCase().replace(/\s+/g,'') === shiftVal) matched = opt.value;
    });
    s.value = matched || r.shift || '';
  }
  if(l) l.value=r.lunch||'';
  if(b) b.value=r.brk||'';
  const t=document.getElementById('rp-team-input');
  if(t) t.value=r.team||'';
  ['rp-shift-status','rp-lunch-status','rp-break-status','rp-team-status'].forEach(id=>{
    const el=document.getElementById(id); if(el) el.textContent='';
  });
}

// Keep old rpTab as alias for backward compat
function rpTab(tab,btn){
  const map={perf:'overview',schedule:'schedule',att:'attendance',coach:'coaching',audit:'audit'};
  apTab(map[tab]||tab, document.getElementById('apt-'+(map[tab]||tab)));
}

async function loadRepPerf(id,name,team){ apLoadOverview(id,name); }
async function loadRepAtt(id){
  if(currentRepProfile) apLoadAttendance(id, currentRepProfile.name);
}
async function loadRepCoach(id){
  apLoadSessions(id,'coaching');
}

async function saveRosterField(field){
  if(!currentRepProfile) return;
  const r = currentRepProfile;
  const inputEl  = document.getElementById('rp-'+field+'-input');
  const statusEl = document.getElementById('rp-'+field+'-status');
  if(!inputEl) return;
  const value = inputEl.value.trim();
  if(!value){
    if(statusEl){ statusEl.textContent='⚠ Please enter a value.'; statusEl.style.color='#f87171'; }
    return;
  }
  if(statusEl){ statusEl.textContent='Saving...'; statusEl.style.color='#64748b'; }

  // Team → Firebase + Google Sheet
  if(field==='team'){
    if(!r.id||r.id===''){ if(statusEl){ statusEl.textContent='❌ Agent ID missing'; statusEl.style.color='#f87171'; } return; }
    if(value!=='BB'&&value!=='PR'){ if(statusEl){ statusEl.textContent='⚠ Please select a team.'; statusEl.style.color='#f87171'; } return; }
    try{
      await db.collection('roster').doc(r.id).set({team:value},{merge:true});
      await callBridge({action:'updateRosterField', userId:r.id, field:'team', value}).catch(()=>{});
      currentRepProfile.team=value;
      if(ROSTER[r.id]) ROSTER[r.id].team=value;
      if(currentUser && String(currentUser.id)===String(r.id)){ currentUser.team=value; }
      const metaEl=document.getElementById('pe-meta');
      if(metaEl) metaEl.textContent=(value==='BB'?'Berbice (BB)':'Providence (PR)')+' · ID: '+r.id;
      if(statusEl){ statusEl.textContent='✅ Team saved — re-upload CSV to apply'; statusEl.style.color='#34d399'; }
      setTimeout(()=>{ if(statusEl) statusEl.textContent=''; },5000);
    }catch(e){
      if(statusEl){ statusEl.textContent='❌ '+e.message; statusEl.style.color='#f87171'; }
    }
    return;
  }

  // Break → Firebase only
  if(field==='break'){    try{
      if(!r.id||r.id===''){ throw new Error('Agent ID not found'); }
      await db.collection('roster').doc(r.id).set({brk:value},{merge:true});
      currentRepProfile.brk = value;
      if(statusEl){ statusEl.textContent='✅ Break saved'; statusEl.style.color='#34d399'; }
      if(currentUser && String(currentUser.id)===String(r.id)){ currentUser.brk=value; }
      setTimeout(()=>{ if(statusEl) statusEl.textContent=''; },4000);
    }catch(e){
      if(statusEl){ statusEl.textContent='❌ '+e.message; statusEl.style.color='#f87171'; }
    }
    return;
  }

  // Shift / Lunch → Google Sheet
  if(!r.id || r.id==='' || r.id==='unknown'){
    if(statusEl){ statusEl.textContent='❌ Agent ID missing — open profile from Agent Profiles tab'; statusEl.style.color='#f87171'; }
    return;
  }

  try{
    const result = await callBridge({action:'updateRosterField', userId:r.id, field, value});
    if(result && result.success){
      if(field==='shift'){
        currentRepProfile.shift=value;
        if(ROSTER[r.id]) ROSTER[r.id].shift=value;
        const sb=document.getElementById('ap-shift-badge');
        if(sb) sb.textContent=value;
      }
      if(field==='lunch'){
        currentRepProfile.lunch=value;
        if(ROSTER[r.id]) ROSTER[r.id].lunch=value;
        const mb=document.getElementById('rp-meta');
        if(mb) mb.textContent='ID: '+r.id+' · Lunch: '+value;
      }
      // Push to Firebase so agent sees update on next login
      const fbUp={}; fbUp[field]=value;
      await db.collection('roster').doc(r.id).set(fbUp,{merge:true}).catch(()=>{});
      if(currentUser && String(currentUser.id)===String(r.id)){
        currentUser[field]=value; showDashboard();
      }
      if(statusEl){ statusEl.textContent='✅ Saved to Google Sheet & Firebase'; statusEl.style.color='#34d399'; }
      setTimeout(()=>{ if(statusEl) statusEl.textContent=''; },4000);
    } else {
      if(statusEl){ statusEl.textContent='❌ '+(result?.error||'Save failed'); statusEl.style.color='#f87171'; }
    }
  }catch(e){
    if(statusEl){ statusEl.textContent='❌ '+e.message; statusEl.style.color='#f87171'; }
  }
}

async function loadRepPerf(id,name,team){
  const today=getTodayGY();
  try{
    const snap=await db.collection('attendance').doc(id+'_'+today).get();
    const el=document.getElementById('rp-att-status');
    if(snap.exists){
      const d=snap.data();
      const s=d.status==='P'||d.status==='Present'?'Present':d.status==='L'||d.status==='Late'?'Late':d.status||'Unknown';
      el.innerHTML=`<span class="att-badge ${s==='Present'?'att-p':s==='Late'?'att-l':'att-a'}">${s}</span><span style="font-size:0.7rem;color:var(--muted);margin-left:8px;">Logged in today</span>`;
    } else {
      el.innerHTML='<span class="att-badge att-pending">Not logged in yet</span>';
    }
  }catch(e){}
  try{
    const snap2=await db.collection('taps').doc(id+'_'+today).get();
    if(snap2.exists){
      const d=snap2.data();
      document.getElementById('rp-live-calls').textContent=d.calls||0;
      document.getElementById('rp-live-xfer').textContent=d.xfer||0;
      document.getElementById('rp-live-conv').textContent=d.calls>0?Math.round((d.xfer/d.calls)*100)+'%':'0%';
    } else {
      ['rp-live-calls','rp-live-xfer'].forEach(id=>document.getElementById(id).textContent='0');
      document.getElementById('rp-live-conv').textContent='0%';
    }
  }catch(e){}
  // Stats from CSV
  const csvAgent=statsData.find(r=>r.name.toLowerCase()===name.toLowerCase()||name.toLowerCase().includes(r.name.toLowerCase()));
  if(csvAgent){
    document.getElementById('rp-live-calls').textContent=csvAgent.calls;
    document.getElementById('rp-live-xfer').textContent=csvAgent.xfer;
    document.getElementById('rp-live-conv').textContent=csvAgent.conv+'%';
  }
}

async function loadRepAtt(id){
  const today=getTodayGY();
  const monthStart=today.substring(0,7);
  try{
    const snap=await db.collection('attendance')
      .where('id','==',id)
      .where('date','>=',monthStart+'-01')
      .get();
    let p=0,l=0,a=0;
    snap.forEach(doc=>{
      const d=doc.data();
      if(d.status==='Present'||d.status==='P') p++;
      else if(d.status==='Late'||d.status==='L') l++;
      else a++;
    });
    document.getElementById('rp-att-p').textContent=p;
    document.getElementById('rp-att-l').textContent=l;
    document.getElementById('rp-att-a').textContent=a;
  }catch(e){}
}

async function loadRepAudit(id){
  const list = document.getElementById('audit-list');
  if(!list) return;
  list.innerHTML='<div style="color:#64748b;font-size:0.78rem;">Loading...</div>';
  const idStr = String(id||'');
  const idNum = parseFloat(id);
  try{
    let snap = await db.collection('sessions').where('id','==',idStr).orderBy('loginTime','desc').limit(20).get();
    if(snap.empty && !isNaN(idNum)){
      snap = await db.collection('sessions').where('id','==',idNum).orderBy('loginTime','desc').limit(20).get();
    }
    if(snap.empty){ list.innerHTML='<div style="color:#64748b;font-size:0.78rem;">No login history found.</div>'; return; }
    list.innerHTML='';
    snap.forEach(doc=>{
      const d=doc.data();
      const date=d.loginTime?new Date(d.loginTime.seconds*1000).toLocaleString('en-US',{timeZone:'America/Guyana',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}):'—';
      list.innerHTML+=`<div class="ap-login-row">
        <span style="color:#e2e8f0;font-weight:600;">${d.date||'—'}</span>
        <span style="color:#64748b;">Logged in at <strong style="color:#60a5fa;">${date}</strong></span>
      </div>`;
    });
  }catch(e){
    list.innerHTML='<div style="color:#64748b;">Could not load audit log.</div>';
  }
}

async function markAgentAbsent(status){
  if(!currentRepProfile) return;
  const {id,name,team,shift}=currentRepProfile;
  const today=getTodayGY();
  const labels={P:'Present',L:'Late',A:'Absent',S:'Sick',PO:'Personal Out'};
  const label = labels[status]||status;
  if(!confirm('Mark '+name+' as '+label+' for today?')) return;
  try{
    await db.collection('attendance').doc(id+'_'+today).set({
      id, name, team, shift, date:today, status,
      markedBy:'admin', loginTime:firebase.firestore.FieldValue.serverTimestamp()
    },{merge:true});
    // Also write to Google Sheet weekly tab
    try{ await callBridge({action:'markAttendance', name, team, status}); }catch(e){}
    // Refresh the overview stats
    apLoadOverview(id, name);
  }catch(e){ alert('Could not save: '+e.message); }
}

async function markAgentAbsentDirect(id,name,team){
  const status=prompt('Mark '+name+' as:\nP = Present  L = Late  A = Absent  S = Sick  PO = Personal Out\n\nType the code:','A');
  if(!status) return;
  const today=getTodayGY();
  try{
    await db.collection('attendance').doc(id+'_'+today).set({
      id,name,team,date:today,status:status.toUpperCase().trim(),
      markedBy:'admin',loginTime:firebase.firestore.FieldValue.serverTimestamp()
    },{merge:true});
    loadAdminAttendance();
  }catch(e){alert('Could not save.');}
}


// ══════════════════════════════════════════════
//  WEEKLY PERFORMANCE TAB
//  Aggregates all saved CSV reports within the
//  current Mon–Sun week (and past weeks) and
//  ranks every rep by total transfers
// ══════════════════════════════════════════════
let wpTeamFilter  = 'all';
let wpWeekRanges  = []; // [{label, start, end}] populated from reports
let wpAllReports  = []; // all parsed reports with dates

function wpSetTeam(team, btn){
  wpTeamFilter = team;
  ['all','bb','pr'].forEach(t=>{
    const b = document.getElementById('wp-'+t);
    if(!b) return;
    const active = t === team.toLowerCase() || (team==='all'&&t==='all') || (team==='BB'&&t==='bb') || (team==='PR'&&t==='pr');
    b.style.borderColor = active ? (team==='BB'?'var(--accent)':team==='PR'?'var(--purple)':'var(--accent)') : 'var(--border)';
    b.style.background  = active ? (team==='BB'?'#0b1a38':team==='PR'?'#160e2c':'#0b1a38') : 'transparent';
    b.style.color       = active ? (team==='BB'?'var(--accent)':team==='PR'?'var(--purple)':'var(--accent)') : 'var(--muted)';
  });
  renderWeeklyPerformance();
}

// Get Monday of week containing a date string YYYY-MM-DD
// Uses T12:00:00 to avoid UTC timezone shifting the date
function getMondayOf(dateStr){
  const d = new Date(dateStr+'T12:00:00');
  const day = d.getDay(); // 0=Sun,1=Mon...6=Sat
  const diff = (day === 0) ? -6 : 1 - day; // Monday = day 1, diff=0; Sun = day 0, diff=-6
  const mon = new Date(d);
  mon.setDate(d.getDate() + diff);
  // Return as YYYY-MM-DD using local date parts (not toISOString which is UTC)
  const y = mon.getFullYear();
  const m = String(mon.getMonth()+1).padStart(2,'0');
  const dd= String(mon.getDate()).padStart(2,'0');
  return `${y}-${m}-${dd}`;
}

function getSundayOf(mondayStr){
  const d = new Date(mondayStr+'T12:00:00');
  d.setDate(d.getDate() + 6);
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,'0');
  const dd= String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${dd}`;
}

function fmtDate(str){
  const d = new Date(str+'T12:00:00');
  return d.toLocaleDateString('en-US',{month:'short',day:'numeric'});
}

async function loadWeeklyPerformance(){
  const content = document.getElementById('wp-content');
  const summary = document.getElementById('wp-summary');
  if(!content) return;
  content.innerHTML='<div style="text-align:center;color:var(--muted);padding:40px;font-size:0.85rem;">⏳ Loading reports...</div>';

  // Always reload all reports fresh — need full history across all weeks
  try{
    const snap = await db.collection('reports').orderBy('uploadedAt','desc').get();
    reportHistory=[];
    snap.forEach(doc=>{ const d=doc.data(); if(d.statsJSON) reportHistory.push(d); });
  }catch(e){ console.error('Weekly perf load error:',e); }

  if(!reportHistory.length){
    content.innerHTML='<div style="color:var(--muted);text-align:center;padding:40px;">No saved reports yet. Upload CSVs in Agent Stats to build history.</div>';
    return;
  }

  // Parse all reports — use stored team (correctly set at upload time)
  wpAllReports = [];
  reportHistory.forEach(r=>{
    try{
      const raw = JSON.parse(r.statsJSON);
      // Use stored team value — do NOT re-resolve (resolveAgentTeam defaults to BB for
      // anyone not in ROSTER, causing PR agents to appear as BB)
      const agents = raw.map(a=>({
        ...a,
        team: a.team || 'BB',
        _inactive: isAgentInactive(a)
      }));
      wpAllReports.push({date: r.date, agents});
    }catch(e){}
  });

  // Build week ranges from all report dates
  const weekSet = {};
  wpAllReports.forEach(r=>{
    const mon = getMondayOf(r.date);
    const sun = getSundayOf(mon);
    const label = fmtDate(mon)+' – '+fmtDate(sun);
    weekSet[mon] = {label, start:mon, end:sun};
  });
  wpWeekRanges = Object.values(weekSet).sort((a,b)=>b.start.localeCompare(a.start));

  // Populate week selector
  const sel = document.getElementById('wp-week-select');
  if(sel){
    // Get current week's Monday to flag it
    const todayMon = getMondayOf(getTodayGY());
    sel.innerHTML = wpWeekRanges.map((w,i)=>{
      const isCurrent = w.start === todayMon;
      const isPrev    = w.start < todayMon;
      const prefix    = isCurrent ? '⚡ This Week — ' : isPrev ? '📅 ' : '📅 ';
      return `<option value="${i}">${prefix}${w.label}</option>`;
    }).join('');
    // Always default to current week if it exists, else most recent
    const currentIdx = wpWeekRanges.findIndex(w=>w.start===todayMon);
    sel.value = currentIdx >= 0 ? String(currentIdx) : '0';
  }

  renderWeeklyPerformance();
}

function renderWeeklyPerformance(){
  const content = document.getElementById('wp-content');
  const summary = document.getElementById('wp-summary');
  if(!content || !wpWeekRanges.length) return;

  const sel = document.getElementById('wp-week-select');
  const weekIdx = sel ? parseInt(sel.value)||0 : 0;
  const week = wpWeekRanges[weekIdx];
  if(!week) return;

  // Update label
  const todayMon2 = getMondayOf(getTodayGY());
  const isCurrentWeek = week.start === todayMon2;
  const isPastWeek    = week.start < todayMon2;
  const lbl = document.getElementById('wp-week-label');
  if(lbl){
    lbl.textContent = (isCurrentWeek ? '⚡ CURRENT WEEK — ' : isPastWeek ? '📅 PREV WEEK — ' : '📅 ') + week.label;
    lbl.style.color = isCurrentWeek ? 'var(--green)' : 'var(--gold)';
  }

  // Get all reports within this Mon–Sun window
  const weekReports = wpAllReports.filter(r=> r.date >= week.start && r.date <= week.end);

  if(!weekReports.length){
    content.innerHTML='<div style="color:var(--muted);text-align:center;padding:30px;">No reports uploaded for this week.</div>';
    summary.innerHTML='';
    return;
  }

  // Aggregate per agent across all days in the week
  // Use ytelId as primary key so same person across reports is always merged correctly
  const agentMap = {};
  weekReports.forEach(report=>{
    report.agents.forEach(a=>{
      // Skip inactive agents (pre-computed at load time via isAgentInactive)
      if(a._inactive) return;
      // Team already resolved at load time
      const resolvedTeam = a.team;
      // Key by ytelId if available, else cleaned name — prevents duplicates across reports
      const key = a.ytelId ? 'id_'+a.ytelId : 'name_'+a.name.toLowerCase().trim();
      if(!agentMap[key]){
        agentMap[key] = {
          name: a.name, nameRaw: a.nameRaw||'', ytelId: a.ytelId||'',
          team: resolvedTeam, xfer:0, calls:0, ci:0, dnc:0, ni:0,
          convSum:0, days:0, dailyXfer:{}
        };
      }
      // Always keep the most accurate team from latest resolution
      agentMap[key].team = resolvedTeam;
      agentMap[key].xfer    += (a.xfer||0);
      agentMap[key].calls   += (a.calls||0);
      agentMap[key].ci      += (a.ci||0);
      agentMap[key].dnc     += (a.dnc||0);
      agentMap[key].ni      += (a.ni||0);
      agentMap[key].convSum += (a.conv||0);
      agentMap[key].days    += 1;
      agentMap[key].dailyXfer[report.date] = (agentMap[key].dailyXfer[report.date]||0) + (a.xfer||0);
    });
  });

  // Get sorted days for the week
  const weekDays = [...new Set(weekReports.map(r=>r.date))].sort();

  // Filter by team
  let agents = Object.values(agentMap);
  if(wpTeamFilter === 'BB') agents = agents.filter(a=>a.team==='BB');
  if(wpTeamFilter === 'PR') agents = agents.filter(a=>a.team==='PR');

  // Sort by total xfer descending
  agents.sort((a,b)=>b.xfer - a.xfer);

  if(!agents.length){
    content.innerHTML='<div style="color:var(--muted);text-align:center;padding:30px;">No data for selected team.</div>';
    summary.innerHTML='';
    return;
  }

  // Summary cards
  const totalXfer  = agents.reduce((s,a)=>s+a.xfer,0);
  const totalCalls = agents.reduce((s,a)=>s+a.calls,0);
  const bbXfer     = Object.values(agentMap).filter(a=>a.team==='BB').reduce((s,a)=>s+a.xfer,0);
  const prXfer     = Object.values(agentMap).filter(a=>a.team==='PR').reduce((s,a)=>s+a.xfer,0);
  const topRep     = agents[0];

  summary.innerHTML = [
    {label:'TOTAL XFERS',   val:totalXfer,              color:'var(--green)'},
    {label:'TOTAL CALLS',   val:totalCalls.toLocaleString(), color:'var(--accent)'},
    {label:'🏠 BERBICE',    val:bbXfer,                 color:'var(--accent)'},
    {label:'🌴 PROVIDENCE', val:prXfer,                 color:'var(--purple)'},
    {label:'DAYS LOADED',   val:weekDays.length,        color:'var(--gold)'},
    {label:'REPS TRACKED',  val:agents.length,          color:'var(--cyan)'},
  ].map(s=>`<div style="background:#0a1020;border:1px solid var(--border);border-radius:9px;padding:10px;text-align:center;">
    <div style="font-family:'Bebas Neue',sans-serif;font-size:1.7rem;color:${s.color};line-height:1;">${s.val}</div>
    <div style="font-size:0.48rem;color:var(--muted);font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin-top:2px;">${s.label}</div>
  </div>`).join('');

  // Build the leaderboard
  const maxXfer = agents[0].xfer || 1;
  let html = `
  <div style="font-size:0.55rem;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:10px;">
    RANKED BY TRANSFERS — ${weekDays.length} DAY${weekDays.length!==1?'S':''} (${weekDays.map(fmtDate).join(', ')})
  </div>`;

  agents.forEach((a, idx)=>{
    const rank     = idx+1;
    const avgConv  = a.days>0 ? (a.convSum/a.days).toFixed(1) : '0.0';
    const barPct   = Math.round((a.xfer/maxXfer)*100);
    const teamColor= a.team==='BB'?'var(--accent)':'var(--purple)';
    const teamLabel= a.team==='BB'?'BB':'PR';
    const medal    = rank===1?'🥇':rank===2?'🥈':rank===3?'🥉':'';
    const convColor= avgConv>=5?'var(--green)':avgConv>=2?'var(--gold)':'var(--red)';

    // Daily breakdown dots
    const dots = weekDays.map(d=>{
      const v = a.dailyXfer[d]||0;
      const dotColor = v>=5?'var(--green)':v>=2?'var(--gold)':v>0?'var(--accent)':'#1a2540';
      return `<span title="${fmtDate(d)}: ${v} xfer" style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${dotColor};margin:0 1px;"></span>`;
    }).join('');

    html += `
    <div style="background:#090f1e;border:1px solid ${rank<=3?teamColor:'var(--border)'};border-radius:11px;padding:13px 14px;margin-bottom:7px;${rank<=3?'box-shadow:0 0 12px rgba(0,0,0,0.3);':''}">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
        <div style="font-family:'Bebas Neue',sans-serif;font-size:1.4rem;color:${rank<=3?teamColor:'var(--muted)'};min-width:28px;">${medal||'#'+rank}</div>
        <div style="flex:1;">
          <div style="font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:1rem;color:var(--text);">${a.name}</div>
          <div style="font-size:0.6rem;color:${teamColor};font-weight:700;letter-spacing:1px;">${teamLabel}</div>
        </div>
        <div style="text-align:right;">
          <div style="font-family:'Bebas Neue',sans-serif;font-size:1.8rem;color:var(--green);line-height:1;">${a.xfer}</div>
          <div style="font-size:0.5rem;color:var(--muted);font-weight:700;letter-spacing:1px;text-transform:uppercase;">xfers</div>
        </div>
      </div>

      <!-- Transfer bar -->
      <div style="background:#0a1020;border-radius:4px;height:6px;overflow:hidden;margin-bottom:8px;">
        <div style="width:${barPct}%;height:100%;background:linear-gradient(90deg,${teamColor},var(--green));border-radius:4px;transition:width 0.5s;"></div>
      </div>

      <!-- Stats row -->
      <div style="display:flex;gap:14px;font-size:0.7rem;margin-bottom:8px;">
        <span style="color:var(--muted);">Calls: <strong style="color:var(--text);">${a.calls.toLocaleString()}</strong></span>
        <span style="color:var(--muted);">CI: <strong style="color:var(--text);">${a.ci.toLocaleString()}</strong></span>
        <span style="color:var(--muted);">Avg Conv: <strong style="color:${convColor};">${avgConv}%</strong></span>
        <span style="color:var(--muted);">Days: <strong style="color:var(--text);">${a.days}</strong></span>
      </div>

      <!-- Daily dots -->
      <div style="display:flex;align-items:center;gap:4px;">
        <span style="font-size:0.55rem;color:var(--muted);margin-right:4px;">Daily:</span>
        ${dots}
        <span style="font-size:0.62rem;color:var(--muted);margin-left:6px;">${weekDays.map(d=>{
          const v=a.dailyXfer[d]||0;
          return `<span style="margin-right:4px;">${fmtDate(d)}: <strong style="color:${v>=5?'var(--green)':v>=2?'var(--gold)':v>0?'var(--accent)':'var(--muted)'}">${v}</strong></span>`;
        }).join('')}</span>
      </div>
    </div>`;
  });

  content.innerHTML = html;
}

// ── LOAD TODAY REPORT SHORTCUT ──
function loadTodayReport(){
  if(!reportHistory.length) return;
  const idx = reportHistory.findIndex(r=>r.date===getTodayGY());
  if(idx>=0) loadReportByIndex(idx);
  else { statsData=[]; statsDataDate=''; renderStatsTable(); }
}

// ══════════════════════════════════════════════
//  REP STATS HISTORY TAB
// ══════════════════════════════════════════════
let shCurrentView = 'daily';

function shSetView(view){
  shCurrentView = view;
  ['daily','weekly','monthly'].forEach(v=>{
    const btn = document.getElementById('sh-view-'+v);
    if(!btn) return;
    const active = v===view;
    btn.style.borderColor = active ? 'var(--accent)' : 'var(--border)';
    btn.style.background  = active ? '#0b1a38' : 'transparent';
    btn.style.color       = active ? 'var(--accent)' : 'var(--muted)';
  });
  if(currentRepProfile) apLoadStatsHistory(currentRepProfile.name);
}

async function apLoadStatsHistory(name){
  const el = document.getElementById('ap-stats-content');
  if(!el) return;
  el.innerHTML='<div style="color:var(--muted);text-align:center;padding:30px;font-size:0.82rem;">⏳ Loading...</div>';

  if(!reportHistory.length){
    // Try loading from Firestore if not yet loaded
    try{
      const snap = await db.collection('reports').orderBy('uploadedAt','desc').get();
      reportHistory=[];
      snap.forEach(doc=>{ const d=doc.data(); if(d.statsJSON) reportHistory.push(d); });
    }catch(e){}
  }

  if(!reportHistory.length){
    el.innerHTML='<div style="color:var(--muted);text-align:center;padding:30px;font-size:0.82rem;">No saved reports yet. Upload CSVs in Agent Stats to build history.</div>';
    return;
  }

  const nameLower = name.toLowerCase();

  // Pull this agent's data from every saved report
  const agentReports = [];
  reportHistory.forEach(report=>{
    try{
      const data = JSON.parse(report.statsJSON);
      const match = data.find(r=>{
        const rn = r.name.toLowerCase();
        return rn===nameLower || (rn.includes(nameLower.split(' ')[0]) && rn.includes(nameLower.split(' ').slice(-1)[0]));
      });
      if(match) agentReports.push({date: report.date, ...match});
    }catch(e){}
  });

  // Sort oldest → newest
  agentReports.sort((a,b)=>a.date.localeCompare(b.date));

  if(!agentReports.length){
    el.innerHTML='<div style="color:var(--muted);text-align:center;padding:30px;font-size:0.82rem;">No data found for this agent in saved reports.</div>';
    return;
  }

  if(shCurrentView==='daily')   shRenderDaily(el, agentReports);
  else if(shCurrentView==='weekly')  shRenderGrouped(el, agentReports, 'week');
  else shRenderGrouped(el, agentReports, 'month');
}

function shRenderDaily(el, reports){
  // Summary totals
  const totXfer  = reports.reduce((s,r)=>s+r.xfer,0);
  const totCalls = reports.reduce((s,r)=>s+r.calls,0);
  const avgConv  = reports.length ? (reports.reduce((s,r)=>s+r.conv,0)/reports.length).toFixed(1) : 0;
  const bestDay  = [...reports].sort((a,b)=>b.xfer-a.xfer)[0];

  let html = `
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px;">
    <div style="background:#0a1020;border:1px solid var(--border);border-radius:9px;padding:10px;text-align:center;">
      <div style="font-family:'Bebas Neue',sans-serif;font-size:1.8rem;color:var(--green);line-height:1;">${totXfer}</div>
      <div style="font-size:0.5rem;color:var(--muted);font-weight:700;letter-spacing:1px;text-transform:uppercase;">Total Transfers</div>
    </div>
    <div style="background:#0a1020;border:1px solid var(--border);border-radius:9px;padding:10px;text-align:center;">
      <div style="font-family:'Bebas Neue',sans-serif;font-size:1.8rem;color:var(--accent);line-height:1;">${totCalls.toLocaleString()}</div>
      <div style="font-size:0.5rem;color:var(--muted);font-weight:700;letter-spacing:1px;text-transform:uppercase;">Total Calls</div>
    </div>
    <div style="background:#0a1020;border:1px solid var(--border);border-radius:9px;padding:10px;text-align:center;">
      <div style="font-family:'Bebas Neue',sans-serif;font-size:1.8rem;color:var(--gold);line-height:1;">${avgConv}%</div>
      <div style="font-size:0.5rem;color:var(--muted);font-weight:700;letter-spacing:1px;text-transform:uppercase;">Avg Conv %</div>
    </div>
  </div>
  ${bestDay?`<div style="background:var(--green-light);border:1px solid rgba(52,211,153,0.3);border-radius:8px;padding:8px 12px;margin-bottom:12px;font-size:0.75rem;color:var(--green);">⭐ Best day: <strong>${bestDay.date}</strong> — ${bestDay.xfer} transfers, ${bestDay.conv}% conv</div>`:''}
  <div style="font-size:0.55rem;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:8px;">DAILY BREAKDOWN (${reports.length} report${reports.length!==1?'s':''})</div>
  <div style="overflow-x:auto;">
  <table style="width:100%;border-collapse:collapse;font-size:0.78rem;">
    <thead><tr style="border-bottom:1px solid var(--border);">
      <th style="padding:6px 8px;text-align:left;color:var(--muted);font-size:0.58rem;letter-spacing:1px;">DATE</th>
      <th style="padding:6px 8px;text-align:right;color:var(--muted);font-size:0.58rem;letter-spacing:1px;">CALLS</th>
      <th style="padding:6px 8px;text-align:right;color:var(--muted);font-size:0.58rem;letter-spacing:1px;">CI</th>
      <th style="padding:6px 8px;text-align:right;color:var(--muted);font-size:0.58rem;letter-spacing:1px;">XFER</th>
      <th style="padding:6px 8px;text-align:right;color:var(--muted);font-size:0.58rem;letter-spacing:1px;">DNC</th>
      <th style="padding:6px 8px;text-align:right;color:var(--muted);font-size:0.58rem;letter-spacing:1px;">NI</th>
      <th style="padding:6px 8px;text-align:right;color:var(--muted);font-size:0.58rem;letter-spacing:1px;">CONV%</th>
      <th style="padding:6px 8px;text-align:right;color:var(--muted);font-size:0.58rem;letter-spacing:1px;">TREND</th>
    </tr></thead>
    <tbody>`;

  reports.slice().reverse().forEach((r,i,arr)=>{
    const prev = arr[i+1];
    const xferDelta = prev ? r.xfer - prev.xfer : null;
    const convDelta = prev ? (r.conv - prev.conv).toFixed(1) : null;
    const trendIcon = xferDelta===null ? '' : xferDelta>0 ? `<span style="color:var(--green);">▲${xferDelta}</span>` : xferDelta<0 ? `<span style="color:var(--red);">▼${Math.abs(xferDelta)}</span>` : `<span style="color:var(--muted);">—</span>`;
    const cc = r.conv>=5?'var(--green)':r.conv>=2?'var(--gold)':'var(--red)';
    const isToday = r.date === getTodayGY();
    html += `<tr style="border-bottom:1px solid #0d1a2e;${isToday?'background:rgba(52,211,153,0.05);':''}">
      <td style="padding:7px 8px;color:${isToday?'var(--green)':'var(--text)'};font-weight:${isToday?'800':'600'};font-size:0.75rem;">${r.date}${isToday?' ⚡':''}</td>
      <td style="padding:7px 8px;text-align:right;color:var(--muted);">${r.calls.toLocaleString()}</td>
      <td style="padding:7px 8px;text-align:right;color:var(--muted);">${r.ci.toLocaleString()}</td>
      <td style="padding:7px 8px;text-align:right;font-weight:800;color:var(--green);">${r.xfer}</td>
      <td style="padding:7px 8px;text-align:right;color:var(--red);">${r.dnc}</td>
      <td style="padding:7px 8px;text-align:right;color:var(--gold);">${r.ni}</td>
      <td style="padding:7px 8px;text-align:right;font-weight:800;color:${cc};">${r.conv}%</td>
      <td style="padding:7px 8px;text-align:right;font-size:0.72rem;">${trendIcon}</td>
    </tr>`;
  });

  html += '</tbody></table></div>';
  el.innerHTML = html;
}

function shRenderGrouped(el, reports, groupBy){
  // Group by week (Mon-Sun) or month
  const groups = {};
  reports.forEach(r=>{
    let key;
    if(groupBy==='month'){
      key = r.date.substring(0,7); // YYYY-MM
    } else {
      // Get Monday of that week
      const d = new Date(r.date);
      const day = d.getDay(); // 0=Sun
      const diff = d.getDate() - (day===0?6:day-1);
      const mon = new Date(d.setDate(diff));
      key = mon.toISOString().split('T')[0];
    }
    if(!groups[key]) groups[key]=[];
    groups[key].push(r);
  });

  const keys = Object.keys(groups).sort().reverse();
  if(!keys.length){ el.innerHTML='<div style="color:var(--muted);text-align:center;padding:20px;">No data.</div>'; return; }

  let html = `<div style="font-size:0.55rem;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:10px;">${groupBy==='month'?'MONTHLY':'WEEKLY'} SUMMARY</div>`;

  keys.forEach(key=>{
    const reps = groups[key];
    const totalXfer  = reps.reduce((s,r)=>s+r.xfer,0);
    const totalCalls = reps.reduce((s,r)=>s+r.calls,0);
    const totalCI    = reps.reduce((s,r)=>s+r.ci,0);
    const totalDNC   = reps.reduce((s,r)=>s+r.dnc,0);
    const totalNI    = reps.reduce((s,r)=>s+r.ni,0);
    const avgConv    = reps.length ? (reps.reduce((s,r)=>s+r.conv,0)/reps.length).toFixed(1) : 0;
    const label      = groupBy==='month' ? key : `Week of ${key} (${reps.length} day${reps.length!==1?'s':''})`;
    const cc         = avgConv>=5?'var(--green)':avgConv>=2?'var(--gold)':'var(--red)';

    html += `<div style="background:#090f1e;border:1px solid var(--border);border-radius:10px;padding:12px 14px;margin-bottom:10px;">
      <div style="font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:0.95rem;color:var(--text);margin-bottom:10px;">${label}</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:8px;">
        <div style="background:#0a1020;border-radius:7px;padding:8px;text-align:center;">
          <div style="font-family:'Bebas Neue',sans-serif;font-size:1.5rem;color:var(--green);line-height:1;">${totalXfer}</div>
          <div style="font-size:0.48rem;color:var(--muted);font-weight:700;letter-spacing:1px;text-transform:uppercase;">Transfers</div>
        </div>
        <div style="background:#0a1020;border-radius:7px;padding:8px;text-align:center;">
          <div style="font-family:'Bebas Neue',sans-serif;font-size:1.5rem;color:var(--accent);line-height:1;">${totalCalls.toLocaleString()}</div>
          <div style="font-size:0.48rem;color:var(--muted);font-weight:700;letter-spacing:1px;text-transform:uppercase;">Calls</div>
        </div>
        <div style="background:#0a1020;border-radius:7px;padding:8px;text-align:center;">
          <div style="font-family:'Bebas Neue',sans-serif;font-size:1.5rem;color:${cc};line-height:1;">${avgConv}%</div>
          <div style="font-size:0.48rem;color:var(--muted);font-weight:700;letter-spacing:1px;text-transform:uppercase;">Avg Conv</div>
        </div>
      </div>
      <div style="display:flex;gap:12px;font-size:0.7rem;color:var(--muted);">
        <span>CI: <strong style="color:var(--text);">${totalCI.toLocaleString()}</strong></span>
        <span>DNC: <strong style="color:var(--red);">${totalDNC}</strong></span>
        <span>NI: <strong style="color:var(--gold);">${totalNI}</strong></span>
        <span>Days: <strong style="color:var(--text);">${reps.length}</strong></span>
      </div>
      <!-- Day breakdown inside the week/month -->
      <div style="margin-top:10px;border-top:1px solid var(--border);padding-top:8px;display:flex;flex-wrap:wrap;gap:5px;">
        ${reps.slice().reverse().map(r=>{
          const daycc=r.conv>=5?'var(--green)':r.conv>=2?'var(--gold)':'var(--red)';
          return `<div style="background:#060b18;border:1px solid #1a2540;border-radius:6px;padding:5px 8px;font-size:0.65rem;">
            <div style="color:var(--muted);margin-bottom:2px;">${r.date}</div>
            <div style="font-weight:800;color:var(--green);">${r.xfer} xfer</div>
            <div style="color:${daycc};">${r.conv}%</div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  });

  el.innerHTML = html;
}

// ── LOAD TODAY REPORT SHORTCUT ──
function loadTodayReport(){
  if(!reportHistory.length) return;
  const idx = reportHistory.findIndex(r=>r.date===getTodayGY());
  if(idx>=0) loadReportByIndex(idx);
  else { statsData=[]; statsDataDate=''; renderStatsTable(); }
}

// ── REP PROFILE: REBUTTAL MINI CARD (Overview Tab) ──
async function apLoadRebuttalMini(id, name){
  const el = document.getElementById('rp-rb-mini-content');
  if(!el) return;
  const today = getTodayGY();
  try{
    const snap = await db.collection('rebuttal_clicks').doc(id+'_'+today).get();
    if(!snap.exists){
      el.innerHTML='<div style="color:var(--red);font-size:0.78rem;font-weight:700;">⚠️ No rebuttals opened today yet</div>';
      return;
    }
    const d = snap.data();
    const clicks = d.clicks||{};
    const total = Object.values(clicks).reduce((s,v)=>s+v,0);
    const used = Object.keys(clicks).filter(k=>clicks[k]>0).length;
    const allKeys = Object.keys(REBUTTAL_LABELS);
    const critMissing = CRITICAL_REBUTTALS.filter(k=>!clicks[k]);
    const top3 = Object.entries(clicks).sort((a,b)=>b[1]-a[1]).slice(0,3);
    const engPct = Math.round((used/allKeys.length)*100);
    const engColor = engPct>=60?'var(--green)':engPct>=30?'var(--gold)':'var(--red)';

    el.innerHTML=`
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:10px;">
        <div style="background:#0a1020;border-radius:8px;padding:8px;text-align:center;">
          <div style="font-family:'Bebas Neue',sans-serif;font-size:1.6rem;color:var(--accent);line-height:1;">${total}</div>
          <div style="font-size:0.5rem;color:var(--muted);font-weight:700;letter-spacing:1px;text-transform:uppercase;">Total Opens</div>
        </div>
        <div style="background:#0a1020;border-radius:8px;padding:8px;text-align:center;">
          <div style="font-family:'Bebas Neue',sans-serif;font-size:1.6rem;color:${engColor};line-height:1;">${engPct}%</div>
          <div style="font-size:0.5rem;color:var(--muted);font-weight:700;letter-spacing:1px;text-transform:uppercase;">Coverage</div>
        </div>
        <div style="background:#0a1020;border-radius:8px;padding:8px;text-align:center;">
          <div style="font-family:'Bebas Neue',sans-serif;font-size:1.6rem;color:${critMissing.length>0?'var(--red)':'var(--green)'};line-height:1;">${critMissing.length===0?'✓':critMissing.length}</div>
          <div style="font-size:0.5rem;color:var(--muted);font-weight:700;letter-spacing:1px;text-transform:uppercase;">Crit Missing</div>
        </div>
      </div>
      ${top3.length>0?`<div style="font-size:0.55rem;color:var(--muted);font-weight:800;letter-spacing:2px;text-transform:uppercase;margin-bottom:5px;">🔥 MOST USED TODAY</div>
      <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:8px;">
        ${top3.map(([k,v])=>`<span style="background:#111c30;border:1px solid #2a3a5a;border-radius:6px;padding:3px 9px;font-size:0.7rem;color:var(--text);">${REBUTTAL_LABELS[k]||k} <strong style="color:var(--gold);">×${v}</strong></span>`).join('')}
      </div>`:''}
      ${critMissing.length>0?`<div style="background:var(--red-light);border:1px solid rgba(248,113,113,0.35);border-radius:8px;padding:8px 10px;font-size:0.72rem;color:var(--red);">
        🚨 <strong>Critical not opened:</strong> ${critMissing.map(k=>REBUTTAL_LABELS[k]||k).join(', ')}
      </div>`:'<div style="background:var(--green-light);border:1px solid rgba(52,211,153,0.3);border-radius:8px;padding:8px 10px;font-size:0.72rem;color:var(--green);">✅ All critical rebuttals covered today</div>'}`;
  }catch(e){
    el.innerHTML='<div style="color:var(--muted);font-size:0.75rem;">Could not load rebuttal data.</div>';
  }
}

// ── REP PROFILE: REBUTTAL FULL TAB ──
async function apLoadRebuttalUsage(id, name){
  const summaryEl  = document.getElementById('ap-rb-summary');
  const signalsEl  = document.getElementById('ap-rb-signals');
  const barsEl     = document.getElementById('ap-rb-bars');
  const neverEl    = document.getElementById('ap-rb-never');
  if(!summaryEl) return;

  const range = document.getElementById('ap-rebuttal-range')?.value || 'today';
  const idStr = String(id||'');
  const allKeys = Object.keys(REBUTTAL_LABELS);

  summaryEl.innerHTML='<div style="color:var(--muted);font-size:0.75rem;grid-column:1/-1;">Loading...</div>';
  barsEl.innerHTML='';
  neverEl.innerHTML='';
  signalsEl.innerHTML='';

  try{
    let query = db.collection('rebuttal_clicks').where('id','==',idStr);
    if(range==='today'){
      query = query.where('date','==',getTodayGY());
    } else if(range!=='all'){
      const days=parseInt(range);
      const cutoff=new Date();cutoff.setDate(cutoff.getDate()-days);
      query = query.where('date','>=',cutoff.toISOString().split('T')[0]);
    }
    const snap = await query.get();
    const merged = {};
    const allEvents = [];
    let daysActive = 0;
    snap.forEach(doc=>{
      const d = doc.data();
      const clicks = d.clicks||{};
      if(Object.keys(clicks).length>0) daysActive++;
      Object.entries(clicks).forEach(([k,v])=>{ merged[k]=(merged[k]||0)+v; });
      if(d.events && Array.isArray(d.events)) allEvents.push(...d.events);
    });

    const total = Object.values(merged).reduce((s,v)=>s+v,0);
    const used  = Object.keys(merged).filter(k=>merged[k]>0).length;
    const never = allKeys.filter(k=>!merged[k]);
    const critMissing = CRITICAL_REBUTTALS.filter(k=>!merged[k]);
    const engPct = Math.round((used/allKeys.length)*100);
    const engColor = engPct>=60?'var(--green)':engPct>=30?'var(--gold)':'var(--red)';

    // Summary row
    summaryEl.innerHTML=[
      {label:'Total Opens',val:total,color:'var(--accent)'},
      {label:'Coverage',val:engPct+'%',color:engColor},
      {label:'Days Active',val:daysActive,color:'var(--gold)'},
    ].map(s=>`<div style="background:#0a1020;border:1px solid var(--border);border-radius:8px;padding:10px;text-align:center;">
      <div style="font-family:'Bebas Neue',sans-serif;font-size:1.8rem;color:${s.color};line-height:1;">${s.val}</div>
      <div style="font-size:0.5rem;color:var(--muted);font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-top:2px;">${s.label}</div>
    </div>`).join('');

    // Coaching signals for this rep
    const repSignals=[];
    if(!merged['no_ssn']&&!merged['ssn_concerns']) repSignals.push({type:'danger',icon:'🚨',msg:'Never opens SSN rebuttal — likely losing leads at SSN ask'});
    if(!merged['confidence_mindset']) repSignals.push({type:'warning',icon:'💡',msg:'Never opened Confidence Technique — may be projecting uncertainty'});
    if((merged['not_interested']||0)>=10) repSignals.push({type:'warning',icon:'🔥',msg:`Opens "Not Interested" ${merged['not_interested']} times — prospects frequently objecting`});
    if((merged['wants_to_hangup']||0)>=8) repSignals.push({type:'warning',icon:'📞',msg:`Taking Over Technique opened ${merged['wants_to_hangup']} times — high hang-up risk`});
    if(!merged['pitch_benefit']&&!merged['pitch_urgency']&&!merged['pitch_softpull']) repSignals.push({type:'info',icon:'💬',msg:'No Pitch Boost rebuttals used — not enhancing the pitch'});
    if(total>=20&&used>=8) repSignals.push({type:'good',icon:'⭐',msg:`Strong engagement — ${total} opens across ${used} different rebuttals`});
    if(total===0) repSignals.push({type:'danger',icon:'🚫',msg:'Zero rebuttal opens — not using the tool at all'});

    // ── Fraud detection ──
    const fraudFlags = analyzeRebuttalFraud(allEvents);
    const colMap={danger:{bg:'var(--red-light)',border:'rgba(248,113,113,0.3)',text:'var(--red)'},warning:{bg:'var(--gold-light)',border:'rgba(251,191,36,0.3)',text:'var(--gold)'},info:{bg:'var(--purple-light)',border:'rgba(167,139,250,0.3)',text:'var(--purple)'},good:{bg:'var(--green-light)',border:'rgba(52,211,153,0.3)',text:'var(--green)'}};
    
    let signalsHtml = '';
    if(fraudFlags.length){
      signalsHtml += `<div style="background:rgba(239,68,68,0.06);border:2px solid rgba(239,68,68,0.4);border-radius:10px;padding:12px;margin-bottom:8px;">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;">
          <span style="font-size:1rem;">🕵️</span>
          <div style="font-size:0.58rem;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#ef4444;">SUSPICIOUS CLICKING DETECTED</div>
          <span style="margin-left:auto;font-family:'Bebas Neue',sans-serif;font-size:0.95rem;color:#ef4444;">${fraudFlags.length} FLAG${fraudFlags.length!==1?'S':''}</span>
        </div>
        ${fraudFlags.map(f=>{const c=fraudLevelColor(f.level);return`<div style="background:${c.bg};border:1px solid ${c.border};border-radius:7px;padding:8px 10px;margin-bottom:4px;"><div style="font-size:0.78rem;font-weight:700;color:${c.text};">${f.icon} ${f.title}</div><div style="font-size:0.68rem;color:var(--muted);margin-top:2px;">${f.detail}</div></div>`;}).join('')}
      </div>`;
    }
    if(repSignals.length){
      signalsHtml += '<div style="font-size:0.55rem;font-weight:800;letter-spacing:2px;color:var(--muted);text-transform:uppercase;margin-bottom:6px;">COACHING SIGNALS</div>'+
        repSignals.map(s=>{const c=colMap[s.type];return`<div style="background:${c.bg};border:1px solid ${c.border};border-radius:8px;padding:9px 12px;margin-bottom:5px;display:flex;gap:8px;align-items:flex-start;"><span style="font-size:1rem;flex-shrink:0;">${s.icon}</span><span style="font-size:0.75rem;color:${c.text};">${s.msg}</span></div>`;}).join('');
    }
    if(signalsHtml) signalsEl.innerHTML = signalsHtml;

    // Bars
    const sorted=allKeys.sort((a,b)=>(merged[b]||0)-(merged[a]||0));
    const maxVal=Math.max(...sorted.map(k=>merged[k]||0),1);
    barsEl.innerHTML=sorted.map(k=>{
      const v=merged[k]||0;
      const pct=Math.round((v/maxVal)*100);
      const isCrit=CRITICAL_REBUTTALS.includes(k);
      const barColor=v===0?'#1a2540':isCrit?'var(--purple)':'var(--accent)';
      const textColor=v===0?'var(--muted)':isCrit?'var(--purple)':'var(--accent)';
      return`<div style="display:flex;align-items:center;gap:8px;">
        <div style="font-size:0.68rem;color:${textColor};width:150px;flex-shrink:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${isCrit?'⭐ ':''} ${REBUTTAL_LABELS[k]||k}</div>
        <div style="flex:1;background:#0a1020;border-radius:4px;height:7px;overflow:hidden;">
          <div style="width:${pct}%;height:100%;background:${barColor};border-radius:4px;transition:width 0.5s;"></div>
        </div>
        <div style="font-size:0.7rem;font-weight:800;color:${textColor};width:22px;text-align:right;">${v||''}</div>
      </div>`;
    }).join('');

    // Never used
    if(never.length){
      neverEl.innerHTML=`<div style="font-size:0.55rem;font-weight:800;letter-spacing:2px;color:var(--muted);text-transform:uppercase;margin-bottom:6px;">💤 NEVER USED (${never.length})</div>
      <div style="display:flex;flex-wrap:wrap;gap:4px;">
        ${never.map(k=>`<span style="background:#0a1020;border:1px solid #1a2540;border-radius:6px;padding:3px 8px;font-size:0.65rem;color:var(--muted);">${REBUTTAL_LABELS[k]||k}</span>`).join('')}
      </div>`;
    } else {
      neverEl.innerHTML='<div style="color:var(--green);font-size:0.78rem;font-weight:700;">🏆 Used all rebuttals at least once!</div>';
    }

  }catch(e){
    summaryEl.innerHTML='<div style="color:var(--red);font-size:0.75rem;grid-column:1/-1;">Error: '+e.message+'</div>';
  }
}

// ── REBUTTAL INTEL JS ──
const REBUTTAL_LABELS = {
  not_interested:'Not Interested', no_info:'Why No Info?', bad_credit:'Bad Credit',
  rate_question:'Interest Rate?', how_info:"How'd You Get My Info?", no_loan:"Don't Need a Loan",
  website:'Give Me the Website', spouse:'Need to Ask Spouse', no_ssn:"Won't Give SSN",
  company_name:'What Company Is This?', who_are_we:'Who Are You / Where Located?',
  diff_numbers:'Different Numbers', lower_rate:'My Bank Has Lower Rate',
  voicemail_approved:'Voicemail Said Approved', dnc_file:'DNC / Enrolled / Bad Lead',
  llc_question:'Is Your Company LLC?', debt_consolidation:'Is This Debt Consolidation?',
  soft_pull:'Soft Credit Pull', private_lender:'What Bank / Private Lender?',
  confidence_mindset:'Confidence Technique', wants_to_hangup:'Taking Over Technique',
  follow_up_pivot:'Follow Up / Pivot', ssn_concerns:'Concerns About SSN',
  pitch_benefit:'Pitch — Benefit-Oriented', pitch_urgency:'Pitch — Urgency',
  pitch_softpull:'Pitch — Soft Pull / Privacy'
};

const CRITICAL_REBUTTALS = ['no_ssn','ssn_concerns','confidence_mindset','not_interested','wants_to_hangup'];
let riCurrentView = 'reps';
let riAllData = [];

