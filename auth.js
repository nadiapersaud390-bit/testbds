// FILE: js/auth.js
// Login/logout, admin detection, session management, roster loading, streaks, roster polling

const ADMIN_ID = '0000';
const ADMIN_PW = 'admin';
let currentUser = null;
let midnightTimer = null;

// ── INACTIVE AGENTS (hardcoded fallback) ──
const INACTIVE_AGENTS = [
  'Esha Singh','Keisha Graig','Angelica Alert'
];

// ── ROSTER ──
let ROSTER = {};
let rosterLoaded = false;

function normalizeTeam(val) {
  if (!val) return 'BB';
  const v = val.toUpperCase().replace(/[\s\-_]/g, '');
  if (v.startsWith('GUYP') || v.includes('GUYP') || v === 'PR' || v.includes('PROVIDENCE')) return 'PR';
  if (v.startsWith('GUYB') || v.includes('GUYB') || v === 'BB' || v.includes('BERBICE')) return 'BB';
  return val;
}

async function loadRoster() {
  try {
    const data = await callBridge({action: 'getRoster'});
    if (data.success && data.agents) {
      if (data.agents.length > 0) {
        console.log('🔍 RAW AGENT FROM APPS SCRIPT:', JSON.stringify(data.agents[0]));
        console.log('🔍 ALL FIELD NAMES:', Object.keys(data.agents[0]).join(', '));
        const firstA = data.agents[0];
        const ytelKey = Object.keys(firstA).find(k => k.toLowerCase().replace(/[\s_]/g,'') === 'ytelname');
        console.log('🔍 ytelName key in sheet:', ytelKey, '→', ytelKey ? firstA[ytelKey] : 'NOT FOUND');
      } else {
        console.warn('⚠️ Apps Script returned 0 agents — sheet may be offline or misconfigured');
      }
      ROSTER = {};
      data.agents.forEach(rawA => {
        const a = {
          userId:   rawA.userId   || rawA.userid   || rawA.UserId   || rawA.user_id   || '',
          name:     rawA.name     || rawA.Name      || rawA.agentName || rawA.agentname || '',
          ytelName: rawA.ytelName || rawA.ytelname  || rawA.YtelName  || rawA['Ytel Name'] || rawA['ytel name'] || rawA['ytel_name'] || '',
          team:     rawA.team     || rawA.Team      || '',
          shift:    rawA.shift    || rawA.Shift     || '',
          lunch:    rawA.lunch    || rawA.Lunch     || '',
          status:   rawA.status   || rawA.Status    || '',
          inactive: rawA.inactive || false,
        };
        if (a.userId) {
          const statusLow = (a.status||'').toLowerCase().trim();
          const isInactive = INACTIVE_AGENTS.some(n=>n.toLowerCase()===a.name.toLowerCase())
            || a.inactive === true
            || (statusLow === 'inactive');
          if(isInactive) return;
          let team = 'BB';
          if (a.ytelName) {
            const yn = a.ytelName.toUpperCase().replace(/[\s\-_]/g,'');
            if (yn.startsWith('GUYP') || yn.includes('GUYP')) team = 'PR';
            else if (yn.startsWith('GUYB') || yn.includes('GUYB')) team = 'BB';
            else if (a.team) team = normalizeTeam(a.team);
          } else if (a.team) {
            team = normalizeTeam(a.team);
          }
          const uid = String(a.userId).trim();
          const existingTeam = ROSTER[uid] ? ROSTER[uid].team : null;
          if (!a.ytelName && existingTeam) team = existingTeam;
          ROSTER[uid] = {
            userId: uid,
            name: a.name,
            ytelName: a.ytelName || (ROSTER[uid] ? ROSTER[uid].ytelName : ''),
            shift: a.shift || '',
            lunch: a.lunch || '',
            brk: '',
            team,
            status: a.status || 'Agent'
          };
        }
      });
      rosterLoaded = true;
      console.log('Roster loaded from sheet:', Object.keys(ROSTER).length, 'agents');
      Object.values(ROSTER).slice(0,3).forEach(a => {
        console.log('🟢 ROSTER ENTRY:', JSON.stringify(a));
      });
    }
  } catch(e) {
    console.error('Roster load failed:', e);
  }

  // ── Merge Firebase roster ──
  try {
    const fbSnap = await db.collection('roster').get();
    let mergeCount = 0;
    let fbDebugDone = false;
    fbSnap.forEach(doc => {
      const a = doc.data();
      if (!fbDebugDone) {
        console.log('🔥 FIREBASE ROSTER DOC (first):', JSON.stringify(a));
        console.log('🔥 FIREBASE FIELD NAMES:', Object.keys(a).join(', '));
        fbDebugDone = true;
      }
      const uid = String(a.userId || doc.id).trim();
      if (!uid) return;
      if (ROSTER[uid]) {
        if (ROSTER[uid].team !== 'PR' && a.ytelName) {
          const yn = a.ytelName.toUpperCase().replace(/[\s\-_]/g,'');
          const fbTeam = (yn.startsWith('GUYP') || yn.includes('GUYP')) ? 'PR' : null;
          if (fbTeam) {
            console.log(`🔥 Firebase upgrading team for ${a.name}: BB → PR (ytelName: ${a.ytelName})`);
            ROSTER[uid].team = 'PR';
            if (!ROSTER[uid].ytelName) ROSTER[uid].ytelName = a.ytelName;
          }
        }
        return;
      }
      const sameNameEntry = Object.values(ROSTER).find(r => r.name && a.name &&
        r.name.toLowerCase().trim() === (a.name||'').toLowerCase().trim());
      if (sameNameEntry) {
        if (sameNameEntry.team !== 'PR' && a.ytelName) {
          const yn = a.ytelName.toUpperCase().replace(/[\s\-_]/g,'');
          if (yn.startsWith('GUYP') || yn.includes('GUYP')) {
            console.log(`🔥 Firebase upgrading team for ${a.name} (name-match): BB → PR`);
            sameNameEntry.team = 'PR';
          }
        }
        return;
      }
      const fbStatusLow = (a.status||'').toLowerCase().trim();
      const isInactive = INACTIVE_AGENTS.some(n => n.toLowerCase() === (a.name||'').toLowerCase())
        || fbStatusLow === 'inactive'
        || a.inactive === true;
      if (isInactive) return;
      let team = 'BB';
      if (a.ytelName) {
        const yn = a.ytelName.toUpperCase().replace(/[\s\-_]/g,'');
        if (yn.startsWith('GUYP') || yn.includes('GUYP')) team = 'PR';
        else if (yn.startsWith('GUYB') || yn.includes('GUYB')) team = 'BB';
        else if (a.team) team = normalizeTeam(a.team);
      } else if (a.team) {
        team = normalizeTeam(a.team);
      }
      ROSTER[uid] = {
        userId: uid,
        name: a.name || '',
        ytelName: a.ytelName || '',
        shift: a.shift || '',
        lunch: a.lunch || '',
        brk: '',
        team,
        status: a.status || 'Agent'
      };
      mergeCount++;
    });
    if (mergeCount > 0) {
      console.log('Roster merged', mergeCount, 'agent(s) from Firebase not yet in Sheet');
      rosterLoaded = true;
    }
  } catch(e) {
    console.warn('Firebase roster merge failed (non-fatal):', e);
  }
}

