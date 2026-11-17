/**
 * js/ranking.js - Classement responsable et gestion des organisations / RSE (US-17, 18)
 */

function renderRanking() {
  const tbody = document.getElementById('ranking-table-body');
  if (!tbody) return;

  const sorted = [...appState.organizations].sort((a, b) => b.score - a.score);

  tbody.innerHTML = sorted.map((org, index) => {
    let rankBadge = `${index + 1}`;
    if (index === 0) rankBadge = '🥇 1er';
    else if (index === 1) rankBadge = '🥈 2e';
    else if (index === 2) rankBadge = '🥉 3e';

    return `
      <tr style="border-bottom:1px solid #e2e8f0;">
        <td style="padding:12px 10px; font-weight:800; color:#0284c7;">${rankBadge}</td>
        <td style="padding:12px 10px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:1.3rem;">${org.logo}</span>
            <div>
              <strong>${org.name}</strong>
              <div style="font-size:0.72rem; color:#64748b;">${org.desc}</div>
            </div>
          </div>
        </td>
        <td style="padding:12px 10px;"><span class="badge-tag" style="background:#e0f2fe; color:#0369a1; padding:3px 8px; border-radius:4px; font-size:0.72rem;">${org.category}</span></td>
        <td style="padding:12px 10px; text-align:center;">${org.missionsCount}</td>
        <td style="padding:12px 10px; text-align:center;">${org.members}</td>
        <td style="padding:12px 10px; text-align:right; font-weight:700; color:#10b981;">${org.kgValid} kg</td>
        <td style="padding:12px 10px; text-align:right; font-weight:800; font-size:1rem; color:#0f172a;">${org.score} pts</td>
      </tr>
    `;
  }).join('');

  // Cartes d'organisations
  const orgsContainer = document.getElementById('orgs-list-container');
  if (orgsContainer) {
    orgsContainer.innerHTML = appState.organizations.map(o => `
      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:16px;">
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
          <span style="font-size:1.8rem;">${o.logo}</span>
          <div>
            <h4 style="font-size:0.95rem; font-weight:700;">${o.name}</h4>
            <span style="font-size:0.75rem; color:#64748b;">${o.type} • ${o.members} membres inscrits</span>
          </div>
        </div>
        <p style="font-size:0.8rem; color:#475569; margin-bottom:10px;">${o.desc}</p>
        <div style="display:flex; justify-content:space-between; font-size:0.78rem; border-top:1px solid #e2e8f0; padding-top:8px;">
          <span>Missions : <strong>${o.missionsCount}</strong></span>
          <span>Bilan : <strong style="color:#10b981;">${o.kgValid} kg</strong></span>
        </div>
      </div>
    `).join('');
  }
}
