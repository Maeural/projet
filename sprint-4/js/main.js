/**
 * js/main.js - Point d'entrée de l'application, initialisation multi-pages et écouteurs d'événements
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialisation conditionnelle selon la page active
  if (typeof initMap === 'function' && document.getElementById('rade-map')) {
    initMap();
    updateGlobalKPIs();
    selectZone(appState.selectedZoneId || 'pen-ar-vir');
  }

  if (typeof renderMissions === 'function' && document.getElementById('missions-container')) {
    renderMissions();
  }

  if (typeof renderValidationList === 'function' && document.getElementById('validation-list-container')) {
    renderValidationList();
  }

  if (typeof renderProfile === 'function' && document.getElementById('profile-user-name')) {
    renderProfile();
  }

  if (typeof renderRanking === 'function' && document.getElementById('ranking-table-body')) {
    renderRanking();
  }

  if (typeof updateValidationBadge === 'function') {
    updateValidationBadge();
  }

  // 3. Sélecteur de Personas
  const personaSelect = document.getElementById('persona-select');
  if (personaSelect) {
    personaSelect.addEventListener('change', (e) => {
      setPersona(e.target.value);
    });
  }

  // 4. Actions de la Carte
  document.getElementById('recenter-map-btn')?.addEventListener('click', recenterMap);

  // 5. Déclencheurs de Modales
  document.getElementById('trigger-report-btn')?.addEventListener('click', () => {
    if (appState.currentPersona === 'visiteur') {
      promptLoginForAction();
      return;
    }
    document.getElementById('modal-report-zone')?.classList.add('open');
  });

  document.getElementById('open-create-mission-btn')?.addEventListener('click', () => {
    if (appState.currentPersona !== 'marc') {
      if (confirm("La création de mission est une fonctionnalité dédiée au persona Marc Le Goff (Organisateur). Voulez-vous basculer sur Marc ?")) {
        setPersona('marc');
      }
    }
    document.getElementById('modal-create-mission')?.classList.add('open');
  });

  document.getElementById('btn-show-points-rule')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('modal-points-rules')?.classList.add('open');
  });

  document.getElementById('open-scrum-board-btn')?.addEventListener('click', () => {
    document.getElementById('modal-scrum-board')?.classList.add('open');
  });

  document.getElementById('profile-declare-shortcut-btn')?.addEventListener('click', () => {
    openDeclareModal();
  });

  // 6. Formulaires
  document.getElementById('form-declare-harvest')?.addEventListener('submit', handleHarvestDeclarationSubmit);
  document.getElementById('declare-bags')?.addEventListener('input', updateDeclareWeightCalc);
  document.getElementById('declare-bag-size')?.addEventListener('change', updateDeclareWeightCalc);
  document.getElementById('form-report-zone')?.addEventListener('submit', handleReportSubmit);
  document.getElementById('form-create-mission')?.addEventListener('submit', handleCreateMissionSubmit);

  // 7. Filtres de recherche de missions
  document.getElementById('filter-search')?.addEventListener('input', renderMissions);
  document.getElementById('filter-zone')?.addEventListener('change', renderMissions);
  document.getElementById('filter-type')?.addEventListener('change', renderMissions);

  // 8. Fermeture des fenêtres modales
  document.querySelectorAll('.modal-close-btn, .modal-cancel-btn').forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeAllModals();
    });
  });

  // 9. Réinitialisation des données de test
  document.getElementById('reset-data-btn')?.addEventListener('click', () => {
    if (confirm("Voulez-vous réinitialiser toutes les données aux valeurs de démonstration initiales du Sprint 4 ?")) {
      localStorage.removeItem('ric_oceanik_sprint_4');
      appState = JSON.parse(JSON.stringify(INITIAL_DATA));
      saveState();
      location.reload();
    }
  });

  // 10. Application du Persona et du Sprint 4
  setPersona(appState.currentPersona || 'lea');
  applySprintScope(4);
});
