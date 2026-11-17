/**
 * js/profile.js - Profil d'engagement personnel, calcul des points et badges virtuels (US-14, 15, 16)
 */

function unlockBadge(badgeId, personaId) {
  const persona = appState.personas[personaId];
  if (!persona) return;

  if (!persona.badges.includes(badgeId)) {
    persona.badges.push(badgeId);
    saveState();
    showToast(`🏅 Félicitations ${persona.name} ! Vous avez débloqué un nouveau badge !`, 'success');
  }
}

function renderProfile() {
  const currentPersona = appState.personas[appState.currentPersona];
  if (!currentPersona) return;

  const elName = document.getElementById('profile-user-name');
  const elRole = document.getElementById('profile-role-tag');
  const elSub = document.getElementById('profile-subtitle');
  const elAvatar = document.getElementById('profile-avatar-letter');
  const elLevel = document.getElementById('profile-level');
  const elPoints = document.getElementById('profile-points');
  const elKg = document.getElementById('profile-kg');
  const elKgValid = document.getElementById('profile-kg-valid');
  const elKgPending = document.getElementById('profile-kg-pending');
  const elMissions = document.getElementById('profile-missions-done');

  if (elName) elName.textContent = currentPersona.name;
  if (elRole) elRole.textContent = currentPersona.role;
  if (elSub) elSub.textContent = currentPersona.subtitle;
  if (elAvatar) elAvatar.textContent = currentPersona.avatar;
  if (elLevel) elLevel.textContent = currentPersona.level;
  if (elPoints) elPoints.textContent = `${currentPersona.points} pts`;
  if (elKg) elKg.textContent = `${currentPersona.kgValid + currentPersona.kgPending} kg`;
  if (elKgValid) elKgValid.textContent = `${currentPersona.kgValid} kg validés`;
  if (elKgPending) elKgPending.textContent = `${currentPersona.kgPending} kg en attente`;
  if (elMissions) elMissions.textContent = `${currentPersona.missionsDone} sorties (${currentPersona.hours})`;

  // Rendu des badges (US-16)
  const badgesContainer = document.getElementById('badges-container');
  if (badgesContainer) {
    badgesContainer.innerHTML = appState.allBadges.map(b => {
      const isUnlocked = currentPersona.badges.includes(b.id);
      return `
        <div class="badge-tile ${isUnlocked ? 'unlocked' : 'locked'}">
          <div class="badge-icon-circ">${b.icon}</div>
          <div class="badge-name">${b.name}</div>
          <div class="badge-desc">${b.desc}</div>
          <div class="badge-date">
            ${isUnlocked ? '✓ Obtenu' : '🔒 À débloquer'}
          </div>
          ${isUnlocked ? `
            <button class="btn btn-secondary btn-sm" style="margin-top:8px; font-size:0.68rem;" onclick="shareBadge('${b.name}')">
              Partager 🔗
            </button>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  // Historique des actions
  const historyList = document.getElementById('profile-history-list');
  if (historyList) {
    if (!currentPersona.history || currentPersona.history.length === 0) {
      historyList.innerHTML = `<p style="font-size:0.82rem; color:#94a3b8; font-style:italic;">Aucune déclaration précédente enregistrée.</p>`;
    } else {
      historyList.innerHTML = `
        <ul style="list-style:none; display:flex; flex-direction:column; gap:8px;">
          ${currentPersona.history.map(h => `
            <li style="background:#f8fafc; padding:10px 14px; border-radius:6px; border:1px solid #e2e8f0; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong>${h.zone}</strong> — <span style="font-size:0.8rem; color:#64748b;">${h.date}</span>
                <div style="font-size:0.75rem; color:#334155;">${h.note}</div>
              </div>
              <div style="text-align:right;">
                <span style="font-weight:700; color:#10b981;">+${h.kg} kg</span>
                <div style="font-size:0.72rem; color:#0284c7; text-transform:uppercase;">${h.status}</div>
              </div>
            </li>
          `).join('')}
        </ul>
      `;
    }
  }
}

function shareBadge(badgeName) {
  showToast(`🔗 Lien de partage généré : "Fier(e) d'avoir obtenu le badge ${badgeName} pour la sauvegarde de la Rade de Brest avec RIC !"`, 'info');
}
