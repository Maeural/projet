/**
 * js/sprint.js - Simulateur de progression Scrum (Sprints 1 à 4), Personas et Navigation Multi-Pages
 */

function applySprintScope(sprintNum = 3) {
  appState.currentSprint = 3;
  saveState();

  const bannerTitle = document.getElementById('sprint-banner-title');
  const bannerDesc = document.getElementById('sprint-banner-desc');
  const bannerBadge = document.getElementById('sprint-banner-badge');

  if (bannerTitle) bannerTitle.textContent = 'Sprint 3 — Cœur du MVP : Récolte, Sofia & Carte au vert (15 pts)';
  if (bannerDesc) bannerDesc.textContent = 'US livrées : US-11 (Déclaration récolte sacs 50L), US-12 (Espace Sofia & zone passe au vert), US-13 (Signalement zone sale).';
  if (bannerBadge) bannerBadge.textContent = 'Incrément Sprint 3';

  // Afficher fonctionnalités Sprints 2 & 3, masquer Sprint 4
  document.querySelectorAll('.sprint-2-plus').forEach(el => el.style.display = '');
  document.querySelectorAll('.sprint-3-plus').forEach(el => el.style.display = '');
  document.querySelectorAll('.sprint-4-plus').forEach(el => el.style.display = 'none');
}

function setPersona(personaId) {
  appState.currentPersona = personaId;
  saveState();

  const persona = appState.personas[personaId];
  const userHeaderStatus = document.getElementById('user-header-status');

  if (userHeaderStatus) {
    if (personaId === 'visiteur') {
      userHeaderStatus.innerHTML = `
        <a href="login.html" class="btn btn-primary btn-sm" style="text-decoration:none;">
          🔑 Se connecter
        </a>
      `;
    } else {
      userHeaderStatus.innerHTML = `
        <div class="user-status-pill">
          <div class="user-avatar-badge">${persona.avatar}</div>
          <div>
            <div style="font-size:0.8rem; line-height:1.1;"><strong>${persona.name}</strong></div>
            <div style="font-size:0.68rem; color:#64748b;">${persona.role.split('(')[0]}</div>
          </div>
          <a href="login.html" class="btn btn-secondary btn-sm" style="padding:2px 8px; font-size:0.7rem; margin-left:8px; text-decoration:none;" title="Changer de compte ou se déconnecter">
            Déconnexion
          </a>
        </div>
      `;
    }
  }

  const personaSelect = document.getElementById('persona-select');
  if (personaSelect && personaSelect.value !== personaId) {
    personaSelect.value = personaId;
  }

  // Actualisation contextuelle selon la page courante
  if (typeof renderMissions === 'function') renderMissions();
  if (typeof renderValidationList === 'function') renderValidationList();
  if (typeof updateValidationBadge === 'function') updateValidationBadge();

  if (typeof showToast === 'function') {
    showToast(`Compte actif : ${persona.name}`, 'info');
  }
}

function promptLoginForAction() {
  if (typeof showToast === 'function') {
    showToast("Cette action nécessite d'être connecté. Redirection vers la page de connexion...", "warning");
  }
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 700);
}
