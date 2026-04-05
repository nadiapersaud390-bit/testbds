# BDS LOAN CR DASHBOARD — File Structure

## Folder Layout

```
bds-dashboard/
├── index.html                    ← Main shell (head, login, hero, clocks, nav, modals)
├── styles.css                    ← All CSS (merged from both original <style> blocks)
│
├── js/
│   ├── firebase-config.js        ← Firebase init only (apiKey, db, auth)
│   ├── data-script.js            ← Script steps (S={}) + Rebuttal data (OBJ={})
│   └── app.js                    ← All JS functions (~5,000 lines)
│
└── tabs/
    ├── tab-script.html           ← 📋 SCRIPT tab
    ├── tab-objections.html       ← 🎯 REBUTTALS tab
    ├── tab-dispo.html            ← ✅ DISPO tab
    ├── tab-tips.html             ← 💡 TIPS tab
    ├── tab-asep.html             ← ⚙️ A.S.E.P tab
    ├── tab-spanish.html          ← 🇪🇸 SPANISH tab
    ├── tab-sunday.html           ← 📅 SUNDAY PROTOCOL tab
    ├── tab-dbs.html              ← 🔒 ACCESS GUIDE tab
    ├── tab-lenders.html          ← 🤝 LENDERS tab
    │
    └── admin/
        ├── tab-admin-shell.html       ← Admin panel wrapper + sub-tab nav buttons
        ├── tab-admin-profiles.html    ← 👤 Agent Profiles sub-tab
        ├── tab-admin-overview.html    ← ⚡ Daily Overview sub-tab
        ├── tab-admin-attendance.html  ← 📅 Daily Attendance sub-tab
        ├── tab-admin-weekly.html      ← 📋 Weekly Attendance sub-tab
        ├── tab-admin-monthly.html     ← 📆 Monthly Attendance sub-tab
        ├── tab-admin-stats.html       ← 📊 Agent Stats sub-tab
        ├── tab-admin-coaching.html    ← 📝 Coaching sub-tab
        ├── tab-admin-monitoring.html  ← 🎧 Live Monitoring sub-tab
        ├── tab-admin-rebuttal.html    ← 🧠 Rebuttal Intel sub-tab
        └── tab-admin-weekperf.html    ← 🏆 Weekly Performance sub-tab
```

## How it loads

Each tab's HTML is fetched once (lazy-loaded) when the user first clicks it.
The admin panel automatically loads all 10 sub-sections in one go.

⚠️  **GitHub Pages (HTTPS) required.** Does NOT work via `file://`.
For local testing: `python3 -m http.server 8080` → open http://localhost:8080

## Adding a new agent tab

1. Create `tabs/tab-MYNAME.html` with:
   ```html
   <div class="tab-page" id="page-MYNAME">
     <!-- your content -->
   </div>
   ```
2. Add a button in `index.html` inside `.top-tabs`:
   ```html
   <button class="tab-btn tab-span-2" id="tab-MYNAME" onclick="switchTab('MYNAME')">MY TAB</button>
   ```
3. Add an empty container in `index.html` inside `.main`:
   ```html
   <div class="tab-page" id="page-MYNAME"></div>
   ```

## Adding a new admin sub-tab

1. Create `tabs/admin/tab-admin-MYNAME.html`
2. Add a button to `tab-admin-shell.html`
3. Add a section div to `tab-admin-MYNAME.html` with `id="admin-MYNAME"`
4. Add the JS handler in `switchAdminTab()` inside `js/app.js`
