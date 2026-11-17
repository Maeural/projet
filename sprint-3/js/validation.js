/**
 * js/validation.js - Déclaration des récoltes et modération/validation par Sofia (US-11, 12, 13)
 */

function openDeclareModal(preselectedZone = null) {
  if (appState.currentPersona === 'visiteur') {
    promptLoginForAction();
    return;
  }
  const modal = document.getElementById('modal-declare-harvest');
  const selectZone = document.getElementById('declare-zone');
  if (preselectedZone && selectZone) {
    selectZone.value = preselectedZone;
  }
  updateDeclareWeightCalc();
  modal.classList.add('open');
}

function updateDeclareWeightCalc() {
  const bags = parseInt(document.getElementById('declare-bags')?.value || '1', 10);
  const bagSize = parseInt(document.getElementById('declare-bag-size')?.value || '7', 10);
  const total = bags * bagSize;
  const preview = document.getElementById('declare-weight-preview');
  if (preview) {
    preview.textContent = `${total} kg pointillés`;
  }
}

function handleHarvestDeclarationSubmit(e) {
  e.preventDefault();
  const zoneName = document.getElementById('declare-zone').value;
  const bags = parseInt(document.getElementById('declare-bags').value, 10);
  const bagSize = parseInt(document.getElementById('declare-bag-size').value, 10);
  const notes = document.getElementById('declare-notes').value;
  const photoBefore = document.getElementById('declare-photo-before').value;
  const photoAfter = document.getElementById('declare-photo-after').value;

  const calculatedWeight = bags * bagSize;
  const currentPersona = appState.personas[appState.currentPersona];

  const newDeclaration = {
    id: 'dec-' + Date.now(),
    participantName: currentPersona.name,
    participantId: currentPersona.id,
    zoneName: zoneName,
    date: new Date().toLocaleDateString('fr-FR') + ' ' + new Date().toLocaleTimeString('fr-FR', {hour:'2-digit', minute:'2-digit'}),
    bags: bags,
    bagSizeWeight: bagSize,
    calculatedWeight: calculatedWeight,
    status: 'pending',
    notes: notes || 'Ramassage citoyen',
    photoBefore: photoBefore || 'photo_avant.jpg',
    photoAfter: photoAfter || 'photo_apres.jpg'
  };

  appState.declarations.unshift(newDeclaration);

  // Mise à jour de la zone en attente
  const zone = appState.zones.find(z => z.name.toLowerCase().includes(zoneName.toLowerCase()));
  if (zone) {
    zone.kgPending += calculatedWeight;
  }

  // Mise à jour stats utilisateur en attente
  currentPersona.kgPending += calculatedWeight;

  saveState();
  closeAllModals();
  updateGlobalKPIs();
  renderValidationList();
  if (zone) selectZone(zone.id);

  showToast(`🎉 Déclaration enregistrée ! ${calculatedWeight} kg transmis à Sofia pour validation.`, 'success');
}

function updateValidationBadge() {
  const countBadge = document.getElementById('validation-pending-count');
  if (countBadge && appState && appState.declarations) {
    const pendingCount = appState.declarations.filter(d => d.status === 'pending').length;
    countBadge.textContent = pendingCount;
  }
}

