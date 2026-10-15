# R7 — Per-administrator MAIN DASHBOARD + ADMIN PANEL permissions (15 October 2026)

## What Rose sees

Under **Admin Panel → User Management**, each administrator's row now displays separate counts and examples of their authorized MAIN DASHBOARD buttons and Admin Panel sub-tabs. Select **MANAGE ACCESS** to open a scrollable two-part checklist. It lists all 13 main buttons from the dashboard navigation and all 16 Admin Panel sub-tabs. The two groups have independent Allow All / Hide All controls. Save Access writes both arrays to `admin_accounts/{username}` in Firestore:

- `dashboardTabPermissions`: main dashboard button keys, including `access-chat` and `admin`.
- `adminTabPermissions`: existing admin sub-tab keys. `users` and `unused` remain reserved for Rose.

The **Create New Admin** / convert `@0000` form also includes these separate permission groups, and saves them on the new account. Prior accounts without `dashboardTabPermissions` keep full main navigation access until Rose sets their access. Rose always retains full access and cannot be restricted from her own management screen.

A disabled MAIN DASHBOARD button is removed from the logged-in admin's navigation. Calling `switchTab` for it is refused, and revoking a currently open tab switches to a permitted tab or shows a no-access message. If `admin` is disabled, `switchAdminTab` cannot be opened through dashboard navigation. If `access-chat` is disabled, the chat button, floating chat, and active chat listener are disabled for that admin. The existing **Chatroom Team Access** (Berbice/PR/Remote agents) stays independent.

## Deployment

Extract the ZIP. Replace the site's `index.html` with `testbds-main/index.html`, and set Firestore document `settings/app_version` field `v` to:

`2026-10-15-admin-main-tab-access-r7`

Back up the current `index.html` first. Do not remove existing Firestore collections or accounts. No production Firebase changes were made while creating this ZIP.

## Important security boundary

Main navigation visibility and client-side tab guards are UX restrictions **only**. This existing version uses anonymous Firebase Authentication, browser-side admin credentials, and browser-side permissions. Firestore Security Rules and server-enforced Firebase Auth/role claims are necessary to protect sensitive data against direct Firestore access or developer-tools bypass. Do not mistake this update for server-side access control.

## Existing features preserved

- Per-admin Admin Panel sub-tab permissions and Rose-only panels
- Administrator creation, `@0000` conversion and password reset
- Passwords of 1–128 characters; password hashes are stored in Firestore and plaintext is shown only when created/reset
- Team chatroom permissions for Berbice/Providence/Remote
- Time-off and all other dashboard views

---

# Custom administrator passwords (15 October 2026, r6)

**Change requested:** Rose can now create a new administrator, convert `@0000`, or reset an admin password with **any non-empty password from 1 to 128 characters**, including `admin`, `1234`, or a password that contains spaces. Previously the browser blocked passwords shorter than 10 characters. Passwords are matched exactly as typed (including spaces) at sign-in. The create-admin and password-reset fields show a **non-blocking warning** for passwords shorter than 10 characters, but allow saving them.

This does **not** store readable passwords in Firestore. The existing implementation stores a SHA-256 digest and displays the selected password **once after the Firestore write succeeds**. Current passwords cannot be recovered from their hashes; reset them to assign a new one. Passwords such as `admin` are easily guessed and should only be used at the account owner's discretion. **The inherited browser-side hash and anonymous Firebase Auth are not production-grade admin security; strong server-side authentication and authorization remain necessary.**

To deploy: back up your currently deployed `index.html`, replace it with the included version, and set Firestore `settings/app_version.v` to `2026-10-15-custom-admin-passwords-r6`. This package is a continuation of r5, including team-chatroom access, admin roster and tab-permission popup, and the `@0000` conversion flow. No live deployment or production Firestore changes have been made.

---

# Administrator creation and legacy-login conversion (2026-10-15, r5)

This package preserves the previous User Management popup, time-off workflows, and team Chatroom Access switches. It adds:

- A visible **+ CREATE NEW ADMIN** action that opens a password-and-permissions form. On successful save, Firestore `admin_accounts/{username}` contains a password **hash**, not a readable password.
- A password generator and **one-time credential window** after successful account creation or password reset. Rose may click SHOW and COPY before closing the window. Previously saved passwords remain unrecoverable.
- An explicit **Convert @0000 to Managed Admin** action. The built-in `0000` password path has been removed from this HTML. Rose must log in with her own account, create the `admin_accounts/0000` document through the conversion flow, choose its permissions, and set a new password. That account is a regular admin, not a superadmin.

**Important deployment impact:** do not publish r5 until you have verified Rose can log in without `@0000`, or you could lose access to User Management. This build does not deploy to Firebase, and it cannot change deployed Firestore Security Rules. The inherited browser-side password system is not production-grade. Firebase Auth identities and server-enforced authorization are required for real security; an old deployed copy of the website could still accept the legacy password.

---

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

