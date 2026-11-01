// Single source of truth for every figure and caption on the site.
// All areas, distances and specification wording are transcribed from the
// printed "SHRI GANESH ARPAN" brochure.

export const brand = {
  parent: 'ABHA ENGICON',
  parentFull: 'ABHA ENGICON PVT. LTD.',
  name: 'SHRI GANESH ARPAN',
  nameParts: ['SHRI GANESH', 'ARPAN'],
  sub: 'Plush · Peaceful · Pristine',
  presented: 'Presented by Abha Engicon',
  promise:
    "Experience the 'Arpan' lifestyle — glorious 15 years of excellence in crafting luxurious living.",
  years: 15,
  credai: 'CREDAI Bihar Member · BR/PTN/168',
}

export const contact = {
  siteAddress:
    'Biharsharif – Ekangarsarai Main Road, Maghra, Biharsharif, Nalanda, Bihar',
  siteOffice:
    'Flat No. 101, Shri Ganesh Arpan Apartment, Biharsharif – Ekangar Road, Maghra, Biharsharif, Nalanda',
  regOffice:
    'GE, Ambika Enclave, Shiv Bagan, Upper Bazar, Opp. Governor House, Ranchi, Jharkhand',
  email: 'abhaengicon@gmail.com',
  website: 'www.abhaengicon.com',
  phones: [
    { label: '+91 94610 75805', value: '919461075805' },
    { label: '+91 85214 56165', value: '918521456165' },
    { label: '+91 99057 05709', value: '919905705709' },
  ],
  whatsapp: '919461075805',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Shri+Ganesh+Arpan+Maghra+Biharsharif+Nalanda',
}

export const heroStats = [
  { value: 15, suffix: '', label: 'Years of Excellence' },
  { value: 2, suffix: '', label: 'Residential Towers' },
  { value: 22, suffix: '', label: 'Homes' },
  { value: 6, suffix: '', label: 'Unit Layouts' },
]

export const about = {
  eyebrow: 'The Parent Company',
  title: 'Fifteen years of building homes that hold their value',
  body: [
    'Abha Engicon Private Limited is a real estate and infrastructure company committed to delivering excellence through innovation, precision and trust. With a strong foundation in engineering and construction, we specialise in developments that blend modern design with long-lasting quality.',
    'Shri Ganesh Arpan is our latest address in Biharsharif — two low-rise towers of two, three and four bedroom homes on the Ekangarsarai Main Road, minutes from schools, hospitals and the market.',
  ],
  vision:
    'To redefine urban landscapes by creating landmark developments and becoming one of the most trusted and admired real estate companies in Bihar and Jharkhand.',
  mission:
    'To deliver high-quality, innovative and sustainable real estate solutions while maintaining the highest standards of professionalism, integrity and customer satisfaction.',
  values: [
    'Commitment to excellence in every project',
    'Strong ethics and transparent business practices',
    'Customer-centric approach in all decisions',
    'Continuous innovation and improvement',
    'Building long-term relationships through trust and reliability',
  ],
}

