/**
 * sprint-1/js/data.js - Données initiales et modélisation métier du Sprint 1 (RIC / Océanik)
 * User Stories livrées : US-01 (Carte), US-02 (Fiche zones), US-03 (KPIs), US-07 (Connexion rapide Léa / Visiteur)
 */

const INITIAL_DATA = {
  currentSprint: 1,
  currentPersona: 'lea', // 'lea' (P1) ou 'visiteur'
  
  // Personas disponibles au Sprint 1 (US-07)
  personas: {
    lea: {
      id: 'lea',
      name: 'Léa Morvan',
      role: 'Citoyenne engagée (P1)',
      subtitle: 'Étudiante en Master • Brest • Membre active',
      email: 'lea.morvan@email.bzh',
      password: 'password123',
      avatar: 'L',
      points: 180,
      level: 'Niveau 2 • Gardienne de Rade',
      kgValid: 35,
      kgPending: 7
    },
    visiteur: {
      id: 'visiteur',
      name: 'Visiteur Anonyme',
      role: 'Grand public / Découverte',
      subtitle: 'Consultation de la carte du littoral sans inscription',
      email: '',
      password: '',
      avatar: '?',
      points: 0,
      level: 'Visiteur',
      kgValid: 0,
      kgPending: 0
    }
  },

  // Référentiel des 7 zones côtières de la Rade de Brest (US-01, US-02, US-03)
  zones: [
    {
      id: 'moulin-blanc',
      name: 'Plage du Moulin Blanc',
      commune: 'Brest',
      lat: 48.395,
      lng: -4.435,
      status: 'dirty',
      statusText: 'Polluée',
      actions: 5,
      kgValid: 340,
      kgPending: 45,
      participants: 68,
      description: 'Plage urbaine très fréquentée, proximité du port de plaisance et d\'Océanopolis. Fort dépôt de macro-déchets plastiques après tempête.',
      safety: 'Risque de bris de verre près des cales. Bottes recommandées.',
      photos: ['Dépôt de plastiques après coup de vent', 'Filet échoué digue est']
    },
    {
      id: 'plage-du-minou',
      name: 'Plage du Minou',
      commune: 'Plouzané',
      lat: 48.337,
      lng: -4.615,
      status: 'watch',
      statusText: 'À surveiller',
      actions: 4,
      kgValid: 280,
      kgPending: 0,
      participants: 52,
      description: 'Spot de surf à l\'entrée du goulet de Brest. Laisse de mer naturelle mêlée à des microplastiques et fragments maritimes.',
      safety: 'Courants forts au goulet : ramassage strictement limité au haut de plage.',
      photos: ['Estran rocheux au pied du phare']
    },
    {
      id: 'anse-de-camfrout',
      name: 'Anse de Camfrout',
      commune: 'Hôpital-Camfrout',
      lat: 48.328,
      lng: -4.248,
      status: 'clean',
      statusText: 'Propre',
      actions: 3,
      kgValid: 160,
      kgPending: 0,
      participants: 38,
      description: 'Zone estuaire préservée au fond de la rade. Vasières et prés salés nettoyés par les riverains.',
      safety: 'Vasières meubles : progression en groupe recommandée.',
      photos: ['Rivage assaini', 'Prés salés']
    },
    {
      id: 'pen-ar-vir',
      name: 'Pen-ar-Vir',
      commune: 'Plougastel-Daoulas',
      lat: 48.358,
      lng: -4.410,
      status: 'dirty',
      statusText: 'Polluée',
      actions: 2,
      kgValid: 180,
      kgPending: 70,
      participants: 32,
      description: 'Crique rocheuse exposée aux courants de la rade. Accumulation importante de bouts de cordages, casiers et emballages maritimes.',
      safety: 'Rochers très glissants à marée descendante. Bottes ou chaussures de randonnée obligatoires.',
      photos: ['Débris maritimes estran', 'Filets échoués']
    },
    {
      id: 'port-commerce',
      name: 'Port de Commerce / Château',
      commune: 'Brest',
      lat: 48.382,
      lng: -4.482,
      status: 'urgent',
      statusText: 'Prioritaire',
      actions: 1,
      kgValid: 150,
      kgPending: 60,
      participants: 25,
      description: 'Pointe rocheuse sous le château et digues du port. Présence de ferrailles, plastiques durs et déchets portuaires.',
      safety: 'Zone industrielle proche. Casque non requis mais gilet fluo fortement conseillé.',
      photos: ['Ferrailles digue', 'Emballages industriels']
    },
    {
      id: 'poulmic',
      name: 'Anse du Poulmic',
      commune: 'Lanvéoc',
      lat: 48.288,
      lng: -4.455,
      status: 'clean',
      statusText: 'Propre',
      actions: 3,
      kgValid: 110,
      kgPending: 0,
      participants: 42,
      description: 'Rive sud de la rade, secteur boisé et naturel. Peu de dépôts maritimes récents.',
      safety: 'Zone militaire adjacente : ne pas franchir les délimitations balisées.',
      photos: ['Anse paisible', 'Sentier côtier']
    },
    {
      id: 'blancs-sablons',
      name: 'Plage des Blancs Sablons',
      commune: 'Le Conquet',
      lat: 48.365,
      lng: -4.765,
      status: 'watch',
      statusText: 'À surveiller',
      actions: 3,
      kgValid: 220,
      kgPending: 0,
      participants: 55,
      description: 'Grande plage ouverte sur la mer d\'Iroise. Arrivages intermittents de plastiques après les coups de vent d\'ouest.',
      safety: 'Espace dunaire fragile. Rester sur l\'estran découvrant.',
      photos: ['Dune préservée']
    },
    {
      id: 'daoulas',
      name: 'Baie de Daoulas',
      commune: 'Daoulas / Plougastel',
      lat: 48.315,
      lng: -4.335,
      status: 'unknown',
      statusText: 'Non renseignée',
      actions: 0,
      kgValid: 0,
      kgPending: 0,
      participants: 0,
      description: 'Secteur en fond de rade sans campagne récente de recensement. Les bénévoles sont invités à signaler son état.',
      safety: 'Vasières importantes à marée basse. Ne pas s\'aventurer loin de la berge.',
      photos: []
    }
  ],

  // Zone actuellement sélectionnée à l'ouverture de la carte
  selectedZoneId: 'pen-ar-vir'
};