// ── ID INPUT — show password for admin ──
function onIdInput(val){
  document.getElementById('pw-wrap').style.display = val === ADMIN_ID ? 'block' : 'none';
  document.getElementById('login-err').textContent = '';
}

// ── LOGIN ──
async function doLogin(){
  const id = document.getElementById('login-id').value.trim();
  const pw = document.getElementById('login-pw') ? document.getElementById('login-pw').value.trim() : '';
  const errEl = document.getElementById('login-err');
  errEl.textContent = '';

  if(!id){ errEl.textContent = '⚠ Please enter your Ytel ID.'; return; }

  const btn = document.querySelector('.login-btn');
  btn.innerHTML = '<span class="spinner"></span>CONNECTING...';
  btn.disabled = true;

  // ── ADMIN LOGIN ──
  if(id === ADMIN_ID){
    if(pw !== ADMIN_PW){
      errEl.textContent = '⚠ Incorrect password.';
      btn.innerHTML = 'ENTER DASHBOARD';
      btn.disabled = false;
      return;
    }
    try{
      await auth.signInAnonymously();
      currentUser = {id:'0000', name:'Admin', isAdmin:true, team:'ADMIN'};
      sessionStorage.setItem('bds_user_'+getTodayGY(), JSON.stringify(currentUser));
      btn.innerHTML = 'ENTER DASHBOARD';
      btn.disabled = false;
      showDashboard();
    }catch(e){
      errEl.textContent = '⚠ Firebase error: ' + e.message;
      btn.innerHTML = 'ENTER DASHBOARD';
      btn.disabled = false;
    }
    return;
  }

  // ── AGENT LOGIN ──
  try{
    errEl.textContent = '';
    if(!rosterLoaded){
      btn.innerHTML = '<span class="spinner"></span>LOADING ROSTER...';
      await loadRoster();
    }

    const agentData = ROSTER[id];
    if(!agentData){
      const count = Object.keys(ROSTER).length;
      errEl.textContent = count > 0
        ? '⚠ Ytel ID ' + id + ' not found. (' + count + ' agents loaded)'
        : '⚠ Could not load roster. Check your connection and try again.';
      btn.innerHTML = 'ENTER DASHBOARD';
      btn.disabled = false;
      return;
    }

    btn.innerHTML = '<span class="spinner"></span>SIGNING IN...';
    await auth.signInAnonymously();
    currentUser = {id, ...agentData, isAdmin:false};

    btn.innerHTML = '<span class="spinner"></span>MARKING ATTENDANCE...';
    try{ await markAttendanceSheet(agentData); }catch(e){ console.warn('Attendance mark failed:', e); }

    const today = getTodayGY();
    try{
      await db.collection('sessions').doc(id+'_'+today).set({
        id, name:agentData.name, team:agentData.team,
        loginTime: firebase.firestore.FieldValue.serverTimestamp(),
        date: today
      },{merge:true});
    }catch(e){ console.warn('Session save failed:', e); }

    sessionStorage.setItem('bds_user_'+today, JSON.stringify(currentUser));

    btn.innerHTML = 'ENTER DASHBOARD';
    btn.disabled = false;
    showDashboard();

  }catch(e){
    console.error('Login error:', e);
    errEl.textContent = '⚠ ' + (e.message || 'Login failed. Please try again.');
    btn.innerHTML = 'ENTER DASHBOARD';
    btn.disabled = false;
  }
}

