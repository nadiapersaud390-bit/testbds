# Verification · 15 October 2026

The completed dashboard was checked locally with isolated mock Firebase data. No production database records were read or written.

## Passed

- All inline JavaScript syntax and time-off/admin element ID checks.
- 34 workflow integration checks covering request validation, all request types, three teams, overlaps, simultaneous submissions, pending cancellation, approval/decline state checks, required decline reasons, agent replies, team access switches, reminder dates and dismissal, historical calendar entries, admin creation, duplicate usernames, Calendar permissions, password reset session versions and live account disablement.
- Chromium checks using the complete dashboard: submitting a request, approval, live reminders, creating an admin, show/hide password, correct and incorrect password verification, the new administrator's login, restricted Admin Panel navigation and live sign-out when the account is disabled.
- Desktop and 390-pixel mobile layouts inspected. Agent requests and Rose's User Management have no horizontal page overflow.
- No browser page errors in the completed browser run.

## Not verified against the live service

- Existing Firebase security rules and authentication configuration.
- Actual cross-client Firestore transactions, latency, disconnect/reconnect behavior and record permissions.
- Hosting deployment and Firebase app-version document changes.

The mock transaction tests serialize competing operations; they verify the application's conflict-handling logic, not Google's server implementation. The README lists the new day-ledger collection and the inherited authentication limitations.
