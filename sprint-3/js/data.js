/**
 * sprint-3/js/data.js - Données initiales et modélisation métier du Sprint 3 (RIC / Océanik)
 * User Stories livrées :
 * - Sprint 1 : US-01, US-02, US-03, US-07
 * - Sprint 2 : US-04, US-05, US-06, US-08, US-09, US-10
 * - Sprint 3 : US-11 (Déclaration récolte sacs 50L), US-12 (Validation Sofia & zone au vert), US-13 (Signalement zone)
 */

const INITIAL_DATA = {
  currentSprint: 3,
  currentPersona: 'sofia', // 'sofia' (P2 Référente), 'lea' (P1), 'marc' (P2), ou 'visiteur'
  
  // Personas disponibles au Sprint 3 (US-07, US-08, US-12)
  personas: {
    sofia: {
      id: 'sofia',
      name: 'Sofia Berthelot',
      role: 'Référente Impact (P2)',
      subtitle: 'Bénévole experte sécurité & validation scientifique des données',
      email: 'sofia.berthelot@oceanik.bzh',
      password: 'password123',
      avatar: 'S',
      points: 410,
      level: 'Niveau 5 • Garante Scientifique',
      missionsDone: 11,
      hours: '30h00',
      kgValid: 580,
      kgPending: 0,
      registeredMissionIds: ['m1']
    },
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
      registeredMissionIds: ['m1', 'm4']
    },
    marc: {
      id: 'marc',
      name: 'Marc Le Goff',
      role: 'Organisateur bénévole (P2)',
      subtitle: 'Membre association environnementale • 41 ans',
      email: 'marc.legoff@brest-benevoles.bzh',
      password: 'password123',
      avatar: 'M',
      points: 340,
      level: 'Niveau 4 • Capitaine d\'Estran',
      missionsDone: 8,
      hours: '22h00',
      kgValid: 320,
      kgPending: 0,
      registeredMissionIds: ['m1', 'm2', 'm4']
    },
    visiteur: {
      id: 'visiteur',
      name: 'Visiteur Anonyme',
      role: 'Grand public / Découverte',
      subtitle: 'Consultation sans compte',
      email: '',
      password: '',
      avatar: '?',
      points: 0,
      level: 'Visiteur',
      kgValid: 0,
      kgPending: 0,
      registeredMissionIds: []
    }
  },

  // Référentiel des zones côtières de la Rade de Brest
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
      photos: ['Dépôt de plastiques après coup de vent', 'Filet échoué digue est'],
      upcomingMissions: ['Ramassage de marée basse au Moulin Blanc (28 nov)']
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
      photos: ['Estran rocheux au pied du phare'],
      upcomingMissions: ['Nettoyage Estran & Crique du Minou (05 déc)']
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
      photos: ['Rivage assaini', 'Prés salés'],
      upcomingMissions: []
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

  // Missions citoyennes (US-04 à US-10)
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
      type: 'Crique rocheuse',
      tide: 'Basse mer 14h42 (coef 82)',
      safety: 'Bottes étanches obligatoires, gants de manutention fournis par l\'association.',
      meetingPoint: 'Cale de Pen-ar-Vir, Plougastel',
      status: 'active'
    },
    {
      id: 'm2',
      title: 'Ramassage de marée basse au Moulin Blanc',
      zone: 'Plage du Moulin Blanc',
      date: '2026-11-28',
      time: '10h00 - 12h00',
      duration: '2h00',
      organizer: 'Marc Le Goff',
      organizerId: 'marc',
      referent: 'Sofia Berthelot',
      level: 'Facile (sable / accessible)',
      capacity: 35,
      registered: ['Marc Le Goff', 'Timothée Q.', 'Benoît L.'],
      type: 'Plage urbaine',
      tide: 'Basse mer 10h15 (coef 75)',
      safety: 'Attention aux bris de verre et résidus de pêche près des enrochements.',
      meetingPoint: 'Devant le centre nautique du Moulin Blanc, Brest',
      status: 'active'
    },
    {
      id: 'm3',
      title: 'Nettoyage Estran & Crique du Minou',
      zone: 'Plage du Minou',
      date: '2026-12-05',
      time: '13h30 - 16h00',
      duration: '2h30',
      organizer: 'Marc Le Goff',
      organizerId: 'marc',
      referent: 'Sofia Berthelot',
      level: 'Sportif (rochers glissants)',
      capacity: 15,
      registered: ['Jules-Yann', 'Simon-Noël', 'Alexandre G.'],
      type: 'Crique / Goulet',
      tide: 'Basse mer 14h10 (coef 88)',
      safety: 'Interdiction formelle de s\'approcher des vagues du goulet. Chaussures crantées requises.',
      meetingPoint: 'Parking du phare du Minou, Plouzané',
      status: 'active'
    },
    {
      id: 'm4',
      title: 'Nettoyage éclair Port de Commerce',
      zone: 'Port de Commerce / Château',
      date: '2026-12-12',
      time: '14h30 - 16h30',
      duration: '2h00',
      organizer: 'Marc Le Goff',
      organizerId: 'marc',
      referent: 'Sofia Berthelot',
      level: 'Facile',
      capacity: 25,
      registered: ['Léa Morvan', 'Marc Le Goff', 'Élodie P.'],
      type: 'Zone portuaire',
      tide: 'Basse mer 15h00 (coef 65)',
      safety: 'Gilet haute visibilité jaune obligatoire (fourni sur place).',
      meetingPoint: 'Quai Malbert, devant la tour Tanguy, Brest',
      status: 'active'
    }
  ],

  // Sas de déclarations en attente d'arbitrage de Sofia Berthelot (US-11, US-12)
  declarations: [
    {
      id: 'dec-1',
      participantName: 'Léa Morvan',
      participantId: 'lea',
      zoneName: 'Pen-ar-Vir',
      date: '2026-11-17 11:30',
      bags: 2,
      bagSizeWeight: 7, // Poids étalon sac 50L en kg
      calculatedWeight: 14,
      status: 'pending',
      notes: 'Bouts de filets, sacs plastiques déchiquetés et 12 bouteilles.',
      photoBefore: 'photo_penarvir_avant.jpg',
      photoAfter: 'photo_penarvir_apres.jpg'
    },
    {
      id: 'dec-2',
      participantName: 'Jules-Yann',
      participantId: 'other',
      zoneName: 'Plage du Moulin Blanc',
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

  selectedZoneId: 'pen-ar-vir'
};
