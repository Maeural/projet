/**
 * sprint-4/js/map.js - Gestion de la carte interactive OpenStreetMap avec Leaflet (US-01, 02, 03)
 */

let mapInstance = null;
let mapMarkers = {};

function initMap() {
  const mapContainer = document.getElementById('rade-map');
  if (!mapContainer) return;

  if (typeof L === 'undefined') {
    mapContainer.innerHTML = `
      <div style="padding: 40px; text-align: center; color: #dc2626; background: #fef2f2; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <h3 style="font-size:1.2rem; margin-bottom:8px;">⚠️ Erreur de chargement de la bibliothèque Leaflet</h3>
        <p style="font-size:0.9rem; color:#475569;">Vérifiez votre connexion internet pour charger la cartographie.</p>
      </div>
    `;
    return;
  }

  // Éviter la double initialisation
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }

  // Coordonnées centrées sur la Rade de Brest : 48.365° N, -4.450° W
  const brestCenter = [48.365, -4.450];
  mapInstance = L.map('rade-map', {
    center: brestCenter,
    zoom: 11,
    minZoom: 9,
    maxZoom: 18,
    zoomControl: true
  });

  // Serveur de tuiles OpenStreetMap France (validé pour la Rade de Brest)
  L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    maxZoom: 20,
    subdomains: ['a', 'b', 'c'],
    attribution: '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(mapInstance);

  renderMapMarkers();

  setTimeout(() => {
    if (mapInstance) mapInstance.invalidateSize();
  }, 250);

  window.addEventListener('resize', () => {
    if (mapInstance) mapInstance.invalidateSize();
  });
}

function getStatusColor(status) {
  switch (status) {
    case 'clean': return '#10b981';
    case 'watch': return '#f59e0b';
    case 'dirty': return '#ef4444';
    case 'urgent': return '#991b1b';
    default: return '#94a3b8';
  }
}

function renderMapMarkers() {
  if (!mapInstance) return;

  Object.values(mapMarkers).forEach(m => mapInstance.removeLayer(m));
  mapMarkers = {};

  appState.zones.forEach(zone => {
    const color = getStatusColor(zone.status);
    
    const circle = L.circleMarker([zone.lat, zone.lng], {
      radius: 12,
      fillColor: color,
      color: '#ffffff',
      weight: 3,
      opacity: 1,
      fillOpacity: 0.85
    }).addTo(mapInstance);

    const popupHtml = `
      <div style="font-family:system-ui,-apple-system,sans-serif; min-width:180px;">
        <h4 style="margin:0 0 4px 0; font-size:0.95rem; font-weight:700; color:#0f172a;">${zone.name}</h4>
        <div style="font-size:0.75rem; color:#64748b; margin-bottom:6px;">${zone.commune}</div>
        <div style="display:inline-block; padding:2px 8px; border-radius:10px; font-size:0.72rem; font-weight:700; color:white; background:${color}; margin-bottom:8px;">
          ${zone.statusText}
        </div>
        <div style="font-size:0.78rem; color:#334155; margin-bottom:3px;">
          • Actions : <strong>${zone.actions}</strong>
        </div>
        <div style="font-size:0.78rem; color:#334155; margin-bottom:8px;">
          • Déchets : <strong>${zone.kgValid} kg</strong>
        </div>
        <button onclick="selectZone('${zone.id}')" style="background:#0284c7; color:white; border:none; padding:5px 10px; border-radius:4px; font-size:0.75rem; font-weight:600; cursor:pointer; width:100%;">
          Fiche détaillée ➜
        </button>
      </div>
    `;

    circle.bindPopup(popupHtml);

    circle.on('click', () => {
      selectZone(zone.id);
    });

    mapMarkers[zone.id] = circle;
  });
}

function recenterMap() {
  if (mapInstance) {
    mapInstance.setView([48.365, -4.450], 11);
    mapInstance.invalidateSize();
    if (typeof showToast === 'function') {
      showToast('Carte recentrée sur la Rade de Brest', 'info');
    }
  }
}