// ---------------------------------------------------------------------------
// Towers — every area below is printed in the brochure's tables (sq. ft.)
// carpet = RERA / carpet area, balcony = balcony area, bua = built-up area,
// sbua = super built-up area.
// ---------------------------------------------------------------------------
export const towers = [
  {
    id: 'a',
    name: 'A Tower',
    label: 'Tower A',
    floors: '1st to 4th floor residences',
    levels: 4,
    perFloor: 4,
    homes: 16,
    image: 'images/brochure/tower-a.jpg',
    plan: 'images/brochure/plan-a.jpg',
    blurb:
      'The wider of the two blocks, facing the Ekangarsarai Main Road with shops at ground level and four homes on each of the four floors above.',
    units: [
      {
        no: '01',
        type: '2BHK + 2T',
        short: '2 BHK',
        carpet: 667.88,
        balcony: 69.83,
        bua: 839.36,
        sbua: 1092,
        iso: 'images/brochure/iso-a1.jpg',
        note: 'Two bedrooms, two toilets, a corner living room and a balcony off the master bedroom.',
      },
      {
        no: '02',
        type: '3BHK + 2T',
        short: '3 BHK',
        carpet: 810.12,
        balcony: 66.06,
        bua: 989.15,
        sbua: 1286,
        iso: 'images/brochure/iso-a2.jpg',
        note: 'Three bedrooms with a wide living and dining spine running the depth of the plan.',
      },
      {
        no: '03',
        type: '3BHK + 2T',
        short: '3 BHK',
        carpet: 936.44,
        balcony: 71.44,
        bua: 1124.85,
        sbua: 1463,
        iso: 'images/brochure/iso-a3.jpg',
        note: 'The larger three bedroom — separate dining, utility balcony and a study nook.',
      },
      {
        no: '04',
        type: '3BHK + 3T',
        short: '3 BHK',
        carpet: 939.24,
        balcony: 89.73,
        bua: 1160.19,
        sbua: 1508,
        iso: 'images/brochure/iso-a4.jpg',
        note: 'Three bedrooms, three toilets and the deepest balcony stack in the block.',
      },
    ],
  },
  {
    id: 'b',
    name: 'B Tower',
    label: 'Tower B',
    floors: '2nd to 4th floor residences',
    levels: 3,
    perFloor: 2,
    homes: 6,
    image: 'images/brochure/tower-b.jpg',
    plan: 'images/brochure/plan-b.jpg',
    blurb:
      'Two homes to a floor, so every room gets a corner. The largest layouts in the project sit here, above the double-height retail frontage.',
    units: [
      {
        no: '01',
        type: '3BHK + 2T',
        short: '3 BHK',
        carpet: 1020,
        balcony: 126.21,
        bua: 1276.6,
        sbua: 1664,
        iso: 'images/brochure/iso-b1.jpg',
        note: 'Corner home with balconies on three sides and a 24′-wide living room.',
      },
      {
        no: '02',
        type: '3BHK + 2T',
        short: '3 BHK',
        carpet: 1010,
        balcony: 107.7,
        bua: 1244.09,
        sbua: 1616,
        iso: 'images/brochure/iso-b2.jpg',
        note: 'Mirror plan of 01, with the master suite on the quieter rear face.',
      },
    ],
  },
]

export const totalHomes = towers.reduce((n, t) => n + t.homes, 0)

// ---------------------------------------------------------------------------
// Highlights — the brochure's own list, nothing invented
// ---------------------------------------------------------------------------
export const highlights = [
  { icon: 'leaf', title: 'Terrace Garden', text: 'A planted roof deck shared by both towers.' },
  { icon: 'ev', title: 'EV-Ready Parking', text: 'Car parking with EV charging provision at every bay.' },
  { icon: 'tree', title: 'Lush Green Area', text: 'Landscaped setbacks and a planted frontage.' },
  { icon: 'lift', title: 'Lift', text: 'One lift per tower serving every residential floor.' },
  { icon: 'sparkle', title: 'Branded Fittings', text: 'Johnson, Kajaria, Rak, ABB and Schneider throughout.' },
  { icon: 'shield', title: 'Two-Tier Security', text: 'Guarded gate and floor-level supervision, round the clock.' },
  { icon: 'camera', title: 'CCTV', text: 'Coverage across the entrance, lobby and parking.' },
  { icon: 'wind', title: 'Well-Ventilated Rooms', text: 'Cross ventilation in every bedroom and living room.' },
  { icon: 'power', title: '24×7 Supply', text: 'Round-the-clock electricity and water to every home.' },
]

// ---------------------------------------------------------------------------
// Specifications — verbatim from the brochure's specification page
// ---------------------------------------------------------------------------
export const specifications = [
  {
    title: 'Structure',
    icon: 'structure',
    items: [
      'Earthquake-resistant structures with RCC column & pedestal',
      'Anti-termite treatment in foundation',
      'RCC columns, beams and slabs',
    ],
  },
  {
    title: 'Doors & Windows',
    icon: 'door',
    items: ['Flush doors in waterproof commercial ply', '3-track sliding UPVC windows with net'],
  },
  {
    title: 'Flooring',
    icon: 'floor',
    items: [
      '4×2 GVT vitrified floor tiles in the whole flat, except toilets',
      'Johnson / Kajaria / Rak',
    ],
  },
  {
    title: 'Bathroom',
    icon: 'bath',
    items: [
      'Floor ceramic tiles with dado in ceramic tiles up to roof height',
      'Standard basin provided in both toilets',
    ],
  },
  {
    title: 'Kitchen',
    icon: 'kitchen',
    items: [
      'Granite working platform with ceramic tile dado up to 24″ height',
      'Handmade stainless steel sink',
    ],
  },
  {
    title: 'Walls',
    icon: 'wall',
    items: [
      '10″ thick external and 5″ thick internal partition brickwork',
      'Wall putty on internal walls, texture finish on external walls',
    ],
  },
  {
    title: 'Sanitary Fittings',
    icon: 'tap',
    items: [
      'All C.P. or brass fittings of standard make',
      'White glazed vitreous sanitaryware',
      'Wall-hung commode with concealed cistern and diverter system in all bathrooms',
    ],
  },
  {
    title: 'Electrical',
    icon: 'bolt',
    items: [
      'Concealed conduit copper wiring, standard fittings and fixtures',
      'ABB / Schneider / Colours, with modular switches',
    ],
  },
  {
    title: 'Water Supply',
    icon: 'water',
    items: ['Through deep borewell to overhead tank'],
  },
  {
    title: 'EV Charging',
    icon: 'ev',
    items: ['EV charging provision in all car parking'],
  },
]

