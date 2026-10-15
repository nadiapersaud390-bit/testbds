# R9 Verification Notes

Checked on 15 October 2026 using headless Chromium with mocked Firestore transactions and collections, without accessing production.

- All inline JavaScript blocks pass `node --check`.
- U.S. federal holidays for October 2026, observed Christmas date in 2027, including computed floating holidays.
- Birthdays recur annually, render on calendar, filter by team, and issue day-before/day-of reminders.
- Approved time-off reminders, pending-request attention items, and admin-only reminder access.
- Rose's team availability settings remain on the existing `app_settings/time_off_access` path.
- Manual time-off creation form shows the correct fields for different request types and writes approved request records to mocked Firestore in one transaction with the day ledger.
- Birthday create and delete actions write to mocked Firestore transactions; edit form loads the current birthday.
- Calendar permission revocation cleans up birthday listener and closes reminder popups and lists.
- Desktop and narrow mobile layout screenshots inspected; mobile calendar can be swiped horizontally.

**Not tested:** Live production Firestore access rules, live authentication, real browser push background notifications, or production deployment. Those require verification by the site owner in their Firebase project.
