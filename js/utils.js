// FILE: js/utils.js
// Shared utility functions used across the dashboard

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

// ── DATE HELPERS ──
function getTodayGY(){
  return new Date().toLocaleDateString('en-CA',{timeZone:'America/Guyana'});
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

// ── GREETING ──
function getGreeting(name){
  const h = new Date().toLocaleString('en-US',{timeZone:'America/Guyana',hour:'numeric',hour12:false});
  const hr = parseInt(h);
  if(hr < 12) return `Good morning, ${name}! Let's make today count. 🔥`;
  if(hr < 17) return `Good afternoon, ${name}! Stay focused, close strong. 💪`;
  return `Good evening, ${name}! Finish the shift strong. ⚡`;
}

// ── NORMALIZE STATUS ──
function normalizeStatus(raw){
  if(!raw) return 'P';
  const r = raw.toUpperCase().trim();
  if(r==='LATE'||r==='L') return 'L';
  if(r==='ABSENT'||r==='A') return 'A';
  if(r==='SICK'||r==='S') return 'S';
  if(r==='PERSONAL OUT'||r==='PO') return 'PO';
  return 'P';
}

// ── CLOCKS ──
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

// ── ROSTER TOAST NOTIFICATION ──
function showRosterToast(msg) {
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

// ── LIGHTWEIGHT STRING HASH (djb2) ──
function hashString(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h) ^ str.charCodeAt(i);
    h = h >>> 0;
  }
  return h.toString(36);
}

// ── CSV LINE PARSER ──
function parseCSVLine(line, delim) {
  const result = [];
  let cur = '', inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { inQ = !inQ; }
    else if (ch === delim && !inQ) { result.push(cur.trim()); cur = ''; }
    else { cur += ch; }
  }
  result.push(cur.trim());
  return result;
}

// ── DATE FORMATTER ──
function fmtDate(str){
  if(!str) return '';
  const d = new Date(str + 'T12:00:00');
  return d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
}

// Make all utilities globally accessible
window.callBridge       = callBridge;
window.getTodayGY       = getTodayGY;
window.getYesterdayGY   = getYesterdayGY;
window.getWeekStartGY   = getWeekStartGY;
window.getGreeting      = getGreeting;
window.normalizeStatus  = normalizeStatus;
window.startClocks      = startClocks;
window.showRosterToast  = showRosterToast;
window.hashString       = hashString;
window.parseCSVLine     = parseCSVLine;
window.fmtDate          = fmtDate;
