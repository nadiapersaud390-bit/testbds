/* ── App Core: Bridge, Roster, Auth, Login, Clocks, Dashboard ──
   Main application logic that runs on startup.
*/

// ── APPS SCRIPT BRIDGE URL ──
const BRIDGE_URL = 'https://script.google.com/macros/s/AKfycbynAn0uYQcOO_6_4feNU2RY-886eKTV_BBoCYYASwVB2jpYk60w1S8PY2IqbUphDJDl4A/exec';

// ── JSONP helper — bypasses CORS for Google Apps Script ──
function callBridge(params) {
  return new Promise((resolve, reject) => {
    const cbName = 'cb_' + Date.now() + '_' + Math.floor(Math.random()*10000);
    const timeout = setTimeout(() => {
      delete window[cbName];
      if(tag && tag.parentNode) tag.parentNode.removeChild(tag);
      reject(new Error('Timed out'));
    }, 15000);
    window[cbName] = (data) => {
      clearTimeout(timeout);
      delete window[cbName];
      if(tag && tag.parentNode) tag.parentNode.removeChild(tag);
      resolve(data);
    };
    const qs = Object.entries({...params, callback: cbName})
      .map(([k,v]) => encodeURIComponent(k)+'='+encodeURIComponent(v))
      .join('&');
    const tag = document.createElement('script');
    tag.src = BRIDGE_URL + '?' + qs;
    tag.onerror = () => { clearTimeout(timeout); delete window[cbName]; reject(new Error('Load error')); };
    document.head.appendChild(tag);
  });
}

// ── INACTIVE AGENTS ──
// Agents are automatically blocked if their Status column in the Google Sheet
// is NOT "Agent" or "Trainee" — the Apps Script sends inactive:true for those.
// To remove an agent from the dashboard: change their Status to "Inactive" in the sheet.
// This hardcoded list is a fallback for agents with no status set.
const INACTIVE_AGENTS = [
  'Esha Singh','Keisha Graig','Angelica Alert'
];

// ── ROSTER (loaded live from Google Sheet) ──
let ROSTER = {};
let rosterLoaded = false;

// Normalize any team/branch string to canonical 'PR' (Providence) or 'BB' (Berbice)
// Handles values like: GUYP, GUYB, PR, BB, Providence, Berbice, and combos
function normalizeTeam(val) {
  if (!val) return 'BB';
  const v = val.toUpperCase().replace(/[\s\-_]/g, '');
  if (v.startsWith('GUYP') || v.includes('GUYP') || v === 'PR' || v.includes('PROVIDENCE')) return 'PR';
  if (v.startsWith('GUYB') || v.includes('GUYB') || v === 'BB' || v.includes('BERBICE')) return 'BB';
  return val; // unknown value — pass through unchanged
}

