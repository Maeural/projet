/**
 * sprint-1/js/main.js - Point d'entrée exclusif au Sprint 1 (Fondations & Carte Rade)
 * User Stories livrées : US-01 (Carte), US-02 (Fiche zone), US-03 (KPIs), US-07 (Connexion rapide Léa / Visiteur)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialisation de la cartographie et des compteurs d'impact du littoral
  if (typeof initMap === 'function' && document.getElementById('rade-map')) {
    initMap();
    updateGlobalKPIs();
    selectZone(appState.selectedZoneId || 'pen-ar-vir');
  }

  // 2. Sélecteur de Persona (US-07 : Léa Morvan ou Visiteur Anonyme)
  const personaSelect = document.getElementById('persona-select');
  if (personaSelect) {
    personaSelect.addEventListener('change', (e) => {
      setPersona(e.target.value);
    });
  }

  // 3. Commandes de la Carte interactive OpenStreetMap
  document.getElementById('recenter-map-btn')?.addEventListener('click', recenterMap);

  // 4. Dossier de suivi Scrum du Sprint 1
  document.getElementById('open-scrum-board-btn')?.addEventListener('click', () => {
    document.getElementById('modal-scrum-board')?.classList.add('open');
  });

  // 5. Fermeture des fenêtres modales
  document.querySelectorAll('.modal-close-btn, .modal-cancel-btn').forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeAllModals();
    });
  });

  // 6. Réinitialisation des données de test
  document.getElementById('reset-data-btn')?.addEventListener('click', () => {
    if (confirm("Voulez-vous réinitialiser toutes les données aux valeurs de démonstration initiales du Sprint 1 ?")) {
      localStorage.removeItem('ric_oceanik_sprint_1');
      appState = JSON.parse(JSON.stringify(INITIAL_DATA));
      saveState();
      location.reload();
    }
  });

  // 7. Verrouillage du Persona et du Sprint 1
  setPersona(appState.currentPersona || 'lea');
  applySprintScope(1);
});
