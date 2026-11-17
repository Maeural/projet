/**
 * js/data.js - Données initiales et modélisation métier du projet RIC / Océanik
 * Contexte TD1 - Équipe : Allan (PO), Mathis (SM), Tim, Jules-Yann, Simon-Noël (Dev)
 */

const INITIAL_DATA = {
  currentSprint: 4, // Sprint actif par défaut (1, 2, 3 ou 4)
  currentPersona: 'lea', // lea, marc, sofia, camille, kerneis, visiteur
  
  // Personas définis dans le TD1
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
      missionsDone: 3,
      hours: '5h30',
      kgValid: 35,
      kgPending: 7,
      badges: ['badge_first_rivage', 'badge_main_verte', 'badge_esprit_equipe'],
      registeredMissionIds: ['m1', 'm4'],
      history: [
        { date: '12/11/2026', zone: 'Moulin Blanc', kg: 14, status: 'validée', note: 'Nettoyage automne' },
        { date: '04/11/2026', zone: 'Plage du Minou', kg: 21, status: 'validée', note: 'Sortie surfeurs' }
      ]
    },
    marc: {
      id: 'marc',
      name: 'Marc Le Goff',
      role: 'Organisateur bénévole (P2)',
      subtitle: 'Membre asso environnementale • 41 ans',
      email: 'marc.legoff@brest-benevoles.bzh',
      password: 'password123',
      avatar: 'M',
      points: 340,
      level: 'Niveau 4 • Capitaine d\'Estran',
      missionsDone: 8,
      hours: '22h00',
      kgValid: 320,
      kgPending: 0,
      badges: ['badge_first_rivage', 'badge_main_verte', 'badge_esprit_equipe'],
      registeredMissionIds: ['m1', 'm2', 'm4'],
      history: []
    },
    sofia: {
      id: 'sofia',
      name: 'Sofia Berthelot',
      role: 'Référente Impact (P2)',
      subtitle: 'Bénévole experte sécurité & validation des données',
      email: 'sofia.berthelot@oceanik.bzh',
      password: 'password123',
      avatar: 'S',
      points: 410,
      level: 'Niveau 5 • Garante Scientifique',
      missionsDone: 11,
      hours: '30h00',
      kgValid: 580,
      kgPending: 0,
      badges: ['badge_first_rivage', 'badge_main_verte', 'badge_referent', 'badge_esprit_equipe'],
      registeredMissionIds: ['m1'],
      history: []
    },
    camille: {
      id: 'camille',
      name: 'Camille Roussel',
      role: 'Responsable RSE (P3)',
      subtitle: 'Brest Tech Solutions • 36 ans',
      email: 'camille.roussel@naval-group-rse.fr',
      password: 'password123',
      avatar: 'C',
      points: 120,
      level: 'Niveau 1 • Ambassadrice RSE',
      missionsDone: 2,
      hours: '4h00',
      kgValid: 45,
      kgPending: 0,
      badges: ['badge_esprit_equipe'],
      registeredMissionIds: ['m2'],
      history: []
    },
    kerneis: {
      id: 'kerneis',
      name: 'Yann Kernéis',
      role: 'Enseignant (P3)',
      subtitle: 'Collège de l\'Iroise • Projets pédagogiques',
      email: 'yann.kerneis@college-iroise.ac-rennes.fr',
      password: 'password123',
      avatar: 'Y',
      points: 210,
      level: 'Niveau 3 • Pédagogue du Littoral',
      missionsDone: 4,
      hours: '10h00',
      kgValid: 160,
      kgPending: 0,
      badges: ['badge_first_rivage', 'badge_esprit_equipe'],
      registeredMissionIds: ['m3'],
      history: []
    },
    visiteur: {
      id: 'visiteur',
      name: 'Visiteur Anonyme',
      role: 'Découverte (Non connecté)',
      subtitle: 'Consultez la carte en accès libre',
      email: '',
      password: '',
      avatar: '?',
      points: 0,
      level: 'Visiteur',
      missionsDone: 0,
      hours: '0h',
      kgValid: 0,
      kgPending: 0,
      badges: [],
      registeredMissionIds: [],
      history: []
    }
  },

  // Zones de la rade de Brest (US-01, US-02)
  zones: [
    {
      id: 'moulin-blanc',
      name: 'Plage du Moulin Blanc',
      commune: 'Brest',
      lat: 48.393,
      lng: -4.435,
      status: 'watch',
      statusText: 'À surveiller',
      actions: 4,
      kgValid: 420,
      kgPending: 50,
      participants: 68,
      description: 'Grande plage urbaine de Brest. Forte fréquentation, accumulation de macro-déchets plastiques près du polder et du port de plaisance.',
      safety: 'Attention aux tessons de verre près des cales. Gants renforcés indispensables.',
      photos: ['Plastiques polder', 'Estran ouest'],
      upcomingMissions: ['Opération éco-citoyenne Plage du Moulin Blanc (28 nov)']
    },
    {
      id: 'minou',
      name: 'Plage du Minou',
      commune: 'Plouzané',
      lat: 48.337,
      lng: -4.615,
      status: 'clean',
      statusText: 'Propre',
      actions: 6,
      kgValid: 310,
      kgPending: 0,
      participants: 85,
      description: 'Plage surveillée et nettoyée régulièrement par les écoles de surf et les riverains. Très bon état général.',
      safety: 'Courants forts au large. Respect de la dune protégée.',
      photos: ['Vue phare du Minou', 'Plage propre'],
      upcomingMissions: ['Sortie pédagogique des collégiens (05 déc)']
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
      photos: ['Débris maritimes estran', 'Filets échoués'],
      upcomingMissions: ['Grand ramassage d\'automne à Pen-ar-Vir (21 nov)']
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
      photos: ['Ferrailles digue', 'Emballages industriels'],
      upcomingMissions: ['Nettoyage éclair Port de Commerce (12 déc)']
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
      photos: ['Anse paisible', 'Sentier côtier'],
      upcomingMissions: []
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
      photos: ['Dune préservée'],
      upcomingMissions: []
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
      photos: [],
      upcomingMissions: []
    }
  ],

  // Missions citoyennes (US-04, 05, 06, 08, 09, 10)
  missions: [
    {
      id: 'm1',
      title: 'Grand ramassage d\'automne à Pen-ar-Vir',
      zone: 'Pen-ar-Vir',
      date: '2026-11-21',
      time: '14h00 - 16h30',
      duration: '2h30',
      organizer: 'Marc Le Goff',
      organizerId: 'marc',
      referent: 'Sofia Berthelot',
      level: 'Modéré (rochers / estran)',
      capacity: 20,
      registered: ['Léa Morvan', 'Timothée Q.', 'Jules-Yann', 'Simon-Noël', 'Sarah B.'],
      security: 'Bottes obligatoires, gants fournis par l\'association. Ne pas manipuler les fusées de détresse.',
      type: 'Nettoyage estran',
      status: 'open'
    },
    {
      id: 'm2',
      title: 'Opération éco-citoyenne Plage du Moulin Blanc',
      zone: 'Moulin Blanc',
      date: '2026-11-28',
      time: '10h00 - 12h30',
      duration: '2h30',
      organizer: 'Marc Le Goff',
      organizerId: 'marc',
      referent: 'Sofia Berthelot',
      level: 'Accessible tous publics (familles)',
      capacity: 30,
      registered: ['Camille Roussel', 'Équipe Brest Tech Solutions', 'Alexandre T.', 'Nolwenn M.'],
      security: 'Attention aux tessons près des cales. Sacs étalons et pinces distribués sur place.',
      type: 'Dépollution plastique',
      status: 'open'
    },
    {
      id: 'm3',
      title: 'Sortie pédagogique des collégiens — Minou',
      zone: 'Plage du Minou',
      date: '2026-12-05',
      time: '13h30 - 16h00',
      duration: '2h30',
      organizer: 'Yann Kernéis',
      organizerId: 'kerneis',
      referent: 'Sofia Berthelot',
      level: 'Accessible tous publics (familles)',
      capacity: 25,
      registered: ['Classe 4e A Collège de l\'Iroise', 'Yann Kernéis', '2 Parents accompagnateurs'],
      security: 'Encadrement par binômes. Consignes strictes : laisser la laisse de mer intacte.',
      type: 'Action scolaire & RSE',
      status: 'full'
    },
    {
      id: 'm4',
      title: 'Nettoyage éclair Port de Commerce',
      zone: 'Port de Commerce',
      date: '2026-12-12',
      time: '09h30 - 11h30',
      duration: '2h00',
      organizer: 'Marc Le Goff',
      organizerId: 'marc',
      referent: 'Sofia Berthelot',
      level: 'Sportif (criques / falaises)',
      capacity: 15,
      registered: ['Marc Le Goff', 'Léa Morvan'],
      security: 'Zone portuaire : gilet fluo recommandé. Déchets lourds signalés.',
      type: 'Nettoyage estran',
      status: 'open'
    }
  ],

  // Déclarations de récolte en attente (US-11, US-12)
  declarations: [
    {
      id: 'dec-1',
      participantName: 'Léa Morvan',
      participantId: 'lea',
      zoneName: 'Pen-ar-Vir',
      date: '2026-11-17 08:30',
      bags: 4,
      bagSizeWeight: 7,
      calculatedWeight: 28,
      status: 'pending',
      notes: 'Bouts de filets, sacs plastiques déchiquetés et 12 bouteilles.',
      photoBefore: 'photo_penarvir_avant.jpg',
      photoAfter: 'photo_penarvir_apres.jpg'
    },
    {
      id: 'dec-2',
      participantName: 'Jules-Yann',
      participantId: 'other',
      zoneName: 'Moulin Blanc',
      date: '2026-11-16 16:45',
      bags: 3,
      bagSizeWeight: 7,
      calculatedWeight: 21,
      status: 'pending',
      notes: 'Emballages de pique-nique et barquettes polystyrène.',
      photoBefore: '',
      photoAfter: ''
    }
  ],

  // Badges disponibles (US-16)
  allBadges: [
    {
      id: 'badge_first_rivage',
      name: 'Premier rivage',
      icon: '🌊',
      desc: 'A validé sa première récolte de déchets sur le littoral.',
      dateDefault: '04/11/2026'
    },
    {
      id: 'badge_main_verte',
      name: 'Main verte',
      icon: '🌿',
      desc: 'A collecté plus de 25 kg de déchets validés pour la rade.',
      dateDefault: '12/11/2026'
    },
    {
      id: 'badge_eclaireur',
      name: 'Éclaireur',
      icon: '🔭',
      desc: 'A émis un signalement de zone polluée utile pour la communauté.',
      dateDefault: 'Déblocable'
    },
    {
      id: 'badge_referent',
      name: 'Référent impact',
      icon: '⚖️',
      desc: 'Garantit la qualité scientifique et la validation des données.',
      dateDefault: 'Attribué à Sofia'
    },
    {
      id: 'badge_esprit_equipe',
      name: 'Esprit d\'équipe',
      icon: '🤝',
      desc: 'Participe activement à des missions collectives organisées.',
      dateDefault: '21/11/2026'
    }
  ],

  // Organisations & Collectifs RSE / Scolaires (US-17, US-18)
  organizations: [
    {
      id: 'org1',
      name: 'Association Océan Vivant',
      type: 'Association',
      category: 'Asso citoyenne',
      members: 28,
      missionsCount: 8,
      kgValid: 540,
      score: 1140,
      logo: '🐙',
      desc: 'Collectif de bénévoles actifs sur le nord de la rade.'
    },
    {
      id: 'org2',
      name: 'Brest Tech Solutions (RSE)',
      type: 'Entreprise',
      category: 'Entreprise RSE',
      members: 42,
      missionsCount: 6,
      kgValid: 480,
      score: 920,
      logo: '💻',
      desc: 'Défi collaborateurs : un vendredi après-midi par trimestre pour la rade.'
    },
    {
      id: 'org3',
      name: 'Collège de l\'Iroise',
      type: 'Établissement scolaire',
      category: 'Scolaire',
      members: 65,
      missionsCount: 4,
      kgValid: 320,
      score: 710,
      logo: '🎓',
      desc: 'Projet pédagogique écocitoyen de 4e et 3e.'
    },
    {
      id: 'org4',
      name: 'Club Nautique Rade Nord',
      type: 'Club sportif',
      category: 'Nautisme',
      members: 19,
      missionsCount: 3,
      kgValid: 210,
      score: 490,
      logo: '⛵',
      desc: 'Les kayakistes et paddleurs nettoient les criques inaccessibles à pied.'
    }
  ],

  selectedZoneId: 'pen-ar-vir'
};
