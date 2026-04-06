// FILE: js/tabs.js
// Tab switching, lazy loading of tab HTML, init function

// ── TAB LOADER ──
const loadedTabs = {};

async function switchTab(tabName) {
  // Hide all tab pages
  document.querySelectorAll('.tab-page').forEach(p => {
    p.classList.remove('active');
  });

  // Update active tab button
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.remove('active');
  });
  document.getElementById('tab-' + tabName)?.classList.add('active');

  // For admin tab — use the special admin panel toggle
  if (tabName === 'admin') {
    switchAdminTab('profiles');
    return;
  }

  // Lazy-load tab HTML if not already loaded
  if (!loadedTabs[tabName]) {
    try {
      const res = await fetch(`tabs/tab-${tabName}.html`);
      const html = await res.text();
      const container = document.getElementById('tabs-container');
      container.insertAdjacentHTML('beforeend', html);
      loadedTabs[tabName] = true;
    } catch(e) {
      console.error(`Failed to load tab: ${tabName}`, e);
      return;
    }
  }

  // Show the tab
  const page = document.getElementById('page-' + tabName);
  if (page) page.classList.add('active');
}

// ── ADMIN TAB SWITCHER ──
function switchAdminTab(tab, btn) {
  if (!currentUser || !currentUser.isAdmin) return;

  // Show admin page
  document.querySelectorAll('.tab-page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

  const adminPage = document.getElementById('page-admin');
  if (adminPage) {
    adminPage.classList.add('active');
    adminPage.classList.add('admin-page-active');
  }

  const adminTabBtn = document.getElementById('tab-admin');
  if (adminTabBtn) adminTabBtn.classList.add('active');

  // Hide all admin sub-sections
  const sections = ['admin-overview','admin-attendance','admin-weekly','admin-monthly',
    'admin-stats','admin-profiles','admin-coaching','admin-monitoring','admin-rebuttal','admin-weekperf'];
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  // Deactivate all adm-tabs
  document.querySelectorAll('.adm-tab').forEach(t => t.classList.remove('active'));

  // Activate selected sub-tab button
  const tabEl = document.getElementById('atab-' + tab);
  if (tabEl) tabEl.classList.add('active');
  else if (btn) btn.classList.add('active');

  // Show selected section
  const targetEl = document.getElementById('admin-' + tab);
  if (targetEl) targetEl.style.display = '';

  // Load data for the selected tab
  if (tab === 'overview')    { if(typeof loadAdminOverview    === 'function') loadAdminOverview(); }
  if (tab === 'attendance')  { if(typeof loadAdminAttendance  === 'function') loadAdminAttendance(); }
  if (tab === 'weekly')      { if(typeof loadWeeklyAttendance === 'function') loadWeeklyAttendance('BB'); }
  if (tab === 'monthly')     { if(typeof loadMonthlyAttendance === 'function') loadMonthlyAttendance(); }
  if (tab === 'coaching')    { if(typeof loadCoachingNotes    === 'function') loadCoachingNotes(); }
  if (tab === 'monitoring')  { if(typeof loadMonitoringNotes  === 'function') loadMonitoringNotes(); }
  if (tab === 'rebuttal')    { if(typeof loadRebuttalIntel    === 'function') loadRebuttalIntel(); }
  if (tab === 'weekperf')    { if(typeof loadWeeklyPerformance === 'function') loadWeeklyPerformance(); }
  if (tab === 'stats')       { if(typeof loadReportHistory    === 'function') loadReportHistory(); }
  if (tab === 'profiles')    { if(typeof loadAgentProfiles    === 'function') loadAgentProfiles(); }
}

// ── SHOW ADMIN UI ──
function showAdminUI(){
  document.body.classList.add('is-admin');

  // Start roster polling for admin
  startRosterPolling();

  // Auto-open admin panel
  const adminPage = document.getElementById('page-admin');
  if (adminPage) {
    document.querySelectorAll('.tab-page').forEach(p => p.classList.remove('active'));
    adminPage.classList.add('active');
    adminPage.classList.add('admin-page-active');
  }

  const adminTabBtn = document.getElementById('tab-admin');
  if (adminTabBtn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    adminTabBtn.classList.add('active');
  }

  // Load default admin sub-tab (profiles)
  switchAdminTab('profiles');
}

// ── INIT — runs on dashboard show ──
function init(){
  loadScript('intro');
  loadObjection('not_interested');
  startClocks();
  const pw=['FIXED-RATE','5.49% APR','SOFT CREDIT CHECK','LENDING SPECIALIST','LIMITED TIME','LOAN AMOUNTS','MONTHLY PAYMENTS','ELIGIBILITY','LENDING PARTNER NETWORK','PRE-QUALIFICATION'];
  const el=document.getElementById('punch-words');
  if(el) el.innerHTML=pw.map(w=>`<div style="background:var(--purple-light);border:1.5px solid #c4b5fd;border-radius:7px;padding:7px;text-align:center;font-size:0.58rem;font-weight:800;color:var(--purple);">${w}</div>`).join('');
}

// Make globally accessible
window.switchTab       = switchTab;
window.switchAdminTab  = switchAdminTab;
window.showAdminUI     = showAdminUI;
window.init            = init;
