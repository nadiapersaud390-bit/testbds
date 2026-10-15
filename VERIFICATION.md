# Verification · 15 October 2026

## Current popup update: passed

- HTML contains all 16 Admin Panel sub-tab buttons and their matching permission options.
- All inline JavaScript parsed successfully with Node.js syntax validation.
- Isolated Chromium checks used sample administrator objects, with no connection to the live Firebase database.
- All Firebase admin records appear in a searchable list, with the legacy numeric login labeled separately.
- An individual administrator opens in a modal with exactly 16 sub-tabs, 14 assignable checkboxes and two permanently Rose-only disabled checkboxes.
- Existing per-admin selections appear correctly. The list distinguishes active/disabled accounts and shows the number of permitted tabs.
- Allow All, Hide All, single-checkbox toggling, the allowed-tab count, and access-state labels work.
- Save Access passed the selected admin's exact `adminTabPermissions` array to a mocked Firestore account update; closing the modal did not save.
- Permission checks allowed the enabled admin sub-tabs and concealed denied tabs for a simulated non-Rose session.
- Rose's own popup is read-only and shows all 16 tabs enabled.
- Search and Escape-to-close worked. Desktop and 390px mobile popup inspections showed no horizontal page overflow.

## Inherited functionality

The input package reported 34 isolated workflow integration checks and Chromium tests for time-off requests, reminders, create-admin, password reset, and disabled-admin signout. Those original tests were **not** rerun against this revised UI in the current execution environment. The underlying workflow functions were left in place.

## Not verified against the live service

- Existing Firebase security rules, deployed backend or Firebase Authentication configuration.
- Actual Firestore permission writes, cross-client access propagation, transaction latency and account lists from production.
- Hosting deployment and Firebase app-version settings.

The inherited page relies on browser-side role checks and anonymous Firebase sessions; hiding a tab is not server-side access enforcement. The built-in legacy administrator also remains outside the per-account permissions system. The app needs trusted administrator identities and restrictive Firestore rules or server-side enforcement to prevent unauthorized direct database access.
