/**
 * sprint-3/js/main.js - Point d'entrée exclusif au Sprint 3 (Cœur du MVP : Récolte, Sofia & Carte au vert)
 * User Stories livrées :
 * - Sprint 1 : US-01, US-02, US-03, US-07
 * - Sprint 2 : US-04, US-05, US-06, US-08, US-09, US-10
 * - Sprint 3 : US-11 (Déclaration récolte sacs 50L), US-12 (Validation Sofia & passage de la zone au vert),
 *              US-13 (Signalement citoyen géolocalisé)
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

  if (typeof updateValidationBadge === 'function') {
    updateValidationBadge();
  }

  // 2. Sélecteur de Persona (US-07, US-08, US-12 : Sofia, Léa, Marc, Visiteur)
  const personaSelect = document.getElementById('persona-select');
  if (personaSelect) {
    personaSelect.addEventListener('change', (e) => {
      setPersona(e.target.value);
    });
  }

  // 3. Actions de la Carte
  document.getElementById('recenter-map-btn')?.addEventListener('click', recenterMap);

  // 4. Déclencheurs de Modales (US-13 Signalement & US-08 Création mission)
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

  document.getElementById('open-scrum-board-btn')?.addEventListener('click', () => {
    document.getElementById('modal-scrum-board')?.classList.add('open');
  });

  // 5. Formulaires Métier (US-11 Déclaration, US-13 Signalement, US-08 Création)
  document.getElementById('form-declare-harvest')?.addEventListener('submit', handleHarvestDeclarationSubmit);
  document.getElementById('declare-bags')?.addEventListener('input', updateDeclareWeightCalc);
  document.getElementById('declare-bag-size')?.addEventListener('change', updateDeclareWeightCalc);
  document.getElementById('form-report-zone')?.addEventListener('submit', handleReportSubmit);
  document.getElementById('form-create-mission')?.addEventListener('submit', handleCreateMissionSubmit);

  // 6. Filtres de recherche de missions (US-04)
  document.getElementById('filter-search')?.addEventListener('input', renderMissions);
  document.getElementById('filter-zone')?.addEventListener('change', renderMissions);
  document.getElementById('filter-type')?.addEventListener('change', renderMissions);

  // 7. Fermeture des fenêtres modales
  document.querySelectorAll('.modal-close-btn, .modal-cancel-btn').forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeAllModals();
    });
  });

  // 8. Réinitialisation des données de test
  document.getElementById('reset-data-btn')?.addEventListener('click', () => {
    if (confirm("Voulez-vous réinitialiser toutes les données aux valeurs de démonstration initiales du Sprint 3 ?")) {
      localStorage.removeItem('ric_oceanik_sprint_3');
      appState = JSON.parse(JSON.stringify(INITIAL_DATA));
      saveState();
      location.reload();
    }
  });

  // 9. Verrouillage du Persona et du Sprint 3
  setPersona(appState.currentPersona || 'sofia');
  applySprintScope(3);
});
