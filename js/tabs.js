/* ── Tab Navigation & Content Loading ──
   switchTab loads the tab HTML on first visit via window.loadTab()
   (defined in index.html), then activates the tab page.
   Add new tabs by adding an entry in the TAB_FILES map in index.html
   and a new <div class="tab-page" id="page-{name}"></div> there too.
*/

function switchTab(tab){
  // window.loadTab is the fetch-based loader defined in index.html.
  // It fetches tabs/tab-{name}.html on first visit, then fires the callback.
  if(window.loadTab){
    window.loadTab(tab, function(){ _activateTab(tab); });
  } else {
    _activateTab(tab);
  }
}

function _activateTab(tab){
  document.querySelectorAll('.tab-page').forEach(p=>{
    p.classList.remove('active');
    p.classList.remove('admin-page-active');
  });
  document.querySelectorAll('.tab-btn,.admin-tab-btn').forEach(b=>b.classList.remove('active'));
  const page=document.getElementById('page-'+tab);
  const btn=document.getElementById('tab-'+tab);
  if(page) page.classList.add('active');
  if(btn) btn.classList.add('active');
}

function loadScript(key){
  const s=S[key];if(!s)return;
  document.querySelectorAll('#page-script .sub-tab').forEach(el=>el.classList.toggle('active',el.id==='stab-'+key));
  const d=document.getElementById('sdisplay');
  const nb=document.getElementById('nav-btns');
  d.innerHTML=`<div style="font-family:'Barlow Condensed',sans-serif;font-size:0.65rem;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:${s.color};margin-bottom:14px;padding-bottom:10px;border-bottom:2px solid var(--border);">${s.phase}</div>${s.content}`;
  d.scrollTop=0;nb.innerHTML='';
  if(s.next){const b=document.createElement('button');b.className='btn btn-p btn-f';b.innerText='\u2192 NEXT STEP';b.onclick=()=>loadScript(s.next);nb.appendChild(b);}
  const r=document.createElement('button');r.className='btn';r.innerText='\u21BA RESET';r.onclick=()=>loadScript('intro');nb.appendChild(r);
}


function loadObjection(key){
  const o=OBJ[key];if(!o)return;
  document.querySelectorAll('#page-objections .sub-tab').forEach(el=>el.classList.toggle('active',el.id==='stab-'+key));
  const d=document.getElementById('obj-display');
  d.innerHTML=`<div style="font-family:'Barlow Condensed',sans-serif;font-size:0.65rem;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:${o.color};margin-bottom:14px;padding-bottom:10px;border-bottom:2px solid var(--border);">${o.phase}</div>${o.content}`;
  d.scrollTop=0;
  // ── REBUTTAL TRACKING ──
  if(currentUser && !currentUser.isAdmin){
    const today = getTodayGY();
    const docId = currentUser.id+'_'+today;
    const ref   = db.collection('rebuttal_clicks').doc(docId);
    const tsNow = Date.now(); // client timestamp in ms

    ref.get().then(snap=>{
      const dat    = snap.exists ? snap.data() : {};
      const clicks = dat.clicks  || {};
      const events = dat.events  || []; // array of {key, ts} for burst detection

      clicks[key] = (clicks[key]||0)+1;

      // Keep last 200 events max to avoid doc bloat
      events.push({key, ts: tsNow});
      if(events.length > 200) events.splice(0, events.length - 200);

      ref.set({
        id:   String(currentUser.id),
        name: currentUser.name||'',
        team: currentUser.team||'',
        date: today,
        clicks,
        events,
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
      },{merge:true});
    }).catch(()=>{});
  }
}

// ── ADMIN PANEL JS ──
let currentRepProfile = null;
let statsData     = [];
let statsDataDate = ''; // tracks which date the loaded statsData is for
let statsSortCol = 3;
let statsSortDir = -1;
let adminStatsTapCount = 0;
let adminStatsTapTimer = null;
let pendingCSVData = null;
let selectedExpiryDays = 7;
let dailyGoal = 300;
let attFilter     = 'all';
let attTeamFilter = 'all'; // 'all', 'BB', 'PR'

