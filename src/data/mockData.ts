import { Company } from '../types';

export const INITIAL_COMPANIES: Company[] = [
  {
    id: 'comp-1',
    name: 'Copperbelt Civil & Earthworks Ltd',
    town: 'Kitwe',
    category: 'Building & Civil',
    nccGrade: 'NCC Grade 2',
    rating: 4.9,
    reviewsCount: 38,
    shortBio: 'Premier Copperbelt civil engineering and road infrastructure specialists handling major mining access roads, bridges, and municipal works.',
    fullDescription: 'Founded in 2011 in Kitwe, Copperbelt Civil & Earthworks Ltd has delivered over 180 km of heavy-duty asphalt corridors, reinforced storm drainage systems, and civil foundations for mining conglomerates and municipal councils across the Copperbelt province. Fully compliant with National Council for Construction (NCC) regulations with valid Grade 2 certification.',
    services: ['Highway & Road Paving', 'Reinforced Concrete Culverts', 'Bulk Earthmoving', 'Bridge Engineering', 'Stormwater Systems'],
    phone: '+260 212 224890',
    whatsapp: '+260966452109',
    email: 'tenders@copperbeltcivil.zm',
    address: 'Plot 4182, Industrial Area, Kitwe, Zambia',
    isVerified: true,
    isFeatured: true,
    status: 'Paid',
    plan: 'Enterprise',
    trialDaysLeft: 0,
    leadClicks: 142,
    viewsCount: 1840,
    joinedDate: 'Jan 2025',
    photos: [
      {
        id: 'p1',
        url: '/src/assets/images/civil_engineering_copperbelt_1790707197809.jpg',
        title: 'Kitwe-Kalulushi Access Highway Reconstruction',
        description: 'Complete civil grading, base compaction, and double seal asphalt application.'
      },
      {
        id: 'p2',
        url: '/src/assets/images/hero_lusaka_construction_1790707183929.jpg',
        title: 'Mining Infrastructure Earthworks',
        description: 'Heavy structural foundations and stormwater diversion canals.'
      }
    ]
  },
  {
    id: 'comp-2',
    name: 'Chingola Plant & Heavy Equipment Hire',
    town: 'Chingola',
    category: 'Heavy Equipment Hire',
    nccGrade: 'NCC Grade 4',
    rating: 4.8,
    reviewsCount: 24,
    shortBio: 'Supplying CAT excavators, 30-ton tipper trucks, graders, and mining earthmoving plant machinery across the North-Western & Copperbelt mining corridors.',
    fullDescription: 'Chingola Plant & Heavy Equipment Hire operates a modern fleet of certified Caterpillar and Komatsu earthmoving equipment. We provide wet and dry plant hire with skilled, certified operators holding valid mine safety clearances. Rapid mobilization to Solwezi, Chingola, Chililabombwe, and Mufulira.',
    services: ['CAT 330 Excavator Hire', '30-Ton Bell Tipper Dumpers', 'Motor Graders (CAT 140K)', 'Compactors & Rollers', 'Lowbed Heavy Transport'],
    phone: '+260 212 311044',
    whatsapp: '+260977823901',
    email: 'dispatch@chingolaplanthire.zm',
    address: 'Kabundi Road Industrial Yards, Chingola, Zambia',
    isVerified: true,
    isFeatured: true,
    status: 'Paid',
    plan: 'Professional',
    trialDaysLeft: 0,
    leadClicks: 98,
    viewsCount: 1210,
    joinedDate: 'Feb 2025',
    photos: [
      {
        id: 'p3',
        url: '/src/assets/images/heavy_equipment_plant_hire_1790707209383.jpg',
        title: 'Heavy Plant Excavation Fleet on Site',
        description: 'Komatsu and CAT hydraulic excavators ready for mining overburden removal.'
      },
      {
        id: 'p4',
        url: '/src/assets/images/civil_engineering_copperbelt_1790707197809.jpg',
        title: 'Site Preparation & Heavy Compaction',
        description: 'Vibratory roller compacting civil sub-base.'
      }
    ]
  },
  {
    id: 'comp-3',
    name: 'SunVolt Electrical & Solar Zambia',
    town: 'Ndola',
    category: 'Electrical & Solar',
    nccGrade: 'NCC Grade 5',
    rating: 4.9,
    reviewsCount: 31,
    shortBio: 'Engineering commercial grid-tied and hybrid solar power systems, high-voltage substations, and industrial backup energy for factories and estates.',
    fullDescription: 'Headquartered in Ndola, SunVolt Electrical & Solar specializes in turnkey renewable energy, commercial solar PV arrays, industrial generator synchronization, and high-voltage reticulation. Our engineers are certified with EIZ (Engineering Institution of Zambia) and NCC registered.',
    services: ['Commercial Rooftop Solar PV', 'Industrial Lithium BESS Storage', 'Substation Reticulation (11kV/33kV)', 'Power Factor Correction', 'Factory Automation & Wiring'],
    phone: '+260 212 612800',
    whatsapp: '+260979401822',
    email: 'info@sunvoltzambia.zm',
    address: 'Broadway Ave, Light Industrial Site, Ndola, Zambia',
    isVerified: true,
    isFeatured: false,
    status: 'Active Trial',
    plan: 'Free Trial',
    trialDaysLeft: 22,
    leadClicks: 76,
    viewsCount: 940,
    joinedDate: 'Sep 2026',
    photos: [
      {
        id: 'p5',
        url: '/src/assets/images/solar_electrical_industrial_1790707221135.jpg',
        title: 'Ndola Processing Facility 250kW Solar Roof',
        description: 'Tier-1 monocrystalline panels installed with 4-hour battery reserve.'
      },
      {
        id: 'p6',
        url: '/src/assets/images/lusaka_commercial_building_1790707231897.jpg',
        title: 'Commercial Sub-distribution & Inverter Room',
        description: 'Industrial Schneider switchgear and hybrid three-phase inverters.'
      }
    ]
  },
  {
    id: 'comp-4',
    name: 'Lusaka Apex Prime Construction',
    town: 'Lusaka',
    category: 'Building & Civil',
    nccGrade: 'NCC Grade 1',
    rating: 5.0,
    reviewsCount: 52,
    shortBio: 'Grade 1 multi-disciplinary commercial general contractor delivering multi-storey commercial towers, institutional estates, and luxury developments.',
    fullDescription: 'Lusaka Apex Prime Construction is an elite NCC Grade 1 general contractor with national capacity across Zambia. Known for precision architectural engineering, structural steel framing, glass curtain facades, and institutional turn-key project management.',
    services: ['Multi-Storey Commercial Buildings', 'Turnkey Estate Construction', 'Pre-engineered Steel Warehouses', 'Luxury Residential Complexes', 'Project Management'],
    phone: '+260 211 250199',
    whatsapp: '+260971004812',
    email: 'projects@lusakaapex.zm',
    address: 'Thabo Mbeki Road, Mass Media Commercial Park, Lusaka, Zambia',
    isVerified: true,
    isFeatured: true,
    status: 'Paid',
    plan: 'Enterprise',
    trialDaysLeft: 0,
    leadClicks: 215,
    viewsCount: 3100,
    joinedDate: 'Nov 2024',
    photos: [
      {
        id: 'p7',
        url: '/src/assets/images/lusaka_commercial_building_1790707231897.jpg',
        title: 'Apex Business Park Lusaka',
        description: 'Four-storey corporate office building with curtain wall glazing.'
      },
      {
        id: 'p8',
        url: '/src/assets/images/hero_lusaka_construction_1790707183929.jpg',
        title: 'Tower Crane & Structural Frame Assembly',
        description: 'High-density reinforced concrete columns and elevator cores.'
      }
    ]
  },
  {
    id: 'comp-5',
    name: 'Zambezi Plumbing & Mechanical Finishing',
    town: 'Mufulira',
    category: 'Plumbing & Finishing',
    nccGrade: 'NCC Grade 3',
    rating: 4.7,
    reviewsCount: 19,
    shortBio: 'Specialized industrial piping, commercial sanitary drainage, fire suppression systems, and architectural interior finishing for mining and retail.',
    fullDescription: 'Zambezi Plumbing & Mechanical delivers high-specification plumbing, HDPE butt fusion pipe laying, automated fire sprinkler installation, and commercial bathroom sanitization fittings. Operating across Mufulira, Kitwe, and Luanshya.',
    services: ['Industrial HDPE Piping', 'Automatic Fire Sprinkler Systems', 'Commercial Sanitary Sewerage', 'Solar Hot Water Systems', 'Epoxy Flooring & Wall Finishes'],
    phone: '+260 212 410312',
    whatsapp: '+260965319800',
    email: 'quotes@zambeziplumbing.zm',
    address: 'Main Street Commercial Zone, Mufulira, Zambia',
    isVerified: true,
    isFeatured: false,
    status: 'Active Trial',
    plan: 'Free Trial',
    trialDaysLeft: 18,
    leadClicks: 43,
    viewsCount: 620,
    joinedDate: 'Sep 2026',
    photos: [
      {
        id: 'p9',
        url: '/src/assets/images/solar_electrical_industrial_1790707221135.jpg',
        title: 'Industrial Plant Piping & Water Reticulation',
        description: 'High-pressure distribution manifold with pressure safety valves.'
      }
    ]
  }
];

export const TOWNS = ['All Towns', 'Kitwe', 'Ndola', 'Chingola', 'Lusaka', 'Mufulira', 'Luanshya'] as const;

export const CATEGORIES = [
  'All Categories',
  'Building & Civil',
  'Heavy Equipment Hire',
  'Electrical & Solar',
  'Plumbing & Finishing'
] as const;

export const NCC_GRADES = [
  'All Grades',
  'NCC Grade 1',
  'NCC Grade 2',
  'NCC Grade 3',
  'NCC Grade 4',
  'NCC Grade 5',
  'NCC Grade 6'
] as const;