function renderValidationList() {
  updateValidationBadge();
  const container = document.getElementById('validation-list-container');
  if (!container) return;

  const pendingDecs = appState.declarations.filter(d => d.status === 'pending');
  if (pendingDecs.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:30px; background:#f8fafc; border-radius:12px; border:1px solid #e2e8f0; color:#64748b;">
        <span style="font-size:2rem;">✅</span>
        <h4 style="margin-top:8px; color:#0f172a;">Toutes les déclarations sont à jour !</h4>
        <p style="font-size:0.85rem; margin-top:4px;">Aucune récolte en attente de validation pour le moment.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = pendingDecs.map(d => `
    <div class="validation-card">
      <div>
        <div style="display:flex; align-items:center; gap:8px;">
          <h4 style="font-size:1.05rem; font-weight:700; color:#0f172a;">${d.zoneName}</h4>
          <span style="background:#fef3c7; color:#b45309; padding:2px 8px; border-radius:999px; font-size:0.72rem; font-weight:700;">En attente de validation</span>
        </div>
        
        <div class="validation-meta">
          <span>👤 Par : <strong>${d.participantName}</strong></span>
          <span>🗓️ Le : ${d.date}</span>
          <span>📦 <strong>${d.bags} sacs</strong> (~${d.calculatedWeight} kg)</span>
        </div>

        <p style="font-size:0.82rem; color:#475569; margin-top:6px; background:#f8fafc; padding:6px 10px; border-radius:6px;">
          💬 <em>"${d.notes}"</em>
        </p>

        <div style="font-size:0.75rem; color:#0284c7; margin-top:6px;">
          📷 Photos fournies : [Avant : ${d.photoBefore || 'Non fournie'}] • [Après : ${d.photoAfter || 'Non fournie'}]
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:6px;">
        <button class="btn btn-success btn-sm" onclick="validateHarvest('${d.id}')">
          ✓ Valider la récolte
        </button>
        <button class="btn btn-secondary btn-sm" onclick="adjustHarvestWeight('${d.id}')">
          ✏️ Corriger poids
        </button>
        <button class="btn btn-danger btn-sm" onclick="rejectHarvest('${d.id}')">
          ✕ Rejeter
        </button>
      </div>
    </div>
  `).join('');
}

// ACTION CLÉ : Validation par Sofia -> La zone passe en VERT sur la carte ! (US-06 / US-12)
function validateHarvest(declarationId) {
  const dec = appState.declarations.find(d => d.id === declarationId);
  if (!dec) return;

  dec.status = 'validated';

  // Mise à jour de la Zone
  const zone = appState.zones.find(z => z.name.toLowerCase().includes(dec.zoneName.toLowerCase()));
  if (zone) {
    zone.kgValid += dec.calculatedWeight;
    zone.kgPending = Math.max(0, zone.kgPending - dec.calculatedWeight);
    zone.actions += 1;
    zone.participants += 1;
    
    // TRANSFORMATION EN VERT : La zone devient "PROPRE" après nettoyage validé !
    zone.status = 'clean';
    zone.statusText = 'Propre';
  }

  // Mise à jour du Participant
  const participant = appState.personas[dec.participantId];
  if (participant) {
    participant.kgValid += dec.calculatedWeight;
    participant.kgPending = Math.max(0, participant.kgPending - dec.calculatedWeight);
    participant.missionsDone += 1;
    participant.points += 50 + (dec.calculatedWeight * 2);

    if (!participant.history) participant.history = [];
    participant.history.unshift({
      date: new Date().toLocaleDateString('fr-FR'),
      zone: dec.zoneName,
      kg: dec.calculatedWeight,
      status: 'validée',
      note: dec.notes
    });
  }

  saveState();
  updateGlobalKPIs();
  renderValidationList();
  renderMapMarkers();
  if (zone) selectZone(zone.id);

  showToast(`🎉 Récolte validée ! La zone "${dec.zoneName}" est passée au VERT sur la carte !`, 'success');
}

function adjustHarvestWeight(declarationId) {
  const dec = appState.declarations.find(d => d.id === declarationId);
  if (!dec) return;

  const current = dec.calculatedWeight;
  const newWeight = prompt(`Ajuster l'estimation du poids pour Sofia (actuel: ${current} kg) :`, current);
  if (newWeight && !isNaN(parseInt(newWeight, 10))) {
    const val = parseInt(newWeight, 10);
    dec.calculatedWeight = val;
    saveState();
    renderValidationList();
    showToast(`Poids ajusté à ${val} kg.`, 'info');
  }
}

function rejectHarvest(declarationId) {
  const dec = appState.declarations.find(d => d.id === declarationId);
  if (!dec) return;

  const motif = prompt('Motif du rejet (ex: signalement abusif, données incohérentes) :');
  if (motif !== null) {
    dec.status = 'rejected';
    dec.notes += ` [Rejeté : ${motif}]`;
    saveState();
    renderValidationList();
    showToast('Déclaration rejetée sans incrémentation des bilans.', 'warning');
  }
}

// Signalement de zone polluée (US-13)
function handleReportSubmit(e) {
  e.preventDefault();
  const sector = document.getElementById('report-sector').value;
  const type = document.getElementById('report-type').value;
  const urgency = document.getElementById('report-urgency').value;
  const desc = document.getElementById('report-desc').value;

  const newZone = {
    id: 'report-' + Date.now(),
    name: sector,
    commune: 'Rade de Brest',
    lat: 48.370 + (Math.random() - 0.5) * 0.05,
    lng: -4.450 + (Math.random() - 0.5) * 0.05,
    status: 'urgent',
    statusText: urgency,
    actions: 0,
    kgValid: 0,
    kgPending: 0,
    participants: 0,
    description: `[Signalement citoyen] : ${desc} (Type: ${type})`,
    safety: 'Zone récemment signalée. Prudence lors de la reconnaissance.',
    photos: ['signalement_recent.jpg'],
    upcomingMissions: []
  };

  appState.zones.push(newZone);

  saveState();
  closeAllModals();
  updateGlobalKPIs();
  renderMapMarkers();
  selectZone(newZone.id);

  showToast(`⚠️ Signalement enregistré ! Le point a été ajouté sur la carte.`, 'success');
}