// Mise à jour des KPIs globaux (US-03)
function updateGlobalKPIs() {
  let totalKgValid = 0;
  let totalKgPending = 0;
  let totalActions = 0;
  let totalParticipants = 0;

  appState.zones.forEach(z => {
    totalKgValid += z.kgValid || 0;
    totalKgPending += z.kgPending || 0;
    totalActions += z.actions || 0;
    totalParticipants += z.participants || 0;
  });

  const totalKg = totalKgValid + totalKgPending;

  const elTotalKg = document.getElementById('kpi-total-kg');
  const elValidKg = document.getElementById('kpi-valid-kg');
  const elPendingKg = document.getElementById('kpi-pending-kg');
  const elMissions = document.getElementById('kpi-total-missions');
  const elParticipants = document.getElementById('kpi-total-participants');
  const elZones = document.getElementById('kpi-total-zones');

  if (elTotalKg) elTotalKg.textContent = `${totalKg.toLocaleString('fr-FR')} kg`;
  if (elValidKg) elValidKg.textContent = `${totalKgValid.toLocaleString('fr-FR')} kg validés`;
  if (elPendingKg) elPendingKg.textContent = `${totalKgPending.toLocaleString('fr-FR')} kg déclarés`;
  if (elMissions) elMissions.textContent = `${totalActions}`;
  if (elParticipants) elParticipants.textContent = `${totalParticipants}`;
  if (elZones) elZones.textContent = `${appState.zones.length} zones`;
}

// Volet latéral de détail d'une zone (US-02)
function selectZone(zoneId) {
  appState.selectedZoneId = zoneId;
  const zone = appState.zones.find(z => z.id === zoneId);
  if (!zone) return;

  const container = document.getElementById('zone-detail-content');
  if (!container) return;

  let statusClass = 'status-unknown';
  if (zone.status === 'clean') statusClass = 'status-clean';
  else if (zone.status === 'watch') statusClass = 'status-watch';
  else if (zone.status === 'dirty') statusClass = 'status-dirty';
  else if (zone.status === 'urgent') statusClass = 'status-urgent';

  container.innerHTML = `
    <span class="zone-badge-status ${statusClass}">${zone.statusText}</span>
    <h3 style="font-size:1.3rem; font-weight:800; margin-bottom:4px; color:#0f172a;">${zone.name}</h3>
    <p style="font-size:0.8rem; color:#64748b; margin-bottom:12px;">Commune : <strong>${zone.commune}</strong> • Rade de Brest</p>
    
    <p style="font-size:0.85rem; color:#334155; line-height:1.45; margin-bottom:12px;">
      ${zone.description}
    </p>

    <div style="background:#fef2f2; border-left:3px solid #ef4444; padding:8px 12px; font-size:0.75rem; color:#991b1b; margin-bottom:12px; border-radius:4px;">
      <strong>⚠️ Sécurité :</strong> ${zone.safety}
    </div>

    <div class="zone-meta-grid">
      <div class="zone-meta-item">
        <small>Déchets validés</small>
        <strong>${zone.kgValid} kg</strong>
      </div>
      <div class="zone-meta-item">
        <small>Déclarés en attente</small>
        <strong style="color:#d97706;">${zone.kgPending} kg</strong>
      </div>
      <div class="zone-meta-item">
        <small>Missions réalisées</small>
        <strong>${zone.actions}</strong>
      </div>
      <div class="zone-meta-item">
        <small>Bénévoles mobilisés</small>
        <strong>${zone.participants}</strong>
      </div>
    </div>

    <div style="margin-top:12px;">
      <h4 style="font-size:0.85rem; text-transform:uppercase; color:#64748b; margin-bottom:6px;">Missions à venir sur ce secteur :</h4>
      ${zone.upcomingMissions && zone.upcomingMissions.length > 0 ? `
        <ul style="font-size:0.82rem; padding-left:18px; color:#0284c7;">
          ${zone.upcomingMissions.map(m => `<li><strong>${m}</strong></li>`).join('')}
        </ul>
      ` : `<p style="font-size:0.8rem; color:#94a3b8; font-style:italic;">Aucune mission programmée pour le moment.</p>`}
    </div>

    <div class="zone-actions-list" style="margin-top:20px; display:flex; flex-direction:column; gap:8px;">
      <button class="btn btn-primary btn-sm sprint-feature sprint-3-plus" onclick="openDeclareModal('${zone.name}')" style="width:100%;">
        ✍️ Déclarer une récolte sur cette zone (US-11)
      </button>
      <button class="btn btn-secondary btn-sm sprint-feature sprint-2-plus" onclick="filterMissionsByZone('${zone.name}')" style="width:100%;">
        📅 Voir les missions pour ce secteur
      </button>
    </div>
  `;

  if (mapInstance) {
    mapInstance.panTo([zone.lat, zone.lng]);
    if (mapMarkers[zone.id]) {
      mapMarkers[zone.id].openPopup();
    }
  }
}