// ── MARK ATTENDANCE IN GOOGLE SHEET ──
async function markAttendanceSheet(agent) {
  try {
    const today  = getTodayGY();
    const docRef = db.collection('attendance').doc(agent.userId+'_'+today);
    const fbSnap = await docRef.get();
    if(fbSnap.exists){ return; }
    const status = getAttendanceStatus(agent.shift) || 'P';
    await docRef.set({
      id:        agent.userId,
      name:      agent.name,
      team:      agent.team,
      date:      today,
      status,
      shift:     agent.shift || '',
      loginTime: firebase.firestore.FieldValue.serverTimestamp()
    },{merge:true});
    try{
      const checkData = await callBridge({action:'checkAttendance', name:agent.name, team:agent.team});
      if(!checkData.marked){
        await callBridge({action:'markAttendance', name:agent.name, team:agent.team, status});
      }
    }catch(e){ console.warn('Sheet attendance mark failed (non-fatal):', e); }
  } catch(e) {
    console.error('Attendance mark failed:', e);
  }
}

// ── CALCULATE PRESENT OR LATE ──
function getAttendanceStatus(shift) {
  try {
    const nowGY  = new Date(new Date().toLocaleString('en-US',{timeZone:'America/Guyana'}));
    const isSun  = nowGY.getDay() === 0;
    const shiftStr = isSun ? '11:45am' : (shift || '');
    if(!shiftStr) return 'P';
    const match = shiftStr.match(/(\d+):(\d+)\s*(am|pm)/i);
    if(!match) return 'P';
    let h = parseInt(match[1]), m = parseInt(match[2]);
    const ampm = match[3].toLowerCase();
    if(ampm==='pm' && h!==12) h+=12;
    if(ampm==='am' && h===12) h=0;
    const shiftStart = new Date(nowGY.getFullYear(),nowGY.getMonth(),nowGY.getDate(),h,m,0);
    const diffMins   = (nowGY - shiftStart) / 60000;
    if(diffMins > 15) return 'L';
    return 'P';
  } catch(e){ return 'P'; }
}