export const salient = [
  'RERA approved project',
  'Project approved by BSMC',
  'Construction with high quality materials',
  'Excellent location with all schools and market at walking distance',
  'Well furnished parking facility',
  'Easy transportation to anywhere in the city from the apartment',
  'Finance facility from banks',
  'Water harvesting system',
]

// ---------------------------------------------------------------------------
// Location
// ---------------------------------------------------------------------------
export const proximity = [
  {
    group: 'Schools & Colleges',
    icon: 'school',
    items: [
      { name: 'Daffodil Public School', dist: '2.4 km' },
      { name: 'RPS School', dist: '2.4 km' },
    ],
  },
  {
    group: 'Hospitals',
    icon: 'hospital',
    items: [
      { name: 'Janaki Hospital', dist: '2 km' },
      { name: 'Nalanda Bone & Spine Centre', dist: '2.1 km' },
      { name: 'Revival Hospital & Trauma Centre', dist: '3.1 km' },
    ],
  },
  {
    group: 'Travel',
    icon: 'plane',
    items: [
      { name: 'Golapur Airport', dist: '1 km' },
      { name: 'Ramchandarpur Bus Stand', dist: '2.9 km' },
      { name: 'Biharsharif Railway Station', dist: '5.8 km' },
    ],
  },
  {
    group: 'Shopping & Entertainment',
    icon: 'bag',
    items: [
      { name: 'Reliance Trends', dist: '1 km' },
      { name: 'Nageshwar Mall', dist: '2.6 km' },
      { name: 'Kisan Cinema Hall', dist: '6.2 km' },
    ],
  },
  {
    group: 'Temple',
    icon: 'temple',
    items: [{ name: 'Shitla Mandir, Maghra', dist: '0.92 km' }],
  },
  {
    group: 'Play & Activities',
    icon: 'park',
    items: [
      { name: 'Hiranya Parwat', dist: '1.5 km' },
      { name: 'Subhas Park', dist: '4.4 km' },
    ],
  },
]

export const gallery = [
  { src: 'images/brochure/hero-facade.jpg', caption: 'The two blocks from the main road', tag: 'Exterior' },
  { src: 'images/brochure/tower-a.jpg', caption: 'A Tower — road-side elevation', tag: 'Exterior' },
  { src: 'images/brochure/tower-b.jpg', caption: 'B Tower — retail frontage below', tag: 'Exterior' },
  { src: 'images/brochure/iso-a1.jpg', caption: 'A-01 · 2 BHK + 2T', tag: 'Interior' },
  { src: 'images/brochure/iso-a2.jpg', caption: 'A-02 · 3 BHK + 2T', tag: 'Interior' },
  { src: 'images/brochure/iso-a3.jpg', caption: 'A-03 · 3 BHK + 2T', tag: 'Interior' },
  { src: 'images/brochure/iso-a4.jpg', caption: 'A-04 · 3 BHK + 3T', tag: 'Interior' },
  { src: 'images/brochure/iso-b1.jpg', caption: 'B-01 · 3 BHK + 2T', tag: 'Interior' },
  { src: 'images/brochure/iso-b2.jpg', caption: 'B-02 · 3 BHK + 2T', tag: 'Interior' },
]

export const previousProjects = [
  { name: 'Nishesh Arpan', place: 'Biharsharif' },
  { name: 'Bhatwaji Arpan', place: 'Biharsharif' },
  { name: 'Rajappa Arpan', place: 'Biharsharif' },
  { name: 'Ambika Enclave', place: 'Ranchi' },
  { name: 'Gomti Luxmi Enclave', place: 'Biharsharif' },
  { name: 'Shalimargram Enclave', place: 'Biharsharif' },
  { name: 'Arpan Vilash — Block B', place: 'Biharsharif' },
  { name: 'Arpan Vilash — Block A', place: 'Biharsharif' },
]
