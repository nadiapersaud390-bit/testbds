# BDS LOAN CR DASHBOARD — File Structure

## Folder Structure

```
bds-dashboard/
├── index.html              ← Shell: head, CSS/JS imports, nav, modals, tab containers
├── css/
│   └── styles.css          ← All CSS
├── js/
│   ├── firebase-config.js  ← Firebase init
│   ├── data-script.js      ← S{} object — SCRIPT tab step content
│   ├── data-objections.js  ← OBJ{} object — REBUTTALS tab content
│   ├── app-core.js         ← Login, auth, clocks, roster sync, showDashboard
│   ├── tabs.js             ← switchTab, loadScript, loadObjection
│   ├── admin.js            ← Admin panel logic + admin sub-tab loader
│   ├── stats.js            ← CSV import, stats table
│   ├── rep-profile.js      ← Agent profile panel + agent sub-tab loader
│   └── rebuttal-insights.js ← RI analytics, fraud detection, signals
├── tabs/                   ← One HTML file per main tab
│   ├── tab-admin.html      ← Admin nav bar only (sub-tabs load from admin/)
│   ├── tab-script.html
│   ├── tab-objections.html
│   ├── tab-dispo.html
│   ├── tab-tips.html
│   ├── tab-asep.html
│   ├── tab-spanish.html
│   ├── tab-sunday.html
│   ├── tab-dbs.html
│   └── tab-lenders.html
├── admin/                  ← One HTML file per Admin Panel sub-tab
│   ├── overview.html       ← ⚡ Daily Overview
│   ├── attendance.html     ← 📅 Daily Attendance
│   ├── weekly.html         ← 📋 Weekly Attendance
│   ├── monthly.html        ← 📆 Monthly Attendance
│   ├── stats.html          ← 📊 Agent Stats
│   ├── profiles.html       ← 👤 Agent Profiles
│   ├── coaching.html       ← 📝 Coaching Notes
│   ├── monitoring.html     ← 🎧 Live Monitoring
│   ├── rebuttal.html       ← 🧠 Rebuttal Intel
│   └── weekperf.html       ← 🏆 Weekly Performance
└── agent/                  ← One HTML file per Agent Profile sub-tab
    ├── overview.html       ← 📊 Overview
    ├── attendance.html     ← 📅 Attendance
    ├── coaching.html       ← 📝 Coaching
    ├── monitoring.html     ← 🎧 Monitoring
    ├── schedule.html       ← ⏰ Schedule
    ├── audit.html          ← 🔍 Login History
    ├── stats.html          ← 📈 Stats History
    └── rebuttal.html       ← 🧠 Rebuttal Usage
```

## How Loading Works

### Main tabs (tabs/)
`switchTab(name)` in `js/tabs.js` calls `window.loadTab(name)` which fetches
`tabs/tab-{name}.html` once on first click and injects it into `<div id="page-{name}">`.

### Admin sub-tabs (admin/)
`switchAdminTab(name)` in `js/admin.js` calls `loadAdminSection(name)` which fetches
`admin/{name}.html` once on first click and injects it into `<div id="admin-{name}">`.

### Agent profile sub-tabs (agent/)
`apTab(name)` in `js/rep-profile.js` calls `loadAgentSection(name)` which fetches
`agent/{name}.html` once on first click and injects it into `<div id="ap-{name}">`.

> **Important:** All loading uses `fetch()` — files must be served from a web server.
> GitHub Pages works perfectly. To test locally: run `npx serve .` in this folder.

## Adding a New Main Tab
1. Add button in `index.html` nav
2. Add empty container: `<div class="tab-page" id="page-{name}"></div>`
3. Add entry to `TAB_FILES` map in `index.html`
4. Create `tabs/tab-{name}.html`
5. Add button styling in `css/styles.css` if needed

## Adding a New Admin Sub-tab
1. Add button in `tabs/tab-admin.html` nav
2. Add empty container: `<div id="admin-{name}" class="admin-section" style="display:none;"></div>`
3. Create `admin/{name}.html`
4. Add the tab name to the list in `switchAdminTab()` inside `js/admin.js`

## Adding a New Agent Profile Sub-tab
1. Add button in `index.html` agent panel nav
2. Add empty container: `<div id="ap-{name}" style="display:none;"></div>`
3. Create `agent/{name}.html`
4. Add the tab name to the list in `_activateAgentTab()` inside `js/rep-profile.js`

## Adding New Script Steps
Edit `js/data-script.js` — add a new key to the `S` object.

## Adding New Rebuttals
Edit `js/data-objections.js` — add a new key to the `OBJ` object.
Then add the sub-tab button in `tabs/tab-objections.html`.

## Deploying to GitHub Pages
Push the entire folder to your repo. In Settings → Pages, set source to your branch / root.