// ── SHOW DASHBOARD ──
function showDashboard(){
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('rep-bar').classList.add('show');

  const u = currentUser;
  const firstName = u.name.split(' ')[0];

  document.getElementById('rep-greeting').innerHTML = u.isAdmin
    ? '⚡ <span>Admin Panel</span> — Full Access'
    : getGreeting(firstName).replace(firstName, `<span>${firstName}</span>`);

  const details = document.getElementById('rep-details');
  details.innerHTML = '';

  if(!u.isAdmin){
    details.innerHTML += `<div class="rep-chip ext">ID: <b>${u.id}</b></div>`;
    if(u.shift) details.innerHTML += `<div class="rep-chip shift">⏰ <b>${u.shift}</b></div>`;
    if(u.lunch) details.innerHTML += `<div class="rep-chip lunch">🍽 Lunch: <b>${u.lunch}</b></div>`;
    if(u.brk)   details.innerHTML += `<div class="rep-chip brk">☕ Break: <b>${u.brk}</b></div>`;
    const teamName = u.team==='BB' ? 'Berbice' : u.team==='PR' ? 'Providence' : u.team;
    details.innerHTML += `<div class="rep-chip" style="border-color:rgba(167,139,250,0.3);color:var(--purple);">Team: <b>${teamName}</b></div>`;
    details.innerHTML += `<div id="streak-chip-wrap" style="display:flex;gap:6px;align-items:center;"></div>`;
    updateStreak(u.id, u.name);
  } else {
    document.getElementById('admin-badge-wrap').innerHTML = '<div class="admin-badge">⚡ ADMIN</div>';
    showAdminUI();
  }

  scheduleMidnightLogout();
  init();
  loadCompanyName();
}

// ── COMPANY NAME ──
async function loadCompanyName(){
  try{
    const snap = await db.collection('settings').doc('companyName').get();
    if(snap.exists && snap.data().name){
      applyCompanyName(snap.data().name);
    }
  }catch(e){}
  if(currentUser && currentUser.isAdmin){
    const el = document.getElementById('script-company-name-display');
    if(el){
      el.classList.add('company-name-admin-editable');
      el.title = 'Double-click to rename';
      el.ondblclick = openCompanyNameModal;
    }
  }
}

function applyCompanyName(name){
  const el = document.getElementById('script-company-name-display');
  if(el) el.textContent = 'Company Name: ' + name;
}

function openCompanyNameModal(){
  if(!currentUser || !currentUser.isAdmin) return;
  const el = document.getElementById('script-company-name-display');
  const full = el ? el.textContent : '';
  const current = full.replace(/^Company Name:\s*/i, '');
  document.getElementById('company-name-input').value = current.toUpperCase();
  document.getElementById('company-name-modal').classList.add('open');
  setTimeout(()=>document.getElementById('company-name-input').select(), 50);
}

