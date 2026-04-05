# BDS LOAN CR DASHBOARD — File Structure

## How it's organized

```
bds-dashboard/
├── index.html              ← Main shell: head, login, hero, nav, script imports
├── styles.css              ← All CSS (merged from the original two <style> blocks)
│
├── js/
│   ├── firebase-config.js  ← Firebase app init (apiKey, db, auth)
│   ├── data-script.js      ← Script steps (S={}) and Rebuttal data (OBJ={})
│   └── app.js              ← All JavaScript functions (~5,000 lines)
│
└── tabs/
    ├── tab-script.html     ← SCRIPT tab content
    ├── tab-objections.html ← REBUTTALS tab content
    ├── tab-dispo.html      ← DISPO tab content
    ├── tab-tips.html       ← TIPS tab content
    ├── tab-asep.html       ← A.S.E.P tab content
    ├── tab-spanish.html    ← SPANISH tab content
    ├── tab-sunday.html     ← SUNDAY PROTOCOL tab content
    ├── tab-dbs.html        ← ACCESS GUIDE tab content
    ├── tab-lenders.html    ← LENDERS & BENEFITS tab content
    └── tab-admin.html      ← ADMIN PANEL tab content
```

## How tab loading works

Each tab is loaded once via `fetch()` when a user first clicks it.
This is called "lazy loading" — it keeps the initial page fast.

⚠️ **This requires GitHub Pages (HTTPS).** It will NOT work if you
open index.html directly as a local file (file://) — use a local
server like `python3 -m http.server` for local testing.

## Adding a new tab

1. Create `tabs/tab-mynewtab.html` with your tab's content div:
   ```html
   <div class="tab-page" id="page-mynewtab">
     <!-- your content here -->
   </div>
   ```
2. Add a button in `index.html` inside `.top-tabs`:
   ```html
   <button class="tab-btn tab-span-2" id="tab-mynewtab" onclick="switchTab('mynewtab')">MY TAB</button>
   ```
3. Add an empty container in `index.html` inside `#main-content`:
   ```html
   <div id="page-mynewtab" class="tab-page"></div>
   ```
4. Done — the loader picks it up automatically.

## Adding new JS functions

- **New feature functions** → add to `js/app.js`
- **New script/rebuttal data** → add to `js/data-script.js`
- **Firebase config changes** → edit `js/firebase-config.js`

## Local testing

```bash
cd bds-dashboard
python3 -m http.server 8080
# then open http://localhost:8080
```
