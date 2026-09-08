/*
 * Team Assignment persistence + live movement fix
 * ------------------------------------------------
 * Loaded AFTER the dashboard's main app script.
 *
 * What this fixes:
 * 1) Manual BB/PR assignment is persisted as an explicit Firebase override.
 * 2) Roster reload/polling can no longer silently change that override back
 *    because of a stale GUYB/GUYP prefix or Google Sheet value.
 * 3) The currently-loaded Daily Stats row is moved immediately between teams.
 * 4) Today's attendance/session records are updated immediately.
 * 5) The current Firebase report statsJSON is rewritten so other open admin
 *    sessions receive the move through the existing report listener.
 */
(function () {
  'use strict';

  const teamLabel = (team) => team === 'PR' ? 'Providence (PR)' : 'Berbice (BB)';
  const teamIcon  = (team) => team === 'PR' ? '🌴' : '🏠';

  function canonicalTeam(value) {
    const raw = String(value || '').trim().toUpperCase();
    if (raw === 'PR' || raw.includes('PROVIDENCE') || raw.includes('GUYP')) return 'PR';
    if (raw === 'BB' || raw.includes('BERBICE') || raw.includes('GUYB')) return 'BB';
    return raw;
  }

  function sameAgent(row, id, name) {
    const rowId = String(row && (row.ytelId || row.userId || row.id) || '').trim();
    if (rowId && rowId === String(id || '').trim()) return true;
    const a = String(row && row.name || '').trim().toLowerCase();
    const b = String(name || '').trim().toLowerCase();
    return !!a && !!b && a === b;
  }

  function setStatus(el, text, type) {
    if (!el) return;
    el.textContent = text;
    el.classList.remove('is-saving', 'is-success', 'is-error');
    if (type) el.classList.add(type);
  }

  function updateTeamVisuals(team) {
    const current = document.getElementById('rp-team-current');
    if (current) current.textContent = teamIcon(team) + ' ' + teamLabel(team);

    const badge = document.getElementById('ap-team-badge');
    if (badge) {
      badge.textContent = team;
      badge.title = teamLabel(team);
      badge.style.background = team === 'PR' ? 'rgba(167,139,250,.16)' : 'rgba(59,130,246,.16)';
      badge.style.color = team === 'PR' ? '#c4b5fd' : '#93c5fd';
      badge.style.borderColor = team === 'PR' ? 'rgba(167,139,250,.28)' : 'rgba(59,130,246,.28)';
    }
  }

  async function persistLiveTeamMove(id, name, team) {
    const today = (typeof getTodayGY === 'function') ? getTodayGY() : new Date().toISOString().slice(0, 10);
    const tasks = [];

    // Keep today's operational records aligned with the new assignment.
    try {
      tasks.push(db.collection('attendance').doc(id + '_' + today).set({ team }, { merge: true }));
      tasks.push(db.collection('sessions').doc(id + '_' + today).set({ team }, { merge: true }));
    } catch (_) {}

    // Move the row in the currently loaded report immediately.
    let moved = false;
    try {
      if (typeof statsData !== 'undefined' && Array.isArray(statsData)) {
        statsData.forEach(row => {
          if (sameAgent(row, id, name)) {
            row.team = team;
            row.teamOverride = true;
            moved = true;
          }
        });

        if (moved && typeof statsDataDate !== 'undefined' && statsDataDate) {
          tasks.push(
            db.collection('reports').doc(statsDataDate).set({
              statsJSON: JSON.stringify(statsData),
              teamAssignmentUpdatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true })
          );
        }
      }
    } catch (e) {
      console.warn('[Team Assignment] Live stats move could not be persisted:', e);
    }

    await Promise.allSettled(tasks);
    return moved;
  }

  function refreshTeamViews() {
    const safeCall = (name, ...args) => {
      try {
        const fn = window[name];
        if (typeof fn === 'function') fn(...args);
      } catch (e) {
        console.warn('[Team Assignment] Refresh failed for', name, e);
      }
    };

    safeCall('updateGoalBars');
    safeCall('refreshBreakdownIfOpen');
    safeCall('renderStatsTable');

    const overview = document.getElementById('admin-overview');
    if (overview && overview.style.display !== 'none') safeCall('loadAdminOverview');

    const profiles = document.getElementById('admin-profiles');
    if (profiles && profiles.style.display !== 'none') safeCall('loadAgentProfiles');
  }

  // ---------------------------------------------------------------------------
  // ROSTER RELOAD FIX
  // The original roster logic derives team from GUYB/GUYP and can overwrite a
  // manual change. After every roster load, re-apply explicit Firebase overrides.
  // ---------------------------------------------------------------------------
  if (typeof window.loadRoster === 'function') {
    const originalLoadRoster = window.loadRoster;
    window.loadRoster = async function () {
      const result = await originalLoadRoster.apply(this, arguments);
      try {
        const snap = await db.collection('roster').where('teamOverride', '==', true).get();
        snap.forEach(doc => {
          const data = doc.data() || {};
          const id = String(data.userId || doc.id || '').trim();
          const team = canonicalTeam(data.team);
          if (!id || (team !== 'BB' && team !== 'PR')) return;

          if (typeof ROSTER !== 'undefined' && ROSTER[id]) {
            ROSTER[id].team = team;
            ROSTER[id].teamOverride = true;
          }
        });
      } catch (e) {
        console.warn('[Team Assignment] Could not re-apply Firebase overrides:', e);
      }
      return result;
    };
  }

  // ---------------------------------------------------------------------------
  // CSV TEAM RESOLVER FIX
  // Explicit manual assignment must outrank the CSV GUYB/GUYP prefix.
  // ---------------------------------------------------------------------------
  if (typeof window.resolveAgentTeam === 'function') {
    const originalResolveAgentTeam = window.resolveAgentTeam;
    window.resolveAgentTeam = function (agent) {
      try {
        if (typeof ROSTER !== 'undefined') {
          const id = String(agent && (agent.ytelId || agent.userId || agent.id) || '').trim();
          let rosterMatch = id && ROSTER[id] ? ROSTER[id] : null;

          if (!rosterMatch && agent && agent.name) {
            const targetName = String(agent.name).trim().toLowerCase();
            rosterMatch = Object.values(ROSTER).find(r =>
              r && String(r.name || '').trim().toLowerCase() === targetName
            ) || null;
          }

          if (rosterMatch && rosterMatch.teamOverride === true) {
            const manualTeam = canonicalTeam(rosterMatch.team);
            if (manualTeam === 'BB' || manualTeam === 'PR') return manualTeam;
          }
        }
      } catch (_) {}
      return originalResolveAgentTeam(agent);
    };
  }

  // ---------------------------------------------------------------------------
  // SAVE FIX
  // Keep the original function for shift/lunch/break; replace only team save.
  // ---------------------------------------------------------------------------
  const originalSaveRosterField = (typeof window.saveRosterField === 'function')
    ? window.saveRosterField
    : null;

  window.saveRosterField = async function (field) {
    if (field !== 'team') {
      if (originalSaveRosterField) return originalSaveRosterField.apply(this, arguments);
      return;
    }

    if (typeof currentRepProfile === 'undefined' || !currentRepProfile) return;

    const r = currentRepProfile;
    const input = document.getElementById('rp-team-input');
    const status = document.getElementById('rp-team-status');
    const button = document.querySelector('[data-save-field="team"]') ||
                   (input && input.parentElement ? input.parentElement.querySelector('button') : null);
    const team = canonicalTeam(input ? input.value : '');
    const id = String(r.id || r.userId || '').trim();
    const oldTeam = canonicalTeam(r.team || '');

    if (!id) {
      setStatus(status, 'Agent ID is missing. Team was not changed.', 'is-error');
      return;
    }
    if (team !== 'BB' && team !== 'PR') {
      setStatus(status, 'Select Berbice or Providence first.', 'is-error');
      return;
    }

    if (button) {
      button.disabled = true;
      button.dataset.originalText = button.innerHTML;
      button.innerHTML = '<span class="schedule-btn-spinner"></span> Saving…';
    }
    setStatus(status, 'Saving assignment and moving live records…', 'is-saving');

    try {
      // Firebase is the durable manual override. This is deliberately explicit so
      // future sheet/CSV prefix refreshes cannot silently reverse the assignment.
      await db.collection('roster').doc(id).set({
        userId: id,
        name: r.name || '',
        team,
        teamOverride: true,
        teamOverrideSource: 'admin-profile',
        teamOverrideUpdatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });

      // Keep Google Sheet in sync where the bridge supports it. Firebase still
      // remains authoritative for a manual override if the bridge is temporarily down.
      let sheetSynced = true;
      if (typeof callBridge === 'function') {
        try {
          await callBridge({ action: 'updateRosterField', userId: id, field: 'team', value: team });
        } catch (e) {
          sheetSynced = false;
          console.warn('[Team Assignment] Google Sheet sync failed; Firebase override is saved.', e);
        }
      }

      // Update in-memory roster/profile immediately.
      currentRepProfile.team = team;
      currentRepProfile.teamOverride = true;

      if (typeof ROSTER !== 'undefined') {
        if (!ROSTER[id]) {
          ROSTER[id] = { userId: id, name: r.name || '', team, teamOverride: true };
        } else {
          ROSTER[id].team = team;
          ROSTER[id].teamOverride = true;
        }
      }

      if (typeof currentUser !== 'undefined' && currentUser && String(currentUser.id || '') === id) {
        currentUser.team = team;
        currentUser.teamOverride = true;
      }

      const moved = await persistLiveTeamMove(id, r.name || '', team);
      updateTeamVisuals(team);
      refreshTeamViews();

      const moveText = oldTeam && oldTeam !== team
        ? `${teamIcon(oldTeam)} ${teamLabel(oldTeam)} → ${teamIcon(team)} ${teamLabel(team)}`
        : `${teamIcon(team)} ${teamLabel(team)}`;

      setStatus(
        status,
        `✓ Team saved: ${moveText}${moved ? ' · live stats moved now' : ''}${sheetSynced ? '' : ' · Sheet sync pending'}`,
        'is-success'
      );
    } catch (e) {
      console.error('[Team Assignment] Save failed:', e);
      setStatus(status, 'Could not save the team assignment. Check Firebase permissions/network.', 'is-error');
    } finally {
      if (button) {
        button.disabled = false;
        button.innerHTML = button.dataset.originalText || 'Save changes';
      }
    }
  };

  // Keep the new "Current assignment" line in sync whenever the Schedule tab loads.
  if (typeof window.apLoadSchedule === 'function') {
    const originalApLoadSchedule = window.apLoadSchedule;
    window.apLoadSchedule = function () {
      const result = originalApLoadSchedule.apply(this, arguments);
      try {
        if (typeof currentRepProfile !== 'undefined' && currentRepProfile) {
          updateTeamVisuals(canonicalTeam(currentRepProfile.team));
        }
      } catch (_) {}
      return result;
    };
  }
})();
