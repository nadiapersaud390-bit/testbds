# r5 User Management verification

- JS syntax: checked with `node --check` after extracting all inline scripts.
- Browser UI tested in a headless Chromium harness with **mock Firestore** and fake password-hash implementation. Neither production Firebase accounts nor live data were touched.
- `@0000` unconverted placeholder displays a **Convert @0000 to Managed Admin** button.
- Conversion form locks the account name to `0000` and records the selected 14 assignable sub-tabs in the mock Firestore document.
- Successful conversion displays the initial password in a one-time modal and clears its value after closing.
- An ordinary username can be created using **Create New Admin**. The generator returns a 20-character password, and the saved mock Firestore record does not contain a plaintext password property.
- Converted `0000` account appears as a normal account after the mock snapshot is refreshed; **Manage Access** opens its 16-sub-tab popup.
- Password reset shows the newly saved value once; a session-version increment invalidates old managed sessions on the next live update (code path inspected, not proven against a real Firebase server).
- Real Firebase permission rules, Firebase Auth security, backend password hashing, live transaction authorization, and propagation to live sessions remain unverified and are outside this ZIP.

---

# Verification · 15 October 2026 · r4

## Chatroom Team Access update: passed in isolated Chromium

- All three inline JavaScript blocks passed Node.js `--check`.
- Rose's User Management panel displays three independently configurable checkbox options: Berbice, Providence (PR), and Remote.
- Initial configured mock state gives BB and PR chatroom access, with Remote not allowed.
- Changing PR in the Rose controls wrote the expected `PR:false` to the mocked Firestore transaction, leaving other team flags unaffected.
- Disabled PR or Remote users did not see the Access Needed tab or floating Chat button; `switchTab('access-chat')` did not open the chatroom.
- A currently allowed Berbice agent could enter the chat; a subsequent live team disable hid the controls, changed back to Script, unsubscribed the chat listener, and cleared cached chat messages.
- Team changes and a subsequent permission enable refreshed visibility without restarting the dashboard.
- A simulated settings read error prevented agent chat access while retaining administrator access and surfacing an error on Rose's management screen.
- The real `accessStartChat()` implementation short-circuited before touching Firestore when the account was not allowed to use chat.
- At a 390px viewport there was no horizontal document overflow.

## Administrator permissions popup: regression passed

- Existing administrator search and list, 16-tab popup, 14 selectable permissions, Rose-only protections, Allow All/Hide All, per-admin Save Access update payload, and 390px layout checks passed again.
- The time-off workflow's earlier integration tests were not rerun as part of this chat access change.

## Verification limitations

- Tests used mocked Firestore results, not the user's production database or deployed Security Rules.
- Inline Firestore permission checks rely on the inherited client-side authentication and are **not server-enforced data access controls**.
- Real authentication, cross-client synchronization in production, live data access, and write permissions for `app_settings/chatroom_access` still need testing after deployment.
- No live deployment, Firestore Security Rules changes, or Firebase database mutations were performed.
