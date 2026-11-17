/**
 * sprint-2/js/main.js - Point d'entrée exclusif au Sprint 2 (Mobilisation & Missions)
 * User Stories livrées :
 * - Sprint 1 : US-01 (Carte), US-02 (Fiche zones), US-03 (KPIs), US-07 (Connexion rapide)
 * - Sprint 2 : US-04 (Catalogue missions), US-05 (Fiche & sécurité estran), US-06 (Inscription),
 *              US-08 (Création Marc), US-09 (Participants), US-10 (Annulation)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialisation Carte et KPIs si sur la page map
  if (typeof initMap === 'function' && document.getElementById('rade-map')) {
    initMap();
    updateGlobalKPIs();
    selectZone(appState.selectedZoneId || 'pen-ar-vir');
  }

  // 2. Initialisation Catalogue des missions si sur la page missions
  if (typeof renderMissions === 'function' && document.getElementById('missions-container')) {
    renderMissions();
  }

  // 3. Sélecteur de Persona (US-07, US-08 : Léa, Marc, Visiteur)
  const personaSelect = document.getElementById('persona-select');
  if (personaSelect) {
    personaSelect.addEventListener('change', (e) => {
      setPersona(e.target.value);
    });
  }

  // 4. Commandes de la Carte interactive OpenStreetMap
  document.getElementById('recenter-map-btn')?.addEventListener('click', recenterMap);

  // 5. Actions Organisateur Marc Le Goff (US-08 : Création de mission)
  document.getElementById('open-create-mission-btn')?.addEventListener('click', () => {
    if (appState.currentPersona !== 'marc') {
      if (confirm("La création de mission est une fonctionnalité dédiée au persona Marc Le Goff (Organisateur bénévole). Voulez-vous basculer sur Marc ?")) {
        setPersona('marc');
      }
    }
    document.getElementById('modal-create-mission')?.classList.add('open');
  });

  document.getElementById('form-create-mission')?.addEventListener('submit', handleCreateMissionSubmit);

  // 6. Filtres de recherche de missions (US-04)
  document.getElementById('filter-search')?.addEventListener('input', renderMissions);
  document.getElementById('filter-zone')?.addEventListener('change', renderMissions);
  document.getElementById('filter-type')?.addEventListener('change', renderMissions);

  // 7. Dossier de suivi Scrum du Sprint 2
  document.getElementById('open-scrum-board-btn')?.addEventListener('click', () => {
    document.getElementById('modal-scrum-board')?.classList.add('open');
  });

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
    if (confirm("Voulez-vous réinitialiser toutes les données aux valeurs de démonstration initiales du Sprint 2 ?")) {
      localStorage.removeItem('ric_oceanik_sprint_2');
      appState = JSON.parse(JSON.stringify(INITIAL_DATA));
      saveState();
      location.reload();
    }
  });

  // 10. Verrouillage du Persona et du Sprint 2
  setPersona(appState.currentPersona || 'lea');
  applySprintScope(2);
});
