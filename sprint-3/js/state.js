/**
 * js/state.js - Gestion de l'état persistant (localStorage) et utilitaires UI
 */

// Charge l'état depuis localStorage ou utilise les données initiales
function loadState() {
  const saved = localStorage.getItem('ric_oceanik_sprint_3');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      parsed.currentSprint = 3; // Toujours verrouillé sur Sprint 3
      return parsed;
    } catch (e) {
      console.warn('Erreur de parsing localStorage, réinitialisation aux données initiales', e);
    }
  }
  const init = JSON.parse(JSON.stringify(INITIAL_DATA));
  init.currentSprint = 3;
  return init;
}

let appState = loadState();

function saveState() {
  appState.currentSprint = 3;
  localStorage.setItem('ric_oceanik_sprint_3', JSON.stringify(appState));
}

// Notifications toast
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✅' : (type === 'warning' ? '⚠️' : 'ℹ️')}</span>
    <div>${message}</div>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Fermeture des modales
function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
}
