# BDS Dashboard · Rose administrator permissions and chatroom team access

Updated: 15 October 2026 · Chatroom team access update (r4)

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
- Select which Admin Panel sub-tabs new administrators can see, including Calendar access.
- See **all Firebase administrator accounts in a searchable list** under Admin Panel → User Management. The built-in numeric legacy administrator is also listed, clearly marked as not manageable from this screen.
- Click **Manage Access** on an administrator to open a popup with **all 16 Admin Panel sub-tabs**. Fourteen are individually assignable. **User Management** and **Missing From Stats** are displayed as permanently Rose-only.
- Check or uncheck tabs to grant or hide them; the popup shows **Allowed / Visible** or **Hidden / No access**, a selected-tab count, **Allow All**, **Hide All**, and **Save Access**. Nothing changes until Save Access succeeds. Each admin's permissions are stored separately in `admin_accounts/{username}.adminTabPermissions`.
- Rose's own row shows her permanent superadmin access, without editable permissions.
- Enable or disable an administrator. Disabling signs out an active session when the live update arrives.
- Set a replacement password. Resetting a password invalidates the administrator's older sessions.
- Show or hide a password while entering or resetting it, including from the selected administrator's access popup. Saved passwords cannot be displayed because the existing application stores only hashes.
- Allow or hide new time-off requests separately for Berbice, Providence and Remote.
- **New:** Under User Management, configure which agent teams can see and use the **Access Needed / Group Chat** with separate Berbice, Providence (PR), and Remote switches.

Turning a team off blocks new submissions and hides the request form. Agents with earlier requests retain **My Requests**. Existing requests, approvals and administrator reminders remain intact.

Passwords must contain 10–128 characters, with no leading or trailing spaces. Usernames begin with a letter, contain 3–32 characters, and may include letters, numbers, periods, underscores and hyphens. Duplicate usernames are rejected. Rose's account is protected from these enable/disable and reset controls. The pre-existing numeric legacy administrator login is listed for visibility, but it is a built-in login, not a manageable Firestore administrator. To place that login under proper permissions control, replace and migrate that legacy authentication path to trusted administrator authentication; merely rendering it in a list is not an access-control change.

## Chatroom team access

Rose can manage **Admin Panel → User Management → Chatroom Team Access**, independently of Admin Panel sub-tab permissions and time-off request access:

- Choose whether **Berbice (BB)**, **Providence (PR)**, and **Remote** agent teams may see or use **Access Needed / Group Chat**. Each team's setting is independent. Administrators, including Rose, always keep chatroom access to assist permitted teams.
- If no chatroom settings document exists yet, **Berbice and Providence start ON** and **Remote starts OFF**. Rose can turn either Berbice or Providence off (or turn Remote on), including choosing one team only.
- A team without chatroom access sees neither the **Access Needed** navigation tab nor the floating **CHAT** button. Clicking a hidden tab through an in-app handler does not open it; in-app sends, deletes and Firestore chat subscriptions also check the current team setting.
- When Rose changes a switch, signed-in dashboards receive the setting via a live listener. When a team's access is revoked, the dashboard closes its chatroom view, stops the chat subscription, clears locally loaded chat messages and badges, and returns to the Script tab. Changes do not delete existing messages from the database.
- Each agent's team comes from their signed-in agent record and is refreshed from the roster listener, so reassignment to another team refreshes visibility. A missing, unrecognized or disabled team is not granted access. An agent's settings listener must have an up-to-date server result; errors and cache-only snapshots hide chatroom access rather than enabling it indiscriminately.
- Existing `access_group_chat` messages remain in **one shared room** visible in the dashboard to all currently enabled teams and admins. This is a **team access switch**, not separate private rooms for Berbice and PR.

**Security boundary:** This implementation changes dashboard behavior only. The inherited Firebase project uses anonymous authentication and unverified Firestore rules. An individual could potentially read or write `access_group_chat` directly outside the dashboard if the existing Firestore Security Rules allow it. Actual confidentiality and server-enforced team authorization require verified Firebase Auth identities, trusted team claims/roster membership, and restrictive Firestore rules or a trusted backend. **Those backend security controls are not supplied or deployed in this ZIP.**

## Uploading this update

1. Keep your current deployed file as a backup.
2. Upload this `index.html` in place of the existing dashboard's `index.html`.
3. In the existing Firebase version document, set `settings/app_version.v` to `2026-10-15-chatroom-team-access-r4` so the dashboard's version check matches the deployed file.
4. Refresh the dashboard. Log in as Rose, open **Admin Panel → User Management**, then select **Manage Access** next to each admin to set its sub-tabs. In the same User Management screen, select which teams can use **Chatroom Team Access**.
5. Verify one test request and decision against your actual Firebase project. Sign in as a test Berbice or PR agent and verify that disabling their team hides both chatroom entry points. Confirm changes propagate to open dashboard sessions.

No live deployment or production database changes were made while preparing this ZIP.

## Firebase data and access requirements

Existing records and settings remain compatible:

- `roster/{agentId}`: agent identity and current team.
- `admin_accounts/{username}`: existing admin login records, `adminTabPermissions`, and the new `sessionVersion` field. Missing session versions default to 0.
- `app_settings/time_off_access`: Boolean `BB`, `PR`, `REMOTE` switches; existing defaults are enabled.
- **New:** `app_settings/chatroom_access`: independent Boolean `BB`, `PR`, `REMOTE` chatroom switches, plus `updatedBy` and `updatedAt`. On a missing document, defaults are BB=true, PR=true, REMOTE=false. A settings read failure hides chat from agents; Rose and other admins retain moderation access.
- `time_off_requests/{requestId}`: requests and decisions.
- **New:** `time_off_days/{agentId}_{date}`: a transaction ledger of active request IDs for overlap checks.

Agent time-off subscriptions query only their own requests. Admin request subscriptions run only when the account has Calendar access. Settings and roster subscriptions continue independently so access changes update live. Chat messages are subscribed to only while the dashboard allows that account access. No composite index is needed by the added queries.

The upload did not include the project's deployed Firestore rules or a trusted backend. The inherited authentication uses anonymous Firebase sessions, browser-side administrator checks and SHA-256 password hashes. Application checks and hidden tabs are not server-side authorization. The inherited password hashing is not a production-grade password storage design. Firebase Auth identities with trusted roles and restrictive rules/backend validation are required to enforce administrator privileges and agent ownership against direct database requests. Do not open database rules merely to resolve a permission error. These backend controls were not changed or verified in this update.

## Verification

- All inline JavaScript syntax checked.
- The previous build's 34 time-off and administrator integration checks are documented in the input package; they were not rerun as part of this user-interface revision.
- The inherited administrator list/popup regression passed again: 16 sub-tabs, 14 editable for a regular admin, Rose-only restrictions, bulk and individual toggles, save payload, and mobile-width layout.
- New isolated Chromium tests passed for Chatroom Team Access: three team switches, independent writes, denied team entry points, direct in-app navigation blocking, team reassignment, chat subscription cleanup and message cache clearing on revoked access, fail-closed settings errors, continued administrator access, and responsive mobile layout.
- Browser validation status and limitations are recorded in `VERIFICATION.md`.

Tests used isolated mock data and never connected to the production Firebase project. Live connectivity, real Firestore Security Rules and cross-client server transaction behavior require verification in the deployed environment.
