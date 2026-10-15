# BDS Dashboard · Time-off requests and Rose administration

Updated: 15 October 2026

This package contains the complete existing dashboard in `index.html`. Its styles and application scripts are included in that file. There is no build step. It uses the existing Firebase project configured in the page.

## Agent requests

The dashboard shows **Request Time Off / My Requests** for enabled teams.

- **Day off:** date only.
- **Late arrival:** date and expected arrival time.
- **Early departure:** date and leaving time.
- **Appointment / Other:** date and a time range, or all day.
- A reason is required. Dates and times use Guyana time.
- Requests start as pending. Agents can see approvals, decline explanations, and send a reply to an admin decision.
- Agents can cancel their own pending requests. Approved requests cannot be cancelled by an agent.
- Missing reasons, invalid or past dates, invalid time ranges and overlapping pending/approved requests are rejected. Non-overlapping late-arrival and early-departure requests can coexist on one date.
- Same-agent/day transactions prevent simultaneous overlapping submissions from this updated build. Previously saved requests are included when checking for conflicts.

Submitting a request does not grant permission to change a work schedule. Agents should wait for an approval.

## Admin calendar

Admins with **Time-off Calendar** access can review all three teams: Berbice, Providence and Remote. The team and month filters apply to the calendar and request list. Pending and approved requests appear on their dates; approved entries remain visible in past months.

Approvals and declines check the current request status inside a transaction. Declining requires an explanation. Requests, decisions, replies and team-access changes update through Firebase listeners.

Approved-request reminders appear the day before and again on the approved date. They are visible throughout the signed-in dashboard, or within the Calendar when it is open. Dismissal affects only that administrator's alerts for that date in that browser. Dismissal does not edit or delete the request or calendar entry. A dismissal the day before does not suppress the approved-date reminder.

Reminders require the dashboard to be open and connected. They are not email, push or background notifications. The date is checked every 30 seconds and when returning to the tab.

## Rose → Admin Panel → User Management

Rose has superadmin controls in the dashboard:

- Create an administrator with a username, display name and password.
- Select which Admin Panel tabs the administrator can see, including Calendar access.
- Review existing Firebase administrator accounts and update their tab access.
- Enable or disable an administrator. Disabling signs out an active session when the live update arrives.
- Set a replacement password. Resetting a password invalidates the administrator's older sessions.
- Show or hide a password while entering or resetting it. Saved passwords cannot be displayed because the existing application stores only hashes.
- Allow or hide new time-off requests separately for Berbice, Providence and Remote.

Turning a team off blocks new submissions and hides the request form. Agents with earlier requests retain **My Requests**. Existing requests, approvals and administrator reminders remain intact.

Passwords must contain 10–128 characters, with no leading or trailing spaces. Usernames begin with a letter, contain 3–32 characters, and may include letters, numbers, periods, underscores and hyphens. Duplicate usernames are rejected. Rose's account is protected from these enable/disable and reset controls. The pre-existing legacy administrator login is not listed as a Firestore account.

## Uploading this update

1. Keep your current deployed file as a backup.
2. Upload this `index.html` in place of the existing dashboard's `index.html`.
3. In the existing Firebase version document, set `settings/app_version.v` to `2026-10-15-timeoff-admin-r2` so the dashboard's version check matches the deployed file.
4. Refresh the dashboard. Log in as Rose to review administrator access and the team switches.
5. Verify one test request and decision against your actual Firebase project.

No live deployment or production database changes were made while preparing this ZIP.

## Firebase data and access requirements

Existing records and settings remain compatible:

- `roster/{agentId}`: agent identity and current team.
- `admin_accounts/{username}`: existing admin login records, `adminTabPermissions`, and the new `sessionVersion` field. Missing session versions default to 0.
- `app_settings/time_off_access`: Boolean `BB`, `PR`, `REMOTE` switches; existing defaults are enabled.
- `time_off_requests/{requestId}`: requests and decisions.
- **New:** `time_off_days/{agentId}_{date}`: a transaction ledger of active request IDs for overlap checks.

Agent subscriptions query only their own requests. Admin request subscriptions run only when the account has Calendar access. Settings and roster subscriptions continue independently so access changes update live. No composite index is needed by the added queries.

The upload did not include the project's deployed Firestore rules or a trusted backend. The inherited authentication uses anonymous Firebase sessions, browser-side administrator checks and SHA-256 password hashes. Application checks and hidden tabs are not server-side authorization. The inherited password hashing is not a production-grade password storage design. Firebase Auth identities with trusted roles and restrictive rules/backend validation are required to enforce administrator privileges and agent ownership against direct database requests. Do not open database rules merely to resolve a permission error. These backend controls were not changed or verified in this update.

## Verification

- All inline JavaScript syntax checked.
- 34 local integration checks passed using an in-memory Firestore adapter, including overlaps, simultaneous submissions, cancellation, approvals, decline reasons, replies, all teams, access switches, reminder dates and dismissal, historical entries, admin creation, duplicate usernames, password reset session versions and live disablement.
- Browser validation status is recorded in `VERIFICATION.md`.

Tests used isolated mock data and never connected to the production Firebase project. Live connectivity, real Firestore Security Rules and cross-client server transaction behavior require verification in the deployed environment.