- Click the prominent **+ CREATE NEW ADMIN** button to create an administrator with a username, display name and an initial password, then save the account to Firestore. The form also includes a strong-password generator.
- Select which Admin Panel sub-tabs new administrators can see, including Calendar access.
- See **all Firebase administrator accounts in a searchable list** under Admin Panel → User Management. The former numeric @0000 login is shown with a **Convert @0000 to Managed Admin** button until Rose creates its Firestore record. After conversion it becomes a normal editable admin.
- Click **Manage Access** on an administrator to open a popup with **all 16 Admin Panel sub-tabs**. Fourteen are individually assignable. **User Management** and **Missing From Stats** are displayed as permanently Rose-only.
- Check or uncheck tabs to grant or hide them; the popup shows **Allowed / Visible** or **Hidden / No access**, a selected-tab count, **Allow All**, **Hide All**, and **Save Access**. Nothing changes until Save Access succeeds. Each admin's permissions are stored separately in `admin_accounts/{username}.adminTabPermissions`.
- Rose's own row shows her permanent superadmin access, without editable permissions.
- Enable or disable an administrator. Disabling signs out an active session when the live update arrives.
- Set a replacement password. Resetting a password invalidates the administrator's older sessions.
- Show or hide a password while entering or resetting it. After a successful Firestore create or reset, **Rose can show or copy that newly set password once**. The one-time window clears the readable password when closed. Existing passwords cannot be retrieved from saved hashes.
- Allow or hide new time-off requests separately for Berbice, Providence and Remote.
- **New:** Under User Management, configure which agent teams can see and use the **Access Needed / Group Chat** with separate Berbice, Providence (PR), and Remote switches.

Turning a team off blocks new submissions and hides the request form. Agents with earlier requests retain **My Requests**. Existing requests, approvals and administrator reminders remain intact.

Passwords may contain any 1–128 characters (including leading or trailing spaces) and are case-sensitive. Very short passwords are allowed but insecure. New user names begin with a letter, contain 3–32 characters, and may include letters, numbers, periods, underscores and hyphens. The former legacy name `0000` is additionally accepted as a dedicated conversion account. Duplicate usernames are rejected. Rose's account is protected from these enable/disable and reset controls. **Migration change in r5:** The previous built-in `@0000` username/password login is no longer accepted **by this version of the dashboard**. An existing session saved under `authSource: legacy` will be rejected on page reload. To restore `@0000` as a usable login, Rose must first sign in with her existing Rose username, then use **Convert @0000 to Managed Admin**, select the sub-tabs allowed, enter a NEW password, and save it. The result is saved as `admin_accounts/0000` and behaves like any other admin, without superadmin rights. Previous @0000 sessions and the old static password are not carried forward. Earlier copies of the website may still contain the old client-side login; removing the static password from this HTML is not server-side revocation.

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
3. In the existing Firebase version document, set `settings/app_version.v` to `2026-10-15-custom-admin-passwords-r6` so the dashboard's version check matches the deployed file.
4. Refresh the dashboard. Log in as Rose, open **Admin Panel → User Management**, then use **+ CREATE NEW ADMIN** to add admins or **Convert @0000 to Managed Admin** to activate the former numeric login with a NEW password. Select **Manage Access** to set exact sub-tabs, and use the Chatroom Team Access switches to decide which teams see group chat.
5. Verify one test request and decision against your actual Firebase project. Sign in as a test Berbice or PR agent and verify that disabling their team hides both chatroom entry points. Confirm changes propagate to open dashboard sessions.

No live deployment or production database changes were made while preparing this ZIP.

## Firebase data and access requirements

Existing records and settings remain compatible:

- `roster/{agentId}`: agent identity and current team.
- `admin_accounts/{username}`: existing admin login records and any new records created by Rose (including `admin_accounts/0000` after explicit conversion), `adminTabPermissions`, and the `sessionVersion` field. Missing session versions default to 0.
- `app_settings/time_off_access`: Boolean `BB`, `PR`, `REMOTE` switches; existing defaults are enabled.
- **New:** `app_settings/chatroom_access`: independent Boolean `BB`, `PR`, `REMOTE` chatroom switches, plus `updatedBy` and `updatedAt`. On a missing document, defaults are BB=true, PR=true, REMOTE=false. A settings read failure hides chat from agents; Rose and other admins retain moderation access.
- `time_off_requests/{requestId}`: requests and decisions.
- **New:** `time_off_days/{agentId}_{date}`: a transaction ledger of active request IDs for overlap checks.

Agent time-off subscriptions query only their own requests. Admin request subscriptions run only when the account has Calendar access. Settings and roster subscriptions continue independently so access changes update live. Chat messages are subscribed to only while the dashboard allows that account access. No composite index is needed by the added queries.

The upload did not include the project's deployed Firestore rules or a trusted backend. The inherited authentication uses anonymous Firebase sessions, browser-side administrator checks and SHA-256 password hashes. Application checks and hidden tabs are not server-side authorization. The inherited password hashing is not a production-grade password storage design. **Even after this update, these are not Firebase Authentication administrator accounts:** the current website uses anonymous Firebase Auth and browser-side password verification against Firestore. Firestore writes and access checks must be protected by a trusted backend and real user identities before production-grade administrative authorization can be claimed. Firebase Auth identities with trusted roles and restrictive rules/backend validation are required to enforce administrator privileges and agent ownership against direct database requests. Do not open database rules merely to resolve a permission error. These backend controls were not changed or verified in this update.

## Verification

- All inline JavaScript syntax checked.
- The previous build's 34 time-off and administrator integration checks are documented in the input package; they were not rerun as part of this user-interface revision.
- The inherited administrator list/popup regression passed again: 16 sub-tabs, 14 editable for a regular admin, Rose-only restrictions, bulk and individual toggles, save payload, and mobile-width layout.
- New isolated Chromium tests passed for Chatroom Team Access: three team switches, independent writes, denied team entry points, direct in-app navigation blocking, team reassignment, chat subscription cleanup and message cache clearing on revoked access, fail-closed settings errors, continued administrator access, and responsive mobile layout.
- Browser validation status and limitations are recorded in `VERIFICATION.md`.

Tests used isolated mock data and never connected to the production Firebase project. Live connectivity, real Firestore Security Rules and cross-client server transaction behavior require verification in the deployed environment.
