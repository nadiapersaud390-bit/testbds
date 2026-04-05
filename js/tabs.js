
const loadedTabs = {};

async function switchTab(tabName) {
  document.querySelectorAll('.tab-page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn,.admin-tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + tabName)?.classList.add('active');

  if (!loadedTabs[tabName]) {
    const res = await fetch(`tabs/tab-${tabName}.html`);
    const html = await res.text();
    document.getElementById('tabs-container').insertAdjacentHTML('beforeend', html);
    loadedTabs[tabName] = true;

    // Load tab-specific JS if it exists
    const script = document.createElement('script');
    script.src = `js/${tabName}-tab.js`;
    script.onerror = () => {};
    document.body.appendChild(script);
  }

  document.getElementById('page-' + tabName)?.classList.add('active');

  // If switching to admin, auto-load default admin sub-tab
  if (tabName === 'admin') {
    switchAdminTab('profiles');
  }
}

window.switchTab = switchTab;