async function loadRoster() {
  try {
    const data = await callBridge({action: 'getRoster'});
    if (data.success && data.agents) {
      // DEBUG: Log first agent to see exact field names from Apps Script
      if (data.agents.length > 0) {
        console.log('🔍 RAW AGENT FROM APPS SCRIPT:', JSON.stringify(data.agents[0]));
        console.log('🔍 ALL FIELD NAMES:', Object.keys(data.agents[0]).join(', '));
        // Log the ytelName specifically so we can see what key it's stored under
        const firstA = data.agents[0];
        const ytelKey = Object.keys(firstA).find(k => k.toLowerCase().replace(/[\s_]/g,'') === 'ytelname');
        console.log('🔍 ytelName key in sheet:', ytelKey, '→', ytelKey ? firstA[ytelKey] : 'NOT FOUND');
      } else {
        console.warn('⚠️ Apps Script returned 0 agents — sheet may be offline or misconfigured');
      }
      ROSTER = {};
      data.agents.forEach(rawA => {
        // Normalize field names — Apps Script may return different casing
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
          // Skip inactive agents — either hardcoded or flagged by Apps Script
          // NOTE: blank status is treated as active (Agent) — only skip when
          // Apps Script explicitly sets inactive:true OR status is 'inactive'
          const statusLow = (a.status||'').toLowerCase().trim();
          const isInactive = INACTIVE_AGENTS.some(n=>n.toLowerCase()===a.name.toLowerCase())
            || a.inactive === true
            || (statusLow === 'inactive');
          if(isInactive) return;
          // Determine team from ytelName prefix — GUYP = Providence (PR), GUYB = Berbice (BB)
          // ytelName is the authoritative source; sheet team field is a fallback only
          // normalizeTeam() converts GUYP/Providence/PR → 'PR', GUYB/Berbice/BB → 'BB'
          let team = 'BB'; // safe default
          if (a.ytelName) {
            const yn = a.ytelName.toUpperCase().replace(/[\s\-_]/g,'');
            if (yn.startsWith('GUYP') || yn.includes('GUYP')) team = 'PR';
            else if (yn.startsWith('GUYB') || yn.includes('GUYB')) team = 'BB';
            else if (a.team) team = normalizeTeam(a.team); // ytelName has no prefix clue — normalize sheet field
          } else if (a.team) {
            team = normalizeTeam(a.team); // no ytelName at all — normalize sheet field
          }
          const uid = String(a.userId).trim();
          // If we already have this agent in ROSTER (e.g. just added via Firebase),
          // and the Sheet came back without a ytelName prefix, trust the existing team
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
      // DEBUG: Show first 3 roster entries
      Object.values(ROSTER).slice(0,3).forEach(a => {
        console.log('🟢 ROSTER ENTRY:', JSON.stringify(a));
      });
    }
  } catch(e) {
    console.error('Roster load failed:', e);
  }

  // ── Merge Firebase roster — catches new reps added via Admin Panel
  // before the Google Sheet has been updated ──
  try {
    const fbSnap = await db.collection('roster').get();
    let mergeCount = 0;
    // DEBUG: Log first Firebase doc to see what fields exist
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

      // If Sheet already loaded this agent, check if Firebase has a better team determination
      // (Sheet may have saved without ytelName, causing wrong BB default)
      if (ROSTER[uid]) {
        // Firebase may only UPGRADE a BB assignment to PR — it must NEVER downgrade PR→BB.
        // The Google Sheet's ytelName (GUYP prefix) is the authoritative team source.
        if (ROSTER[uid].team !== 'PR' && a.ytelName) {
          const yn = a.ytelName.toUpperCase().replace(/[\s\-_]/g,'');
          const fbTeam = (yn.startsWith('GUYP') || yn.includes('GUYP')) ? 'PR' : null;
          if (fbTeam) {
            console.log(`🔥 Firebase upgrading team for ${a.name}: BB → PR (ytelName: ${a.ytelName})`);
            ROSTER[uid].team = 'PR';
            if (!ROSTER[uid].ytelName) ROSTER[uid].ytelName = a.ytelName;
          }
        }
        return; // already in roster — Sheet data wins for everything else
      }
      // ── Dedup by name: if Sheet already has an agent with this name, don't add a
      // second Firebase entry with a different userId (would cause them to appear in both branches).
      const sameNameEntry = Object.values(ROSTER).find(r => r.name && a.name &&
        r.name.toLowerCase().trim() === (a.name||'').toLowerCase().trim());
      if (sameNameEntry) {
        // Merge: keep Sheet userId but apply Firebase upgrade only (BB→PR)
        if (sameNameEntry.team !== 'PR' && a.ytelName) {
          const yn = a.ytelName.toUpperCase().replace(/[\s\-_]/g,'');
          if (yn.startsWith('GUYP') || yn.includes('GUYP')) {
            console.log(`🔥 Firebase upgrading team for ${a.name} (name-match): BB → PR`);
            sameNameEntry.team = 'PR';
          }
        }
        return; // don't create a second ROSTER entry for the same person
      }
      // Skip if explicitly inactive — blank status treated as active (Agent)
      const fbStatusLow = (a.status||'').toLowerCase().trim();
      const isInactive = INACTIVE_AGENTS.some(n => n.toLowerCase() === (a.name||'').toLowerCase())
        || fbStatusLow === 'inactive'
        || a.inactive === true;
      if (isInactive) return;
      // Determine team from ytelName prefix — GUYP = Providence (PR), GUYB = Berbice (BB)
      // ytelName is authoritative; a.team is fallback only (always normalized via normalizeTeam)
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

const ADMIN_ID = '0000';
const ADMIN_PW = 'admin';
let currentUser = null;
let midnightTimer = null;

// ── GREETINGS ──
function getGreeting(name){
  const h = new Date().toLocaleString('en-US',{timeZone:'America/Guyana',hour:'numeric',hour12:false});
  const hr = parseInt(h);
  if(hr < 12) return `Good morning, ${name}! Let's make today count. 🔥`;
  if(hr < 17) return `Good afternoon, ${name}! Stay focused, close strong. 💪`;
  return `Good evening, ${name}! Finish the shift strong. ⚡`;
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
    // Step 1 — Load roster
    errEl.textContent = '';
    if(!rosterLoaded){
      btn.innerHTML = '<span class="spinner"></span>LOADING ROSTER...';
      await loadRoster();
    }

    // Step 2 — Find agent
    const agentData = ROSTER[id];
    if(!agentData){
      // Show helpful message with ID count loaded
      const count = Object.keys(ROSTER).length;
      errEl.textContent = count > 0
        ? '⚠ Ytel ID ' + id + ' not found. (' + count + ' agents loaded)'
        : '⚠ Could not load roster. Check your connection and try again.';
      btn.innerHTML = 'ENTER DASHBOARD';
      btn.disabled = false;
      return;
    }

    // Step 3 — Firebase sign in
    btn.innerHTML = '<span class="spinner"></span>SIGNING IN...';
    await auth.signInAnonymously();
    currentUser = {id, ...agentData, isAdmin:false};

    // Step 4 — Mark attendance (non-blocking — don't fail login if this errors)
    btn.innerHTML = '<span class="spinner"></span>MARKING ATTENDANCE...';
    try{ await markAttendanceSheet(agentData); }catch(e){ console.warn('Attendance mark failed:', e); }

    // Step 5 — Save session
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

    // Check Firebase first — if already logged there, no need to do anything
    const fbSnap = await docRef.get();
    if(fbSnap.exists){
      // Already in Firebase — rep is already showing online, nothing to do
      return;
    }

    // Calculate status (Present / Late) based on shift time
    const status = getAttendanceStatus(agent.shift) || 'P';

    // Always write to Firebase immediately so the admin sees them online NOW
    await docRef.set({
      id:        agent.userId,
      name:      agent.name,
      team:      agent.team,
      date:      today,
      status,
      shift:     agent.shift || '',
      loginTime: firebase.firestore.FieldValue.serverTimestamp()
    },{merge:true});

    // Then try to mark the Google Sheet (non-blocking — sheet may already have them)
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

    // On Sunday everyone has the same 11:45am shift regardless of their roster shift
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

function getTodayGY(){
  return new Date().toLocaleDateString('en-CA',{timeZone:'America/Guyana'});
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
    // Streak chip placeholder — filled after async load
    details.innerHTML += `<div id="streak-chip-wrap" style="display:flex;gap:6px;align-items:center;"></div>`;
    // Load & update streak asynchronously
    updateStreak(u.id, u.name);
  } else {
    document.getElementById('admin-badge-wrap').innerHTML = '<div class="admin-badge">⚡ ADMIN</div>';
    showAdminUI();
  }

  scheduleMidnightLogout();
  init();
  loadCompanyName(); // always load latest name on dashboard show
}

// ══════════════════════════════════════════════
//  COMPANY NAME — admin editable, stored in Firestore
//  Displayed in the Script tab (Step 1 - Introduction)
// ══════════════════════════════════════════════
async function loadCompanyName(){
  try{
    const snap = await db.collection('settings').doc('companyName').get();
    if(snap.exists && snap.data().name){
      applyCompanyName(snap.data().name);
    }
  }catch(e){ /* silently fall back to default */ }
  // Enable double-click edit only for admin
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
  // Update the script tab display
  const el = document.getElementById('script-company-name-display');
  if(el) el.textContent = 'Company Name: ' + name;
}

function openCompanyNameModal(){
  if(!currentUser || !currentUser.isAdmin) return;
  // Extract just the name part (strip "Company Name: " prefix)
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

// ══════════════════════════════════════════════
//  STREAK COUNTER
//  Stored in Firebase: streaks/{userId}
//  { streak, lastDate, bestStreak }
//  Rules:
//    - Login on time (P) = streak + 1
//    - Login late (L)    = streak resets to 0
//    - Miss a day        = streak resets to 0
//    - Already logged today = no change
// ══════════════════════════════════════════════
async function updateStreak(userId, name){
  if(!userId) return;
  const today  = getTodayGY();
  const idStr  = String(userId);
  const ref    = db.collection('streaks').doc(idStr);

  try{
    // Today's attendance status
    const attSnap   = await db.collection('attendance').doc(idStr+'_'+today).get();
    const attStatus = attSnap.exists ? normalizeStatus(attSnap.data().status) : 'P';
    const isOnTime  = attStatus === 'P';
    const isLate    = attStatus === 'L';

    // Load existing streak doc
    const snap = await ref.get();
    let data   = snap.exists ? snap.data() : {};

    // ── Pull current values ──
    let daily       = data.daily       || 0;
    let dailyBest   = data.dailyBest   || 0;
    let dailyLast   = data.dailyLast   || '';
    let weekly      = data.weekly      || 0;
    let weeklyBest  = data.weeklyBest  || 0;
    let weeklyLast  = data.weeklyLast  || '';
    let monthly     = data.monthly     || 0;
    let monthlyBest = data.monthlyBest || 0;
    let monthlyLast = data.monthlyLast || '';

    // Already updated today — just render with current data
    if(dailyLast === today){
      renderStreakChips({daily, dailyBest, weekly, weeklyBest, monthly, monthlyBest, attStatus});
      return;
    }

    const yesterday   = getYesterdayGY();
    const nowGY       = new Date(new Date().toLocaleString('en-US',{timeZone:'America/Guyana'}));
    const weekStart   = getWeekStartGY(nowGY);   // Monday of current week  YYYY-MM-DD
    const monthStart  = today.substring(0,7)+'-01'; // 1st of current month

    // ── DAILY STREAK ──
    // On time & consecutive → +1. Late or gap → 0
    if(isLate){
      daily = 0;
    } else if(isOnTime){
      daily = (dailyLast === yesterday) ? daily + 1 : 1;
    }
    if(daily > dailyBest) dailyBest = daily;
    dailyLast = today;

    // ── WEEKLY STREAK ──
    // Counts on-time days this week (Mon–Sun). Resets to 0 every Monday.
    // If weeklyLast is from a previous week → reset first
    const weeklyLastInThisWeek = weeklyLast >= weekStart;
    if(!weeklyLastInThisWeek){
      weekly = 0; // new week starts fresh
    }
    if(isLate){
      weekly = 0;
    } else if(isOnTime){
      // Only increment once per day
      if(weeklyLast !== today){
        weekly = weeklyLastInThisWeek ? weekly + 1 : 1;
      }
    }
    if(weekly > weeklyBest) weeklyBest = weekly;
    weeklyLast = today;

    // ── MONTHLY STREAK ──
    // Counts on-time days this month. Resets to 0 on the 1st of each month.
    const monthlyLastInThisMonth = monthlyLast >= monthStart;
    if(!monthlyLastInThisMonth){
      monthly = 0; // new month starts fresh
    }
    if(isLate){
      monthly = 0;
    } else if(isOnTime){
      if(monthlyLast !== today){
        monthly = monthlyLastInThisMonth ? monthly + 1 : 1;
      }
    }
    if(monthly > monthlyBest) monthlyBest = monthly;
    monthlyLast = today;

    // Save all to Firebase
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

function getYesterdayGY(){
  const now = new Date(new Date().toLocaleString('en-US',{timeZone:'America/Guyana'}));
  now.setDate(now.getDate()-1);
  return now.toLocaleDateString('en-CA',{timeZone:'America/Guyana'});
}

function getWeekStartGY(dateObj){
  // Returns YYYY-MM-DD of the most recent Monday
  const d   = new Date(dateObj);
  const day = d.getDay(); // 0=Sun
  const diff = day === 0 ? 6 : day - 1; // days since Monday
  d.setDate(d.getDate() - diff);
  return d.toLocaleDateString('en-CA',{timeZone:'America/Guyana'});
}

function renderStreakChips({daily, dailyBest, weekly, weeklyBest, monthly, monthlyBest, attStatus}){
  const wrap = document.getElementById('streak-chip-wrap');
  if(!wrap) return;

  const isLate = attStatus === 'L';

  function chipHtml(count, best, type, icon, resetLabel){
    const isZero = count === 0;
    const cls    = isZero ? 'zero' : count >= 5 ? 'on-fire' : 'building';
    const emoji  = isZero ? '💤' : count >= 5 ? '🔥' : icon;
    const bestTxt = best > 0 ? ` <span style="opacity:0.45;font-size:0.5rem;">best:${best}</span>` : '';
    return isZero
      ? `<div class="streak-chip zero" title="Log in on time to build your ${type} streak">${emoji} <span>${type.toUpperCase()} 0${bestTxt}</span></div>`
      : `<div class="streak-chip ${cls}" title="${type} streak · best: ${best}">${emoji} <span class="streak-num">${count}</span> <span>${type.toUpperCase()}${bestTxt}</span></div>`;
  }

  wrap.innerHTML =
    chipHtml(weekly,  weeklyBest,  'weekly',  '📅', '') +
    chipHtml(monthly, monthlyBest, 'monthly', '🏆', '');
}

// Update streak display in admin's agent profile view
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
  stopRosterPolling(); // stop background sync on logout
  sessionStorage.removeItem('bds_user_'+getTodayGY());
  currentUser = null;
  auth.signOut();
  // Remove admin mode — CSS handles hiding everything
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
  // Pre-load roster in background for next login
  loadRoster();
}

// ── CHECK EXISTING SESSION ──
async function checkSession(){
  // Pre-load roster in background
  loadRoster();
  const today = getTodayGY();
  const saved = sessionStorage.getItem('bds_user_'+today);
  if(saved){
    try{
      currentUser = JSON.parse(saved);
      // Reload Firebase overrides for shift/lunch/break
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

// ============================================================
//  ROSTER AUTO-SYNC — polls Google Sheet every 2 minutes
//  and silently re-renders all views if anything changed.
// ============================================================
let rosterPollHash    = '';   // fingerprint of last known roster
let rosterPollTimer   = null;
const ROSTER_POLL_MS  = 2 * 60 * 1000; // 2 minutes

// Lightweight string hash (djb2) — no crypto needed
function hashString(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h) ^ str.charCodeAt(i);
    h = h >>> 0; // keep unsigned 32-bit
  }
  return h.toString(36);
}

function getRosterFingerprint() {
  // Sort by userId so order changes don't trigger false positives
  return hashString(JSON.stringify(
    Object.values(ROSTER)
      .sort((a,b) => String(a.userId).localeCompare(String(b.userId)))
      .map(a => ({ id:a.userId, name:a.name, team:a.team, shift:a.shift, lunch:a.lunch, status:a.status }))
  ));
}

function showRosterToast(msg) {
  // Remove any existing toast first
  const old = document.getElementById('roster-sync-toast');
  if (old) old.remove();

  const toast = document.createElement('div');
  toast.id = 'roster-sync-toast';
  toast.textContent = msg;
  Object.assign(toast.style, {
    position:       'fixed',
    bottom:         '24px',
    left:           '50%',
    transform:      'translateX(-50%)',
    background:     '#0d2a1a',
    border:         '1px solid #34d399',
    color:          '#34d399',
    padding:        '10px 22px',
    borderRadius:   '10px',
    fontSize:       '0.78rem',
    fontFamily:     "'Barlow Condensed', sans-serif",
    fontWeight:     '800',
    letterSpacing:  '1.5px',
    textTransform:  'uppercase',
    zIndex:         '99999',
    boxShadow:      '0 4px 20px rgba(52,211,153,0.25)',
    opacity:        '0',
    transition:     'opacity 0.3s ease',
    pointerEvents:  'none',
    whiteSpace:     'nowrap'
  });
  document.body.appendChild(toast);
  requestAnimationFrame(() => { toast.style.opacity = '1'; });
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

async function pollRoster() {
  try {
    // Silent reload — don't touch rosterLoaded flag so UI stays usable
    const data = await callBridge({ action: 'getRoster' });
    if (!data || !data.success || !data.agents) return;

    // Rebuild a temporary roster map from fresh data
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
        userId:   String(a.userId).trim(),
        name:     a.name,
        ytelName: a.ytelName,
        shift:    a.shift  || '',
        lunch:    a.lunch  || '',
        brk:      '',
        team,
        status:   a.status || 'Agent'
      };
    });

    // Compute fingerprint of new data
    const newHash = hashString(JSON.stringify(
      Object.values(fresh)
        .sort((a,b) => String(a.userId).localeCompare(String(b.userId)))
        .map(a => ({ id:a.userId, name:a.name, team:a.team, shift:a.shift, lunch:a.lunch, status:a.status }))
    ));

    if (newHash === rosterPollHash) return; // nothing changed — do nothing

    // ── Something changed — figure out what and notify ──
    const oldCount   = Object.keys(ROSTER).length;
    const newCount   = Object.keys(fresh).length;
    const diff       = newCount - oldCount;

    // Check for field changes (shift, lunch, team, name) on existing agents
    let fieldChanges = 0;
    Object.values(fresh).forEach(a => {
      const old = ROSTER[a.userId];
      if (old && (old.shift !== a.shift || old.lunch !== a.lunch || old.team !== a.team || old.name !== a.name || old.status !== a.status)) {
        fieldChanges++;
      }
    });

    // Apply the fresh roster
    // Preserve Firebase-only entries (not returned by Sheet) that are still valid
    // but skip entries that are duplicates of a Sheet agent (same name, different userId)
    const freshNames = new Set(Object.values(fresh).map(a => (a.name||'').toLowerCase().trim()));
    Object.keys(ROSTER).forEach(uid => {
      if (!fresh[uid]) {
        const entryName = (ROSTER[uid].name||'').toLowerCase().trim();
        if (freshNames.has(entryName)) {
          // Same person is already in fresh from the Sheet — don't add the stale Firebase duplicate
          console.log('pollRoster: skipping Firebase duplicate for', ROSTER[uid].name);
          return;
        }
        // Keep Firebase-only agents unless they're now in the Sheet as inactive
        fresh[uid] = ROSTER[uid];
      }
    });
    ROSTER        = fresh;
    rosterLoaded  = true;
    rosterPollHash = newHash;

    // Build toast message
    let toastMsg = '🔄 Roster synced';
    if (diff > 0)          toastMsg = `✅ Roster updated — ${diff} agent${diff>1?'s':''} added`;
    else if (diff < 0)     toastMsg = `🗑 Roster updated — ${Math.abs(diff)} agent${Math.abs(diff)>1?'s':''} removed`;
    else if (fieldChanges) toastMsg = `✏️ Roster updated — ${fieldChanges} agent${fieldChanges>1?'s':''} changed`;
    showRosterToast(toastMsg);

    // Re-render all active views silently
    if (typeof renderAttTable    === 'function') renderAttTable();
    if (typeof renderProfileList === 'function') renderProfileList();
    if (typeof renderStatsTable  === 'function' && statsData.length) renderStatsTable();
    if (typeof reRenderMonthly   === 'function') reRenderMonthly();
    // Reload overview board if it is currently visible
    const ovEl2 = document.getElementById('admin-overview');
    if (ovEl2 && ovEl2.style.display !== 'none' && typeof loadAdminOverview === 'function') loadAdminOverview();
    // Refresh team breakdown popup if open
    if(typeof refreshBreakdownIfOpen === 'function') refreshBreakdownIfOpen();
    // Reload weekly attendance only if that tab is currently visible
    const wkEl = document.getElementById('admin-weekly');
    if (wkEl && wkEl.style.display !== 'none' && typeof loadWeeklyAttendance === 'function') {
      loadWeeklyAttendance(weeklyTeam || 'BB');
    }

    console.log('🔄 Roster auto-synced:', newCount, 'agents | diff:', diff, '| field changes:', fieldChanges);
  } catch(e) {
    // Silent fail — polling is non-critical, never show errors to user
    console.warn('Roster poll failed (non-fatal):', e);
  }
}

function startRosterPolling() {
  // Take initial fingerprint from whatever loadRoster() already loaded
  rosterPollHash = getRosterFingerprint();
  // Clear any existing timer (safety measure against double-init)
  if (rosterPollTimer) clearInterval(rosterPollTimer);
  rosterPollTimer = setInterval(pollRoster, ROSTER_POLL_MS);
  console.log('🕐 Roster polling started — every', ROSTER_POLL_MS / 60000, 'minutes');
}

function stopRosterPolling() {
  if (rosterPollTimer) { clearInterval(rosterPollTimer); rosterPollTimer = null; }
}

// ── END ROSTER AUTO-SYNC ──

window.addEventListener('load',()=>{ checkSession(); });

function init(){
  loadScript('intro');
  loadObjection('not_interested');
  startClocks();
  const pw=['FIXED-RATE','5.49% APR','SOFT CREDIT CHECK','LENDING SPECIALIST','LIMITED TIME','LOAN AMOUNTS','MONTHLY PAYMENTS','ELIGIBILITY','LENDING PARTNER NETWORK','PRE-QUALIFICATION'];
  const el=document.getElementById('punch-words');
  if(el) el.innerHTML=pw.map(w=>`<div style="background:var(--purple-light);border:1.5px solid #c4b5fd;border-radius:7px;padding:7px;text-align:center;font-size:0.58rem;font-weight:800;color:var(--purple);">${w}</div>`).join('');
}

function startClocks(){
  const zones=[
    {id:'clock-et',tz:'America/New_York'},
    {id:'clock-ct',tz:'America/Chicago'},
    {id:'clock-mt',tz:'America/Denver'},
    {id:'clock-pt',tz:'America/Los_Angeles'},
    {id:'clock-ak',tz:'America/Anchorage'},
    {id:'clock-hi',tz:'Pacific/Honolulu'}
  ];
  function tick(){
    zones.forEach(z=>{
      const el=document.getElementById(z.id);
      if(!el)return;
      el.textContent=new Date().toLocaleTimeString('en-US',{timeZone:z.tz,hour:'2-digit',minute:'2-digit',hour12:true});
    });
  }
  tick();setInterval(tick,1000);
}

// ── COACHING & MONITORING ──
let allCoachingNotes   = [];
let allMonitoringNotes = [];

// Populate rep name datalists
function populateRepDatalist(id){
  const dl = document.getElementById(id);
  if(!dl) return;
  dl.innerHTML = Object.values(ROSTER).sort((a,b)=>a.name.localeCompare(b.name))
    .map(a=>`<option value="${a.name}">`).join('');
}

// ── COACHING ──
function openCoachingForm(){
  populateRepDatalist('cn-rep-list');
  document.getElementById('coaching-form').style.display='';
  document.getElementById('cn-rep').focus();
  document.getElementById('cn-save-status').textContent='';
}
function closeCoachingForm(){
  document.getElementById('coaching-form').style.display='none';
  ['cn-rep','cn-admin','cn-discussion','cn-goal','cn-keypoints','cn-advice','cn-outcome']
    .forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
}

async function saveCoachingNote(){
  const repName    = document.getElementById('cn-rep').value.trim();
  const adminName  = document.getElementById('cn-admin').value.trim();
  const discussion = document.getElementById('cn-discussion').value.trim();
  const goal       = document.getElementById('cn-goal').value.trim();
  const keypoints  = document.getElementById('cn-keypoints').value.trim();
  const advice     = document.getElementById('cn-advice').value.trim();
  const outcome    = document.getElementById('cn-outcome').value.trim();
  const statusEl   = document.getElementById('cn-save-status');

  if(!repName||!adminName){ statusEl.textContent='⚠ Rep name and admin name are required.'; statusEl.style.color='var(--red)'; return; }
  if(!discussion&&!goal&&!keypoints){ statusEl.textContent='⚠ Fill in at least Discussion, Goal or Key Points.'; statusEl.style.color='var(--red)'; return; }

  statusEl.textContent='Saving...'; statusEl.style.color='var(--muted)';

  // Fuzzy match roster — exact first, then partial
  const rAll = Object.values(ROSTER);
  const rAgent = rAll.find(r=>r.name.toLowerCase()===repName.toLowerCase())
              || rAll.find(r=>r.name.toLowerCase().includes(repName.toLowerCase()))
              || rAll.find(r=>repName.toLowerCase().includes(r.name.toLowerCase().split(' ')[0]));

  try{
    await db.collection('coaching_sessions').add({
      type:      'coaching',
      repName:   rAgent ? rAgent.name : repName,
      repId:     rAgent ? String(rAgent.userId) : 'unknown',
      repTeam:   rAgent ? rAgent.team : '',
      adminName, discussion, goal, keypoints, advice, outcome,
      date:      getTodayGY(),
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    statusEl.textContent='✅ Coaching note saved!'; statusEl.style.color='var(--green)';
    setTimeout(()=>{ closeCoachingForm(); loadCoachingNotes(); }, 800);
  }catch(e){ statusEl.textContent='❌ Error: '+e.message; statusEl.style.color='var(--red)'; }
}

async function loadCoachingNotes(){
  try{
    const snap = await db.collection('coaching_sessions')
      .where('type','==','coaching')
      .orderBy('createdAt','desc')
      .limit(50)
      .get();
    allCoachingNotes=[];
    snap.forEach(doc=>allCoachingNotes.push({id:doc.id,...doc.data()}));
    renderCoachingNotes(allCoachingNotes);
  }catch(e){ console.error('Load coaching:',e); }
}

function filterCoachingNotes(){
  const q    = (document.getElementById('coach-search')||{value:''}).value.toLowerCase();
  const team = (document.getElementById('coach-team-filter')||{value:'all'}).value;
  const filtered = allCoachingNotes.filter(n=>
    (!q || n.repName.toLowerCase().includes(q)) &&
    (team==='all' || n.repTeam===team)
  );
  renderCoachingNotes(filtered);
}

function renderCoachingNotes(notes){
  const feed = document.getElementById('coaching-notes-feed');
  if(!feed) return;
  if(!notes.length){ feed.innerHTML='<div style="text-align:center;color:var(--muted);padding:24px;">No coaching notes yet. Click + Add Note to create one.</div>'; return; }
  feed.innerHTML = notes.map(n=>renderNoteCard(n,'coaching')).join('');
}

// ── MONITORING ──
function openMonitoringForm(){
  populateRepDatalist('mn-rep-list');
  document.getElementById('monitoring-form').style.display='';
  document.getElementById('mn-rep').focus();
  document.getElementById('mn-save-status').textContent='';
}
function closeMonitoringForm(){
  document.getElementById('monitoring-form').style.display='none';
  ['mn-rep','mn-admin','mn-dial','mn-voice','mn-script','mn-objection','mn-points']
    .forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
}

async function saveMonitoringNote(){
  const repName  = document.getElementById('mn-rep').value.trim();
  const adminName= document.getElementById('mn-admin').value.trim();
  const dial     = document.getElementById('mn-dial').value.trim();
  const voice    = document.getElementById('mn-voice').value.trim();
  const script   = document.getElementById('mn-script').value.trim();
  const objection= document.getElementById('mn-objection').value.trim();
  const points   = document.getElementById('mn-points').value.trim();
  const statusEl = document.getElementById('mn-save-status');

  if(!repName||!adminName){ statusEl.textContent='⚠ Rep name and admin name are required.'; statusEl.style.color='var(--red)'; return; }
  statusEl.textContent='Saving...'; statusEl.style.color='var(--muted)';

  // Fuzzy match roster
  const rAll = Object.values(ROSTER);
  const rAgent = rAll.find(r=>r.name.toLowerCase()===repName.toLowerCase())
              || rAll.find(r=>r.name.toLowerCase().includes(repName.toLowerCase()))
              || rAll.find(r=>repName.toLowerCase().includes(r.name.toLowerCase().split(' ')[0]));

  try{
    await db.collection('coaching_sessions').add({
      type:      'monitoring',
      repName:   rAgent ? rAgent.name : repName,
      repId:     rAgent ? String(rAgent.userId) : 'unknown',
      repTeam:   rAgent ? rAgent.team : '',
      adminName,
      dial, voice, script, objection, points,
      date:      getTodayGY(),
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    statusEl.textContent='✅ Monitoring session saved!'; statusEl.style.color='var(--green)';
    setTimeout(()=>{ closeMonitoringForm(); loadMonitoringNotes(); }, 800);
  }catch(e){
    statusEl.textContent='❌ Error: '+e.message; statusEl.style.color='var(--red)';
  }
}

async function loadMonitoringNotes(){
  try{
    const snap = await db.collection('coaching_sessions')
      .where('type','==','monitoring')
      .orderBy('createdAt','desc')
      .limit(50)
      .get();
    allMonitoringNotes=[];
    snap.forEach(doc=>allMonitoringNotes.push({id:doc.id,...doc.data()}));
    renderMonitoringNotes(allMonitoringNotes);
  }catch(e){ console.error('Load monitoring:',e); }
}

function filterMonitoringNotes(){
  const q    = (document.getElementById('monitor-search')||{value:''}).value.toLowerCase();
  const team = (document.getElementById('monitor-team-filter')||{value:'all'}).value;
  const filtered = allMonitoringNotes.filter(n=>
    (!q || n.repName.toLowerCase().includes(q)) &&
    (team==='all' || n.repTeam===team)
  );
  renderMonitoringNotes(filtered);
}

function renderMonitoringNotes(notes){
  const feed = document.getElementById('monitoring-notes-feed');
  if(!feed) return;
  if(!notes.length){ feed.innerHTML='<div style="text-align:center;color:var(--muted);padding:24px;">No monitoring sessions yet. Click + Add Session to create one.</div>'; return; }
  feed.innerHTML = notes.map(n=>renderNoteCard(n,'monitoring')).join('');
}

// ── SHARED NOTE CARD RENDERER — with Edit & Delete ──
function renderNoteCard(n, type){
  const isMonitor   = type==='monitoring';
  const accentColor = isMonitor ? 'var(--purple)' : 'var(--accent)';
  const typeLabel   = isMonitor ? '🎧 LIVE MONITORING' : '📝 COACHING';
  const date = n.date || '—';
  const time = n.createdAt ? new Date(n.createdAt.seconds*1000).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',timeZone:'America/Guyana'}) : '';
  const team = n.repTeam==='BB'
    ? `<span style="color:var(--accent);font-size:0.62rem;font-weight:800;background:rgba(96,165,250,0.1);padding:2px 7px;border-radius:4px;">BB</span>`
    : n.repTeam==='PR'
    ? `<span style="color:var(--purple);font-size:0.62rem;font-weight:800;background:rgba(167,139,250,0.1);padding:2px 7px;border-radius:4px;">PR</span>`
    : '';

  const field = (label, val, full) => !val ? '' : `
    <div style="background:#060b18;border:1px solid #111c30;border-radius:8px;padding:10px;${full?'grid-column:1/-1':''}">
      <div style="font-size:0.55rem;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:${accentColor};margin-bottom:5px;opacity:0.8;">${label}</div>
      <div style="font-size:0.8rem;color:#cbd5e1;line-height:1.7;white-space:pre-wrap;">${val}</div>
    </div>`;

  // Determine fields based on type
  const fieldsHtml = isMonitor
    ? field('📞 Dial Behavior',n.dial,false)+field('🎙 Voice & Tone',n.voice,false)+field('📋 Script & Engagement',n.script,false)+field('🛡 Objection Handling',n.objection,false)+field('⭐ Coaching Points',n.points,true)
    : field('💬 Discussion',n.discussion,false)+field('🎯 Goal',n.goal,false)+field('🔑 Key Points',n.keypoints,true)+field('💡 My Advice',n.advice,false)+field('✅ Outcome',n.outcome,false);

  const docId = n.id||'';

  return `<div id="note-card-${docId}" style="background:#070e1c;border:1px solid #1a2a45;border-left:3px solid ${accentColor};border-radius:10px;padding:14px 16px;margin-bottom:12px;">

    <!-- Header -->
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;flex-wrap:wrap;gap:6px;">
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
        <span style="font-family:'Barlow Condensed',sans-serif;font-size:1.15rem;font-weight:800;color:var(--text);cursor:pointer;" onclick="openRepProfileByName('${n.repName}')">${n.repName}</span>
        ${team}
        <span style="font-size:0.6rem;color:${accentColor};font-weight:800;letter-spacing:1px;">${typeLabel}</span>
      </div>
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
        <div style="text-align:right;">
          <div style="font-size:0.68rem;color:var(--text);font-weight:700;">${date} ${time}</div>
          <div style="font-size:0.62rem;color:var(--muted);">By: <strong style="color:var(--text);">${n.adminName||'—'}</strong></div>
        </div>
        <button onclick="editNoteCard('${docId}','${type}')" title="Edit" style="padding:5px 10px;border-radius:7px;border:1px solid rgba(251,191,36,0.3);background:rgba(251,191,36,0.08);color:#fbbf24;font-size:0.7rem;font-weight:800;cursor:pointer;font-family:'Barlow Condensed',sans-serif;letter-spacing:1px;">✏️ EDIT</button>
        <button onclick="deleteNoteCard('${docId}','${type}')" title="Delete" style="padding:5px 10px;border-radius:7px;border:1px solid rgba(248,113,113,0.3);background:rgba(248,113,113,0.08);color:#f87171;font-size:0.7rem;font-weight:800;cursor:pointer;font-family:'Barlow Condensed',sans-serif;letter-spacing:1px;">🗑 DEL</button>
      </div>
    </div>

    <!-- Fields -->
    <div id="note-fields-${docId}" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
      ${fieldsHtml}
    </div>

    <!-- Inline edit form (hidden by default) -->
    <div id="note-edit-${docId}" style="display:none;margin-top:12px;background:#060b18;border:1px solid #1e3050;border-radius:10px;padding:14px;">
      <div style="font-size:0.55rem;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:${accentColor};margin-bottom:12px;">✏️ EDITING SESSION</div>
      ${isMonitor ? `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">
          ${editField('Dial Behavior','ne-dial-'+docId, n.dial||'')}
          ${editField('Voice & Tone','ne-voice-'+docId, n.voice||'')}
          ${editField('Script & Engagement','ne-script-'+docId, n.script||'')}
          ${editField('Objection Handling','ne-objection-'+docId, n.objection||'')}
        </div>
        ${editFieldFull('Coaching Points','ne-points-'+docId, n.points||'')}
      ` : `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">
          ${editField('Discussion','ne-discussion-'+docId, n.discussion||'')}
          ${editField('Goal','ne-goal-'+docId, n.goal||'')}
          ${editField('My Advice','ne-advice-'+docId, n.advice||'')}
          ${editField('Outcome','ne-outcome-'+docId, n.outcome||'')}
        </div>
        ${editFieldFull('Key Points','ne-keypoints-'+docId, n.keypoints||'')}
      `}
      <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;">
        <button onclick="saveNoteEdit('${docId}','${type}')" style="padding:8px 18px;border-radius:8px;border:none;background:var(--green);color:#000;font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:0.85rem;cursor:pointer;letter-spacing:1px;">💾 SAVE CHANGES</button>
        <button onclick="cancelNoteEdit('${docId}')" style="padding:8px 14px;border-radius:8px;border:1px solid #2a3a5a;background:transparent;color:var(--muted);font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:0.85rem;cursor:pointer;">Cancel</button>
        <span id="note-edit-status-${docId}" style="font-size:0.7rem;padding:8px 0;"></span>
      </div>
    </div>
  </div>`;
}

function editField(label, id, val){
  return `<div>
    <div style="font-size:0.5rem;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:#64748b;margin-bottom:4px;">${label}</div>
    <textarea id="${id}" rows="3" style="width:100%;padding:8px;background:#0a1020;border:1px solid #2a3a5a;border-radius:7px;color:#e2e8f0;font-size:0.78rem;font-family:'Nunito',sans-serif;resize:vertical;outline:none;box-sizing:border-box;">${val}</textarea>
  </div>`;
}
function editFieldFull(label, id, val){
  return `<div>
    <div style="font-size:0.5rem;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:#64748b;margin-bottom:4px;">${label}</div>
    <textarea id="${id}" rows="4" style="width:100%;padding:8px;background:#0a1020;border:1px solid #2a3a5a;border-radius:7px;color:#e2e8f0;font-size:0.78rem;font-family:'Nunito',sans-serif;resize:vertical;outline:none;box-sizing:border-box;">${val}</textarea>
  </div>`;
}

function editNoteCard(docId, type){
  document.getElementById('note-fields-'+docId).style.display='none';
  document.getElementById('note-edit-'+docId).style.display='';
}

function cancelNoteEdit(docId){
  document.getElementById('note-fields-'+docId).style.display='';
  document.getElementById('note-edit-'+docId).style.display='none';
}

async function saveNoteEdit(docId, type){
  const statusEl = document.getElementById('note-edit-status-'+docId);
  if(statusEl){ statusEl.textContent='Saving...'; statusEl.style.color='var(--muted)'; }
  const isMonitor = type==='monitoring';

  const g = id => { const el=document.getElementById(id); return el?el.value.trim():''; };

  const updates = isMonitor ? {
    dial:      g('ne-dial-'+docId),
    voice:     g('ne-voice-'+docId),
    script:    g('ne-script-'+docId),
    objection: g('ne-objection-'+docId),
    points:    g('ne-points-'+docId),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  } : {
    discussion: g('ne-discussion-'+docId),
    goal:       g('ne-goal-'+docId),
    advice:     g('ne-advice-'+docId),
    outcome:    g('ne-outcome-'+docId),
    keypoints:  g('ne-keypoints-'+docId),
    updatedAt:  firebase.firestore.FieldValue.serverTimestamp()
  };

  try{
    await db.collection('coaching_sessions').doc(docId).update(updates);
    if(statusEl){ statusEl.textContent='✅ Saved!'; statusEl.style.color='var(--green)'; }
    setTimeout(()=>{
      if(type==='monitoring') loadMonitoringNotes();
      else loadCoachingNotes();
      // Reload agent profile sessions if open
      if(currentRepProfile){ apLoadSessions(currentRepProfile.id, type); }
    }, 600);
  }catch(e){
    if(statusEl){ statusEl.textContent='❌ '+e.message; statusEl.style.color='var(--red)'; }
  }
}

async function deleteNoteCard(docId, type){
  if(!confirm('Delete this session permanently? This cannot be undone.')) return;
  try{
    await db.collection('coaching_sessions').doc(docId).delete();
    const card = document.getElementById('note-card-'+docId);
    if(card){ card.style.opacity='0'; card.style.transition='opacity 0.3s'; setTimeout(()=>card.remove(),300); }
    // Reload counts if agent profile is open
    if(currentRepProfile){ apLoadOverview(currentRepProfile.id, currentRepProfile.name); }
  }catch(e){ alert('Could not delete: '+e.message); }
}

// Open rep profile from coaching/monitoring card
function openRepProfileByName(name){
  const agent = Object.values(ROSTER).find(r=>r.name.toLowerCase()===name.toLowerCase());
  if(agent) openRepProfile(agent.userId, agent.name, agent.team, agent.shift);
}

// Load coaching & monitoring notes in rep profile coach tab
async function loadRepCoach(id){
  const list = document.getElementById('coach-notes-list');
  if(!list) return;
  list.innerHTML='<div style="color:var(--muted);font-size:0.78rem;">Loading...</div>';
  const renderNotes = docs => {
    if(!docs.length){ list.innerHTML='<div style="color:var(--muted);font-size:0.78rem;">No coaching or monitoring notes yet.</div>'; return; }
    list.innerHTML = docs.map(d=>{
      const isMonitor = d.type==='monitoring';
      const color = isMonitor?'var(--purple)':'var(--accent)';
      const label = isMonitor?'🎧 Live Monitoring':'📝 Coaching';
      const date  = d.createdAt ? new Date(d.createdAt.seconds*1000).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'America/Guyana'}) : d.date||'—';
      const fields = [
        ['💬 Discussion',          d.discussion],
        ['🎯 Goal',                d.goal],
        ['🔑 Key Discussion Points', d.keypoints],
        ['💡 My Advice',           d.advice],
        ['✅ Outcome',             d.outcome],
        // Legacy fields fallback
        ['📞 Dial Behavior',       d.dial],
        ['🎙 Voice & Tone',        d.voice],
        ['📋 Script',              d.script],
        ['🛡 Objection Handling',  d.objection],
        ['⭐ Coaching Points',     d.points],
      ].filter(f=>f[1]);
      return `<div class="note-item" style="border-left:2px solid ${color};margin-bottom:10px;">
        <div class="note-date" style="display:flex;justify-content:space-between;margin-bottom:5px;">
          <span style="color:${color};font-weight:800;">${label}</span>
          <span>${date} · Admin: <strong style="color:var(--text);">${d.adminName||'—'}</strong></span>
        </div>
        ${fields.map(f=>`<div style="margin-top:5px;"><span style="font-size:0.58rem;font-weight:800;color:var(--muted);text-transform:uppercase;">${f[0]}: </span><span style="color:#cbd5e1;">${f[1]}</span></div>`).join('')}
      </div>`;
    }).join('');
  };
  try{
    const snap = await db.collection('coaching_sessions')
      .where('repId','==',String(id))
      .orderBy('createdAt','desc').limit(20).get();
    const docs=[]; snap.forEach(doc=>docs.push(doc.data()));
    renderNotes(docs);
  }catch(e){
    // Fallback without ordering (index may not exist yet)
    try{
      const snap2 = await db.collection('coaching_sessions').where('repId','==',String(id)).get();
      const docs=[]; snap2.forEach(doc=>docs.push(doc.data()));
      docs.sort((a,b)=>(b.createdAt?.seconds||0)-(a.createdAt?.seconds||0));
      renderNotes(docs);
    }catch(e2){ list.innerHTML='<div style="color:var(--muted);">Could not load notes.</div>'; }
  }
}
let selectedProfileId = null;

function autoFillYtel(){
  const nameVal = document.getElementById('nr-name').value.trim();
  const team    = document.getElementById('nr-team').value;
  const ytelEl  = document.getElementById('nr-ytel');
  if(!nameVal) return;
  // Format: "GUYB First Last" (BB) or "GUYP First Last" (PR)
  // e.g. "Kleon Williams" + BB → "GUYB Kleon Williams"
  // e.g. "Priya Sookram"  + PR → "GUYP Priya Sookram"
  const prefix = team === 'PR' ? 'GUYP ' : 'GUYB ';
  // Only auto-fill if empty or was previously auto-filled (starts with GUY)
  if(!ytelEl.value || ytelEl.value.startsWith('GUY')){
    ytelEl.value = prefix + nameVal;
  }
}

function toggleAddRepForm(){
  const form = document.getElementById('add-rep-form');
  const btn  = document.getElementById('add-rep-toggle-btn');
  const open = form.style.display === 'none';
  form.style.display = open ? '' : 'none';
  btn.textContent = open ? '✕ CANCEL' : '＋ ADD NEW REP';
  btn.style.background = open ? 'transparent' : 'linear-gradient(90deg,var(--green),var(--cyan))';
  btn.style.border = open ? '1px solid var(--border)' : 'none';
  btn.style.color = open ? 'var(--muted)' : '#000';
  if(open){
    document.getElementById('nr-name').value='';
    document.getElementById('nr-id').value='';
    document.getElementById('nr-ytel').value='';
    document.getElementById('nr-lunch').value='';
    document.getElementById('nr-status-msg').textContent='';
  }
}

async function saveNewRep(){
  const msgEl = document.getElementById('nr-status-msg');
  const name   = document.getElementById('nr-name').value.trim();
  const idVal  = document.getElementById('nr-id').value.trim();
  const team   = document.getElementById('nr-team').value;
  const ytel   = document.getElementById('nr-ytel').value.trim();
  const shift  = document.getElementById('nr-shift').value;
  const lunch  = document.getElementById('nr-lunch').value.trim();
  const status = document.getElementById('nr-status').value;

  // Validate required fields
  if(!name){ msgEl.style.color='var(--red)'; msgEl.textContent='⚠️ Full name is required.'; return; }
  if(!idVal){ msgEl.style.color='var(--red)'; msgEl.textContent='⚠️ User ID is required.'; return; }
  if(isNaN(idVal)||idVal===''){ msgEl.style.color='var(--red)'; msgEl.textContent='⚠️ User ID must be a number.'; return; }
  if(!ytel){ msgEl.style.color='var(--red)'; msgEl.textContent='⚠️ Ytel Name is required (e.g. GUYB John Smith or GUYP John Smith).'; return; }

  // Check for duplicate ID
  if(ROSTER[String(idVal)]){ msgEl.style.color='var(--red)'; msgEl.textContent='⚠️ A rep with ID '+idVal+' already exists: '+ROSTER[String(idVal)].name; return; }

  msgEl.style.color='var(--gold)'; msgEl.textContent='⏳ Saving to Google Sheet...';

  let sheetOk = false;
  let fireOk  = false;
  const errors = [];

  // 1. Write to Google Sheet via bridge
  try{
    const r = await callBridge({
      action:    'addAgent',
      ytelName:  ytel,
      agentName: name,
      userId:    idVal,
      team,
      shift,
      lunch,
      status
    });
    if(r && r.success){ sheetOk = true; }
    else { errors.push('Sheet: '+(r&&r.error?r.error:'Unknown error')); }
  }catch(e){ errors.push('Sheet bridge failed — rep added to Firebase only'); }

  // 2. Write to Firebase roster so they can log in immediately
  try{
    await db.collection('roster').doc(String(idVal)).set({
      userId: String(idVal),
      name,
      team,
      ytelName: ytel||'',
      shift:  shift||'',
      lunch:  lunch||'',
      brk:    '',
      status,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    fireOk = true;
  }catch(e){ errors.push('Firebase: '+e.message); }

  if(!fireOk && !sheetOk){
    msgEl.style.color='var(--red)'; msgEl.textContent='❌ Failed to save. '+errors.join(' | ');
    return;
  }

  // Update local ROSTER so the rep appears immediately without a full reload
  ROSTER[String(idVal)] = { userId:String(idVal), name, team, ytelName:ytel||'', shift:shift||'', lunch:lunch||'', brk:'', status };

  const note = errors.length ? ' (⚠️ '+errors.join('; ')+')' : '';
  msgEl.style.color='var(--green)';
  msgEl.textContent='✅ '+name+' (ID: '+idVal+') added successfully!'+note;

  // Refresh ALL views that display the roster so the new agent appears immediately
  // in the correct alphabetical position across every tab
  setTimeout(async ()=>{
    toggleAddRepForm();

    // Force a fresh roster pull from the Sheet — this picks up the alphabetical
    // insert that addAgent just performed, ensuring ROSTER is perfectly in sync
    rosterLoaded = false;
    await loadRoster();

    // Re-render every view that uses the roster
    renderProfileList();      // Profiles tab agent list
    renderAttTable();         // Attendance tab
    if(typeof renderStatsTable === 'function') renderStatsTable(); // Agent Stats tab

    // Refresh the live overview board (online/absent chips + glance counts)
    const ovEl = document.getElementById('admin-overview');
    if(ovEl && ovEl.style.display !== 'none') loadAdminOverview();
    // Refresh team breakdown popup if open
    refreshBreakdownIfOpen();

    // Refresh weekly attendance if it's currently open
    if(weeklyTeam){ loadWeeklyAttendance(weeklyTeam); }

    // Refresh monthly overview if open
    if(typeof reRenderMonthly === 'function') reRenderMonthly();
  }, 1800);
}

function loadAgentProfiles(){
  if(!rosterLoaded){ loadRoster().then(()=>renderProfileList()); return; }
  renderProfileList();
}

function renderProfileList(){
  const search     = (document.getElementById('profile-search')||{value:''}).value.toLowerCase();
  const teamFilter = (document.getElementById('profile-team-filter')||{value:'all'}).value;
  const container  = document.getElementById('profile-list');
  if(!container) return;

  const agents = Object.values(ROSTER)
    .filter(a => (teamFilter==='all'||a.team===teamFilter)
              && (!search || a.name.toLowerCase().includes(search)))
    .sort((a,b)=>a.name.localeCompare(b.name));

  if(!agents.length){
    container.innerHTML='<div style="text-align:center;color:var(--muted);padding:20px;font-size:0.82rem;">No agents found.</div>';
    return;
  }

  container.innerHTML = agents.map(a=>{
    const uid = a.userId || Object.keys(ROSTER).find(k=>ROSTER[k]===a) || '';
    const teamColor = a.team==='BB'?'var(--accent)':'var(--purple)';
    const isSelected = uid === selectedProfileId;
    return `<div
      style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid #0f1e35;cursor:pointer;background:${isSelected?'#0d1a30':'transparent'};transition:background 0.12s;"
      onmouseover="this.style.background='#0a1424'" onmouseout="this.style.background='${isSelected?'#0d1a30':'transparent'}'">
      <div style="display:flex;align-items:center;gap:10px;flex:1;" onclick="openRepProfile('${uid}','${a.name.replace(/'/g,"\\'")}','${a.team}','${(a.shift||'').replace(/'/g,"\\'")}')">
        <span style="font-size:0.65rem;font-weight:800;color:${teamColor};min-width:24px;">${a.team}</span>
        <div>
          <div style="font-weight:700;font-size:0.85rem;color:var(--text);">${a.name}</div>
          <div style="font-size:0.65rem;color:var(--muted);">${a.shift||'No shift set'} ${a.lunch?'· '+a.lunch:''}</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:0.65rem;color:var(--muted);">ID: ${uid}</span>
        <button onclick="event.stopPropagation();selectProfile('${uid}')"
          style="padding:3px 10px;border-radius:6px;border:1px solid #2a3a5a;background:#0d1424;color:#64748b;font-size:0.6rem;font-family:'Barlow Condensed',sans-serif;font-weight:800;cursor:pointer;letter-spacing:1px;">
          ✏️ EDIT
        </button>
      </div>
    </div>`;
  }).join('');
}

function selectProfile(userId){
  selectedProfileId = String(userId);
  renderProfileList();

  const agent = ROSTER[userId] || ROSTER[String(userId)];
  if(!agent){ console.warn('Agent not found:', userId); return; }

  const uid = agent.userId || userId;
  document.getElementById('pe-name').textContent  = agent.name;
  document.getElementById('pe-meta').textContent  = (agent.team==='BB'?'Berbice (BB)':'Providence (PR)')+' · ID: '+uid;

  // Shift — fuzzy match to dropdown option
  const shiftSel = document.getElementById('pe-shift');
  const shiftVal = (agent.shift||'').toLowerCase().replace(/\s+/g,'');
  let shiftMatched = '';
  Array.from(shiftSel.options).forEach(opt=>{
    if(opt.value && opt.value.toLowerCase().replace(/\s+/g,'') === shiftVal) shiftMatched = opt.value;
  });
  shiftSel.value = shiftMatched || agent.shift || '';

  document.getElementById('pe-lunch').value       = agent.lunch  || '';
  document.getElementById('pe-status').value      = agent.status || 'Agent';
  document.getElementById('pe-save-status').textContent = '';

  document.getElementById('pe-break').value = agent.brk || '';
  db.collection('roster').doc(String(uid)).get().then(snap=>{
    if(snap.exists && snap.data().brk)
      document.getElementById('pe-break').value = snap.data().brk;
  }).catch(()=>{});

  document.getElementById('profile-edit-panel').style.display='';
  document.getElementById('profile-edit-panel').scrollIntoView({behavior:'smooth',block:'nearest'});
}

function filterProfileList(){
  renderProfileList();
  closeProfileEdit();
}

function closeProfileEdit(){
  selectedProfileId = null;
  document.getElementById('profile-edit-panel').style.display='none';
  renderProfileList();
}

async function saveProfileEdits(){
  if(!selectedProfileId) return;
  const agent = ROSTER[selectedProfileId];
  if(!agent){ document.getElementById('pe-save-status').textContent='❌ Agent not found'; return; }

  const uid = agent.userId || selectedProfileId;

  const newShift  = document.getElementById('pe-shift').value.trim();
  const newLunch  = document.getElementById('pe-lunch').value.trim();
  const newBreak  = document.getElementById('pe-break').value.trim();
  const newStatus = document.getElementById('pe-status').value.trim();
  const statusEl  = document.getElementById('pe-save-status');
  const saveBtn   = document.querySelector('#profile-edit-panel button[onclick="saveProfileEdits()"]');

  // Show loading state on button
  if(saveBtn){ saveBtn.disabled=true; saveBtn.textContent='⏳ SAVING...'; saveBtn.style.opacity='0.7'; }
  statusEl.textContent = 'Saving to Google Sheet...';
  statusEl.style.color = '#64748b';

  const errors  = [];
  const updates = [];

  if(newShift !== (agent.shift||'')){
    try{
      const r = await callBridge({action:'updateRosterField', userId:uid, field:'shift', value:newShift});
      if(r && r.success){ ROSTER[selectedProfileId].shift=newShift; updates.push('Shift'); }
      else errors.push('Shift: '+(r?.error||'failed'));
    }catch(e){ errors.push('Shift error'); }
  }

  if(newLunch !== (agent.lunch||'')){
    try{
      const r = await callBridge({action:'updateRosterField', userId:uid, field:'lunch', value:newLunch});
      if(r && r.success){ ROSTER[selectedProfileId].lunch=newLunch; updates.push('Lunch'); }
      else errors.push('Lunch: '+(r?.error||'failed'));
    }catch(e){ errors.push('Lunch error'); }
  }

  if(newStatus !== (agent.status||'')){
    try{
      const r = await callBridge({action:'updateRosterField', userId:uid, field:'status', value:newStatus});
      if(r && r.success){
        ROSTER[selectedProfileId].status = newStatus;
        if(newStatus.toLowerCase()==='inactive'){ delete ROSTER[selectedProfileId]; closeProfileEdit(); }
        updates.push('Status');
      } else errors.push('Status: '+(r?.error||'failed'));
    }catch(e){ errors.push('Status error'); }
  }

  if(newBreak !== (agent.brk||'')){
    try{
      await db.collection('roster').doc(String(uid)).set({brk:newBreak},{merge:true});
      ROSTER[selectedProfileId].brk = newBreak;
      updates.push('Break');
    }catch(e){ errors.push('Break error'); }
  }

  // Push shift+lunch to Firebase so agent sees on next login
  try{
    const fbUp = {};
    if(newShift) fbUp.shift = newShift;
    if(newLunch) fbUp.lunch = newLunch;
    if(Object.keys(fbUp).length) await db.collection('roster').doc(String(uid)).set(fbUp,{merge:true});
  }catch(e){}

  // Restore button
  if(saveBtn){
    saveBtn.disabled=false;
    saveBtn.style.opacity='1';
    if(errors.length){ saveBtn.textContent='⚠️ RETRY SAVE'; }
    else { saveBtn.innerHTML='✅ DONE — SAVED TO GOOGLE SHEET'; }
    setTimeout(()=>{ if(saveBtn) saveBtn.innerHTML='💾 SAVE ALL CHANGES TO GOOGLE SHEET'; },3500);
  }

  if(errors.length){
    statusEl.textContent = '⚠ Errors: '+errors.join(' · ');
    statusEl.style.color = '#fbbf24';
  } else if(updates.length){
    statusEl.textContent = '✅ '+updates.join(', ')+' saved successfully';
    statusEl.style.color = '#34d399';
    renderProfileList();
    setTimeout(()=>{ statusEl.textContent=''; },4000);
  } else {
    statusEl.textContent = 'No changes detected.';
    statusEl.style.color = '#64748b';
    setTimeout(()=>{ statusEl.textContent=''; },2000);
  }
}

