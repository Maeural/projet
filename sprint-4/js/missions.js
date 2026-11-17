/**
 * js/missions.js - Gestion des missions de ramassage (US-04, 05, 06, 08, 09, 10)
 */

function renderMissions() {
  const container = document.getElementById('missions-container');
  if (!container) return;

  // Prise en compte d'un filtre transmis depuis la carte
  const pendingZone = localStorage.getItem('ric_filter_zone_pending');
  const zoneSelect = document.getElementById('filter-zone');
  if (pendingZone && zoneSelect) {
    zoneSelect.value = pendingZone;
    localStorage.removeItem('ric_filter_zone_pending');
  }

  const searchQuery = (document.getElementById('filter-search')?.value || '').toLowerCase();
  const zoneFilter = document.getElementById('filter-zone')?.value || 'all';
  const typeFilter = document.getElementById('filter-type')?.value || 'all';

  const currentPersona = appState.personas[appState.currentPersona];
  const isMarc = appState.currentPersona === 'marc';

  const filtered = appState.missions.filter(m => {
    const matchSearch = m.title.toLowerCase().includes(searchQuery) || m.zone.toLowerCase().includes(searchQuery) || m.security.toLowerCase().includes(searchQuery);
    const matchZone = zoneFilter === 'all' || m.zone.toLowerCase().includes(zoneFilter.toLowerCase());
    const matchType = typeFilter === 'all' || m.type === typeFilter;
    return matchSearch && matchZone && matchType;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:32px; background:white; border-radius:12px; border:1px solid #e2e8f0; color:#64748b;">
        <p>🔍 Aucune mission ne correspond à vos filtres de recherche.</p>
        <button class="btn btn-secondary btn-sm" style="margin-top:10px;" onclick="resetMissionFilters()">Réinitialiser les filtres</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(m => {
    const isRegistered = currentPersona.registeredMissionIds.includes(m.id);
    const spotsLeft = m.capacity - m.registered.length;
    const isFull = spotsLeft <= 0;
    const isCancelled = m.status === 'cancelled';

    return `
      <div class="mission-card ${isCancelled ? 'cancelled' : ''}">
        <div>
          <div class="mission-header">
            <span class="mission-tag">${m.type}</span>
            <span class="mission-spots-pill ${isFull ? 'spots-full' : 'spots-open'}">
              ${isCancelled ? 'Annulée' : (isFull ? 'Complet' : `${spotsLeft} place${spotsLeft > 1 ? 's' : ''} restante${spotsLeft > 1 ? 's' : ''}`)}
            </span>
          </div>

          <h3 class="mission-title">${m.title}</h3>

          <div class="mission-info-row">
            <span>📍</span> <strong>${m.zone}</strong>
          </div>
          <div class="mission-info-row">
            <span>🗓️</span> ${m.date} • ${m.time}
          </div>
          <div class="mission-info-row">
            <span>👤</span> Organisé par : <strong>${m.organizer}</strong>
          </div>
          <div class="mission-info-row">
            <span>⚖️</span> Réf. Impact : <em>${m.referent}</em>
          </div>

          <div style="background:#f8fafc; padding:8px; border-radius:6px; font-size:0.75rem; color:#475569; margin:8px 0;">
            <strong>🦺 Sécurité :</strong> ${m.security}
          </div>
        </div>

        <div class="mission-footer">
          <!-- GESTION MARC (ORGANISATEUR - US-08, 09, 10) -->
          ${isMarc ? `
            <div style="display:flex; gap:6px; width:100%; justify-content:space-between; flex-wrap:wrap;">
              <button class="btn btn-secondary btn-sm" onclick="openParticipantsModal('${m.id}')">
                👥 Inscrits (${m.registered.length})
              </button>
              ${!isCancelled ? `
                <button class="btn btn-danger btn-sm" onclick="cancelMission('${m.id}')" title="Annuler la mission">
                  ❌ Annuler
                </button>
              ` : `
                <span style="font-size:0.75rem; color:#dc2626; font-weight:700;">Mission Annulée</span>
              `}
            </div>
          ` : `
            <!-- GESTION LÉA / BÉNÉVOLE (US-06) -->
            ${appState.currentPersona === 'visiteur' ? `
              <button class="btn btn-secondary btn-sm" style="width:100%;" onclick="promptLoginForAction()">
                🔒 Se connecter pour s'inscrire
              </button>
            ` : (
              isCancelled ? `
                <button class="btn btn-secondary btn-sm" disabled style="width:100%;">
                  Mission annulée
                </button>
              ` : (
                isRegistered ? `
                  <button class="btn btn-danger btn-sm" style="width:100%;" onclick="toggleMissionRegistration('${m.id}')">
                    ✓ Inscrit(e) — Se désinscrire
                  </button>
                ` : `
                  <button class="btn btn-primary btn-sm" style="width:100%;" ${isFull ? 'disabled' : ''} onclick="toggleMissionRegistration('${m.id}')">
                    ${isFull ? 'Mission complète' : 'S\'inscrire à la mission'}
                  </button>
                `
              )
            )}
          `}
        </div>
      </div>
    `;
  }).join('');
}

function filterMissionsByZone(zoneName) {
  localStorage.setItem('ric_filter_zone_pending', zoneName);
  if (!window.location.pathname.endsWith('missions.html')) {
    window.location.href = 'missions.html';
  } else {
    const select = document.getElementById('filter-zone');
    if (select) {
      select.value = zoneName;
      renderMissions();
    }
  }
}

function resetMissionFilters() {
  const search = document.getElementById('filter-search');
  const zone = document.getElementById('filter-zone');
  const type = document.getElementById('filter-type');
  if (search) search.value = '';
  if (zone) zone.value = 'all';
  if (type) type.value = 'all';
  renderMissions();
}

function toggleMissionRegistration(missionId) {
  const currentPersona = appState.personas[appState.currentPersona];
  const mission = appState.missions.find(m => m.id === missionId);
  if (!mission) return;

  const idx = currentPersona.registeredMissionIds.indexOf(missionId);
  if (idx !== -1) {
    // Désinscription
    currentPersona.registeredMissionIds.splice(idx, 1);
    const participantIdx = mission.registered.indexOf(currentPersona.name);
    if (participantIdx !== -1) mission.registered.splice(participantIdx, 1);
    showToast(`Désinscription prise en compte pour "${mission.title}"`, 'info');
  } else {
    // Inscription
    if (mission.registered.length >= mission.capacity) {
      showToast('Cette mission est complète !', 'warning');
      return;
    }
    currentPersona.registeredMissionIds.push(missionId);
    mission.registered.push(currentPersona.name);
    
    // Débloque badge esprit d'équipe
    unlockBadge('badge_esprit_equipe', currentPersona.id);
    showToast(`Bravo ! Inscription confirmée pour "${mission.title}"`, 'success');
  }

  saveState();
  renderMissions();
  renderProfile();
}

function cancelMission(missionId) {
  const mission = appState.missions.find(m => m.id === missionId);
  if (!mission) return;

  if (confirm(`Confirmez-vous l'annulation de la mission "${mission.title}" ? Les participants verront la mention Annulée.`)) {
    mission.status = 'cancelled';
    saveState();
    renderMissions();
    showToast(`La mission "${mission.title}" a été annulée.`, 'warning');
  }
}

function openParticipantsModal(missionId) {
  const mission = appState.missions.find(m => m.id === missionId);
  if (!mission) return;

  const modal = document.getElementById('modal-participants-list');
  const title = document.getElementById('participants-modal-title');
  const content = document.getElementById('participants-modal-content');

  title.textContent = `👥 Inscrits : ${mission.title}`;
  content.innerHTML = `
    <div style="margin-bottom:12px; font-size:0.85rem; color:#475569;">
      Total inscrits : <strong>${mission.registered.length} / ${mission.capacity} places</strong>
    </div>
    <ul style="list-style:none; display:flex; flex-direction:column; gap:8px;">
      ${mission.registered.map(p => `
        <li style="background:#f8fafc; padding:8px 12px; border-radius:6px; border:1px solid #e2e8f0; display:flex; justify-content:space-between; align-items:center;">
          <span>👤 <strong>${p}</strong></span>
          <span style="font-size:0.75rem; color:#10b981; font-weight:700;">Inscrit(e)</span>
        </li>
      `).join('')}
    </ul>
  `;

  modal.classList.add('open');
}

function handleCreateMissionSubmit(e) {
  e.preventDefault();
  const title = document.getElementById('mission-title').value;
  const zone = document.getElementById('mission-zone').value;
  const date = document.getElementById('mission-date').value;
  const time = document.getElementById('mission-time').value;
  const capacity = parseInt(document.getElementById('mission-capacity').value, 10);
  const level = document.getElementById('mission-level').value;
  const security = document.getElementById('mission-security').value;

  const newMission = {
    id: 'm-' + Date.now(),
    title: title,
    zone: zone,
    date: date,
    time: time,
    duration: '2h30',
    organizer: 'Marc Le Goff',
    organizerId: 'marc',
    referent: 'Sofia Berthelot',
    level: level,
    capacity: capacity,
    registered: ['Marc Le Goff'],
    security: security,
    type: 'Nettoyage estran',
    status: 'open'
  };

  appState.missions.unshift(newMission);
  saveState();
  closeAllModals();
  renderMissions();
  showToast(`✅ Nouvelle mission "${title}" créée avec succès par Marc !`, 'success');
}
