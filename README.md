# BDS Dashboard R9: Team Calendar, Time Off, Birthdays & U.S. Federal Holidays

Date: 15 October 2026

## Installation

1. Back up the live dashboard's `index.html`.
2. Replace it with the `testbds-main/index.html` supplied here.
3. In Firebase Firestore, edit the document **`settings/app_version`**, field **`v`** to exactly:

   `2026-10-15-calendar-timeoff-birthdays-us-holidays-r9`

4. Confirm the site's Firestore rules authorize **`calendar_birthdays`** access for calendar-authorized admins. The website code cannot change server-side Firestore rules. The new collection is initially empty and is filled as birthdays are saved.
5. Sign in as Rose, go to **Admin Panel > Time-off Calendar**, and configure the **TEAM REQUEST ACCESS** switches for Berbice, Providence (PR) and Remote. Existing values under User Management are reused.
6. Grant the **Admin Panel** main tab and **Time-off Calendar** Admin Panel sub-tab to every administrator who should see calendar entries and reminders.

No changes were made to your live website or production Firestore database. The ZIP is deployment-ready source code, not a live deployment.

## What changed

- **Calendar time-off entries:** Calendar-authorized admins can click **ADD TIME-OFF REQUEST**, choose an active roster agent, select a request type, date and applicable time fields, enter a reason, and save as pending or immediately approved. Entries use the existing `time_off_requests` and `time_off_days` Firestore collections, and reject overlap with existing pending/approved entries.
- **Agents continue to submit and reply:** Existing agent Request Time Off, My Requests, approve/decline, mandatory decline explanation and calendar history are preserved.
- **Team request access:** Rose can enable/disable the agent request feature separately for Berbice, PR and Remote in the calendar or User Management. Turning it off prevents NEW agent submissions but preserves old requests, decisions and visibility of My Requests. Other calendar-authorized admins can see the status, not edit it.
- **Birthdays:** Calendar-authorized admins can create, edit or delete repeating birthdays. Stored in `calendar_birthdays` in Firestore with name, original birthday and team (`ALL`, `BB`, `PR`, `REMOTE`). They appear every year on their month/day. February 29 birthdays appear in leap years only. Saved birthdays are visible to calendar-authorized admins, and the team filter applies to the birthday list and event cards.
- **U.S. federal holidays:** Computed locally for the displayed year, no internet or manual uploads needed. Includes New Year's Day, MLK Day, Washington's Birthday, Memorial Day, Juneteenth, Independence Day, Labor Day, Columbus Day, Veterans Day, Thanksgiving Day, Christmas Day and standard Friday/Monday observed dates. Holidays appear regardless of team filter. This is the standard nationwide schedule; special local federal employee holidays (such as certain DC-only Inauguration Day observances) are not included.
- **Calendar reminders:** Admins with both Admin Panel main-tab and Time-off Calendar sub-tab access can see reminders for pending time-off approvals, approved time off tomorrow/today, birthdays tomorrow/today, and U.S. federal holidays tomorrow/today. Reminders display within the site and may be dismissed individually for the day; dismissal does not delete calendar records. They appear only while the dashboard is open and signed in, not as background push messages.
- **Revoked access:** Removing either required tab permission stops birthday Firestore subscriptions, hides calendar reminders and blocks in-app calendar actions when the permission update reaches the admin's dashboard.
- **Earlier work retained:** R8 Access Needed voice notification restrictions, R7 main-tab permissions, admin management, password controls, and team chatroom switches remain in the site source.

## Firestore data and security

- New Firestore collection: **`calendar_birthdays`** (new documents with `name`, `date` as `YYYY-MM-DD`, `team`, and audit metadata).
- Existing collections reused: **`time_off_requests`**, **`time_off_days`**, **`app_settings/time_off_access`**, **`admin_accounts`**, **`roster`**.
- Browser-side UI permissions alone do not secure the Firestore database. The existing app uses anonymous Firebase Authentication and browser-side administrator password checks; this does NOT enforce roles against a malicious direct Firebase client. A separate Firebase Auth/backend and Firestore Rules upgrade is needed for server-enforced confidentiality of time off, birthdays, permissions, and admin writes. Do not treat the calendar authorization controls as a substitute for those rules.
- If calendar birthday operations report a Firebase permissions error, review the project's Firestore security rules. Do not loosen public write access merely to make the button work.

## Verification

See `VERIFICATION.md` for local browser tests. Browser tests used a mocked Firestore API and did not write to the production database.