function closeCompanyNameModal(){
  document.getElementById('company-name-modal').classList.remove('open');
}

async function saveCompanyName(){
  const val = document.getElementById('company-name-input').value.trim().toUpperCase();
  if(!val){ return; }
  const btn = document.getElementById('company-name-save');
  btn.textContent = '⏳ SAVING...';
  btn.disabled = true;
  try{
    await db.collection('settings').doc('companyName').set({name: val, updatedBy:'admin', updatedAt: firebase.firestore.FieldValue.serverTimestamp()});
    applyCompanyName(val);
    closeCompanyNameModal();
  }catch(e){
    alert('Failed to save: ' + e.message);
  }
  btn.textContent = '💾 SAVE NAME';
  btn.disabled = false;
}

// ── STREAK COUNTER ──
async function updateStreak(userId, name){
  if(!userId) return;
  const today  = getTodayGY();
  const idStr  = String(userId);
  const ref    = db.collection('streaks').doc(idStr);

  try{
    const attSnap   = await db.collection('attendance').doc(idStr+'_'+today).get();
    const attStatus = attSnap.exists ? normalizeStatus(attSnap.data().status) : 'P';
    const isOnTime  = attStatus === 'P';
    const isLate    = attStatus === 'L';

    const snap = await ref.get();
    let data   = snap.exists ? snap.data() : {};

    let daily       = data.daily       || 0;
    let dailyBest   = data.dailyBest   || 0;
    let dailyLast   = data.dailyLast   || '';
    let weekly      = data.weekly      || 0;
    let weeklyBest  = data.weeklyBest  || 0;
    let weeklyLast  = data.weeklyLast  || '';
    let monthly     = data.monthly     || 0;
    let monthlyBest = data.monthlyBest || 0;
    let monthlyLast = data.monthlyLast || '';

    if(dailyLast === today){
      renderStreakChips({daily, dailyBest, weekly, weeklyBest, monthly, monthlyBest, attStatus});
      return;
    }

    const yesterday   = getYesterdayGY();
    const nowGY       = new Date(new Date().toLocaleString('en-US',{timeZone:'America/Guyana'}));
    const weekStart   = getWeekStartGY(nowGY);
    const monthStart  = today.substring(0,7)+'-01';

    // Daily streak
    if(isLate){ daily = 0; }
    else if(isOnTime){ daily = (dailyLast === yesterday) ? daily + 1 : 1; }
    if(daily > dailyBest) dailyBest = daily;
    dailyLast = today;

    // Weekly streak
    const weeklyLastInThisWeek = weeklyLast >= weekStart;
    if(!weeklyLastInThisWeek){ weekly = 0; }
    if(isLate){ weekly = 0; }
    else if(isOnTime){
      if(weeklyLast !== today){ weekly = weeklyLastInThisWeek ? weekly + 1 : 1; }
    }
    if(weekly > weeklyBest) weeklyBest = weekly;
    weeklyLast = today;

    // Monthly streak
    const monthlyLastInThisMonth = monthlyLast >= monthStart;
    if(!monthlyLastInThisMonth){ monthly = 0; }
    if(isLate){ monthly = 0; }
    else if(isOnTime){
      if(monthlyLast !== today){ monthly = monthlyLastInThisMonth ? monthly + 1 : 1; }
    }
    if(monthly > monthlyBest) monthlyBest = monthly;
    monthlyLast = today;

    await ref.set({
      daily, dailyBest, dailyLast,
      weekly, weeklyBest, weeklyLast,
      monthly, monthlyBest, monthlyLast,
      name, updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, {merge:true});

    renderStreakChips({daily, dailyBest, weekly, weeklyBest, monthly, monthlyBest, attStatus});

  }catch(e){
    console.warn('Streak update failed:', e);
    renderStreakChips({daily:0, dailyBest:0, weekly:0, weeklyBest:0, monthly:0, monthlyBest:0, attStatus:'P'});
  }
}

function renderStreakChips({daily, dailyBest, weekly, weeklyBest, monthly, monthlyBest, attStatus}){
  const wrap = document.getElementById('streak-chip-wrap');
  if(!wrap) return;

  function chipHtml(count, best, type, icon){
    const isZero = count === 0;
    const cls    = isZero ? 'zero' : count >= 5 ? 'on-fire' : 'building';
    const emoji  = isZero ? '💤' : count >= 5 ? '🔥' : icon;
    const bestTxt = best > 0 ? ` <span style="opacity:0.45;font-size:0.5rem;">best:${best}</span>` : '';
    return isZero
      ? `<div class="streak-chip zero" title="Log in on time to build your ${type} streak">${emoji} <span>${type.toUpperCase()} 0${bestTxt}</span></div>`
      : `<div class="streak-chip ${cls}" title="${type} streak · best: ${best}">${emoji} <span class="streak-num">${count}</span> <span>${type.toUpperCase()}${bestTxt}</span></div>`;
  }

  wrap.innerHTML =
    chipHtml(weekly,  weeklyBest,  'weekly',  '📅') +
    chipHtml(monthly, monthlyBest, 'monthly', '🏆');
}

async function loadAgentStreakForProfile(idStr, name){
  try{
    const snap = await db.collection('streaks').doc(idStr).get();
    const el   = document.getElementById('rp-streak-display');
    if(!el) return;
    if(snap.exists){
      const d = snap.data();
      const daily   = d.daily   ||0, dailyBest   = d.dailyBest   ||0;
      const weekly  = d.weekly  ||0, weeklyBest  = d.weeklyBest  ||0;
      const monthly = d.monthly ||0, monthlyBest = d.monthlyBest ||0;
      el.innerHTML =
        `<span style="color:#fb923c;">🔥 ${daily}d</span> <span style="opacity:0.4;font-size:0.6rem;">best ${dailyBest}</span>&nbsp;&nbsp;` +
        `<span style="color:#fbbf24;">📅 ${weekly}w</span> <span style="opacity:0.4;font-size:0.6rem;">best ${weeklyBest}</span>&nbsp;&nbsp;` +
        `<span style="color:#34d399;">🏆 ${monthly}m</span> <span style="opacity:0.4;font-size:0.6rem;">best ${monthlyBest}</span>`;
      el.style.color = '#e2e8f0';
    } else {
      el.textContent = '💤 No streak data yet';
      el.style.color = '#64748b';
    }
  }catch(e){ console.warn('Streak load failed',e); }
}

// ── MIDNIGHT AUTO-LOGOUT ──
function scheduleMidnightLogout(){
  const nowGY = new Date(new Date().toLocaleString('en-US',{timeZone:'America/Guyana'}));
  const midnight = new Date(nowGY.getFullYear(),nowGY.getMonth(),nowGY.getDate()+1,0,0,0);
  const ms = midnight - nowGY;
  clearTimeout(midnightTimer);
  midnightTimer = setTimeout(()=>{ doLogout(true); }, ms);
}

// ── LOGOUT ──
function doLogout(auto=false){
  clearTimeout(midnightTimer);
  stopRosterPolling();
  sessionStorage.removeItem('bds_user_'+getTodayGY());
  currentUser = null;
  auth.signOut();
  document.body.classList.remove('is-admin');
  const adminPage = document.getElementById('page-admin');
  if(adminPage) adminPage.classList.remove('admin-page-active');
  document.getElementById('login-screen').classList.remove('hidden');
  document.getElementById('rep-bar').classList.remove('show');
  document.getElementById('admin-badge-wrap').innerHTML='';
  document.getElementById('rep-details').innerHTML='';
  document.getElementById('login-id').value='';
  if(document.getElementById('login-pw')) document.getElementById('login-pw').value='';
  document.getElementById('pw-wrap').style.display='none';
  document.getElementById('login-err').textContent = auto ? '🔒 Session expired — please log in again.' : '';
  loadRoster();
}

// ── CHECK EXISTING SESSION ──
async function checkSession(){
  loadRoster();
  const today = getTodayGY();
  const saved = sessionStorage.getItem('bds_user_'+today);
  if(saved){
    try{
      currentUser = JSON.parse(saved);
      if(!currentUser.isAdmin && currentUser.id){
        try{
          const snap = await db.collection('roster').doc(currentUser.id).get();
          if(snap.exists){
            const d=snap.data();
            if(d.shift) currentUser.shift=d.shift;
            if(d.lunch) currentUser.lunch=d.lunch;
            if(d.brk)   currentUser.brk=d.brk;
          }
        }catch(e){}
      }
      showDashboard();
      return;
    }catch(e){}
  }
  document.getElementById('login-screen').classList.remove('hidden');
}

// ── ROSTER AUTO-SYNC ──
let rosterPollHash    = '';
let rosterPollTimer   = null;
const ROSTER_POLL_MS  = 2 * 60 * 1000;

function getRosterFingerprint() {
  return hashString(JSON.stringify(
    Object.values(ROSTER)
      .sort((a,b) => String(a.userId).localeCompare(String(b.userId)))
      .map(a => ({ id:a.userId, name:a.name, team:a.team, shift:a.shift, lunch:a.lunch, status:a.status }))
  ));
}

async function pollRoster() {
  try {
    const data = await callBridge({ action: 'getRoster' });
    if (!data || !data.success || !data.agents) return;
    const fresh = {};
    data.agents.forEach(rawA => {
      const a = {
        userId:   rawA.userId   || rawA.userid   || rawA.UserId   || rawA.user_id   || '',
        name:     rawA.name     || rawA.Name      || rawA.agentName || rawA.agentname || '',
        ytelName: rawA.ytelName || rawA.ytelname  || rawA.YtelName  || rawA['Ytel Name'] || rawA['ytel name'] || rawA['ytel_name'] || '',
        team:     rawA.team     || rawA.Team      || '',
        shift:    rawA.shift    || rawA.Shift     || '',
        lunch:    rawA.lunch    || rawA.Lunch     || '',
        status:   rawA.status   || rawA.Status    || '',
        inactive: rawA.inactive || false,
      };
      if (!a.userId) return;
      const statusLow = (a.status || '').toLowerCase().trim();
      if (statusLow === 'inactive') return;
      if (INACTIVE_AGENTS.some(n => n.toLowerCase() === a.name.toLowerCase())) return;
      let team = 'BB';
      if (a.ytelName) {
        const yn = a.ytelName.toUpperCase().replace(/[\s\-_]/g, '');
        if (yn.startsWith('GUYP') || yn.includes('GUYP')) team = 'PR';
        else if (yn.startsWith('GUYB') || yn.includes('GUYB')) team = 'BB';
        else if (a.team) team = normalizeTeam(a.team);
      } else if (a.team) {
        team = normalizeTeam(a.team);
      }
      fresh[String(a.userId).trim()] = {
        userId: String(a.userId).trim(), name: a.name, ytelName: a.ytelName,
        shift: a.shift||'', lunch: a.lunch||'', brk: '', team, status: a.status||'Agent'
      };
    });
    const newHash = hashString(JSON.stringify(
      Object.values(fresh)
        .sort((a,b) => String(a.userId).localeCompare(String(b.userId)))
        .map(a => ({ id:a.userId, name:a.name, team:a.team, shift:a.shift, lunch:a.lunch, status:a.status }))
    ));
    if (newHash === rosterPollHash) return;
    const oldCount   = Object.keys(ROSTER).length;
    const newCount   = Object.keys(fresh).length;
    const diff       = newCount - oldCount;
    let fieldChanges = 0;
    Object.values(fresh).forEach(a => {
      const old = ROSTER[a.userId];
      if (old && (old.shift !== a.shift || old.lunch !== a.lunch || old.team !== a.team || old.name !== a.name || old.status !== a.status)) fieldChanges++;
    });
    const freshNames = new Set(Object.values(fresh).map(a => (a.name||'').toLowerCase().trim()));
    Object.keys(ROSTER).forEach(uid => {
      if (!fresh[uid]) {
        const entryName = (ROSTER[uid].name||'').toLowerCase().trim();
        if (freshNames.has(entryName)) return;
        fresh[uid] = ROSTER[uid];
      }
    });
    ROSTER = fresh;
    rosterLoaded = true;
    rosterPollHash = newHash;
    let toastMsg = '🔄 Roster synced';
    if (diff > 0)          toastMsg = `✅ Roster updated — ${diff} agent${diff>1?'s':''} added`;
    else if (diff < 0)     toastMsg = `🗑 Roster updated — ${Math.abs(diff)} agent${Math.abs(diff)>1?'s':''} removed`;
    else if (fieldChanges) toastMsg = `✏️ Roster updated — ${fieldChanges} agent${fieldChanges>1?'s':''} changed`;
    showRosterToast(toastMsg);
    if (typeof renderAttTable    === 'function') renderAttTable();
    if (typeof renderProfileList === 'function') renderProfileList();
    if (typeof renderStatsTable  === 'function' && statsData.length) renderStatsTable();
    if (typeof reRenderMonthly   === 'function') reRenderMonthly();
    const ovEl2 = document.getElementById('admin-overview');
    if (ovEl2 && ovEl2.style.display !== 'none' && typeof loadAdminOverview === 'function') loadAdminOverview();
    const wkEl = document.getElementById('admin-weekly');
    if (wkEl && wkEl.style.display !== 'none' && typeof loadWeeklyAttendance === 'function') {
      loadWeeklyAttendance(weeklyTeam || 'BB');
    }
    console.log('🔄 Roster auto-synced:', newCount, 'agents | diff:', diff, '| field changes:', fieldChanges);
  } catch(e) {
    console.warn('Roster poll failed (non-fatal):', e);
  }
}

function startRosterPolling() {
  rosterPollHash = getRosterFingerprint();
  if (rosterPollTimer) clearInterval(rosterPollTimer);
  rosterPollTimer = setInterval(pollRoster, ROSTER_POLL_MS);
  console.log('🕐 Roster polling started — every', ROSTER_POLL_MS / 60000, 'minutes');
}

function stopRosterPolling() {
  if (rosterPollTimer) { clearInterval(rosterPollTimer); rosterPollTimer = null; }
}

// ── BOOT: check session on page load ──
window.addEventListener('load',()=>{ checkSession(); });

// Expose globals
window.ROSTER              = ROSTER;
window.currentUser         = currentUser;
window.INACTIVE_AGENTS     = INACTIVE_AGENTS;
window.normalizeTeam       = normalizeTeam;
window.loadRoster          = loadRoster;
window.onIdInput           = onIdInput;
window.doLogin             = doLogin;
window.doLogout            = doLogout;
window.showDashboard       = showDashboard;
window.loadCompanyName     = loadCompanyName;
window.applyCompanyName    = applyCompanyName;
window.openCompanyNameModal  = openCompanyNameModal;
window.closeCompanyNameModal = closeCompanyNameModal;
window.saveCompanyName     = saveCompanyName;
window.updateStreak        = updateStreak;
window.renderStreakChips   = renderStreakChips;
window.loadAgentStreakForProfile = loadAgentStreakForProfile;
window.scheduleMidnightLogout   = scheduleMidnightLogout;
window.checkSession        = checkSession;
window.startRosterPolling  = startRosterPolling;
window.stopRosterPolling   = stopRosterPolling;
window.getAttendanceStatus = getAttendanceStatus;
window.markAttendanceSheet = markAttendanceSheet;
