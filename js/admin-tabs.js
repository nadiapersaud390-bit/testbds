
const loadedAdminTabs = {};

async function switchAdminTab(tab, btn) {
  // Hide all loaded admin sections
  document.querySelectorAll('.admin-section').forEach(s => s.style.display = 'none');

  // Update active admin sub-tab button
  document.querySelectorAll('.adm-tab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  else document.getElementById('atab-' + tab)?.classList.add('active');

  if (!loadedAdminTabs[tab]) {
    const res = await fetch(`admin/admin-${tab}.html`);
    const html = await res.text();
    document.getElementById('admin-sections-container')
      .insertAdjacentHTML('beforeend', html);
    loadedAdminTabs[tab] = true;

    // Load admin-tab-specific JS if needed
    const script = document.createElement('script');
    script.src = `js/admin-${tab}.js`;
    script.onerror = () => {}; // Silently ignore if no JS file exists
    document.body.appendChild(script);
  }

  document.getElementById('admin-' + tab).style.display = 'block';
}

window.switchAdminTab = switchAdminTab;
