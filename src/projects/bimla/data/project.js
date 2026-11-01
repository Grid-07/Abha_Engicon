// Single source of truth for all project content, taken from the
// ABHA ENGICON "BIMLA MANGAL GARDENS" printed brochure.

export const brand = {
  developer: 'ABHA ENGICON',
  developerFull: 'ABHA ENGICON PVT. LTD.',
  name: 'BIMLA MANGAL GARDENS',
  tagline: 'A Home That You Deserve',
  motto: 'Discover Your Dream Space… Fusion of Luxury & Comfort',
  years: 15,
  credai: 'CREDAI Bihar Member · BR/PTN/168',
}

export const contact = {
  siteAddress:
    'Bihar Sharif – Ekangar Road, Ward No. 48, Maghra, Biharsharif, Nalanda, Bihar',
  siteOffice:
    'Flat No. 101, Shri Ganesh Arpan Apartment, Biharsharif – Ekangar Road, Maghra, Biharsharif, Nalanda',
  regOffice:
    'GE, Ambika Enclave, Shiv Bagan, Upper Bazar, Opp. Governor House, Ranchi, Jharkhand',
  email: 'abhaengicon@gmail.com',
  phones: [
    { label: '+91 94610 75805', value: '919461075805' },
    { label: '+91 85214 56165', value: '918521456165' },
    { label: '+91 99057 05709', value: '919905705709' },
  ],
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Bimla+Mangal+Gardens+Maghra+Biharsharif+Nalanda',
}

export const heroStats = [
  { value: 15, suffix: '', label: 'Years of Excellence' },
  { value: 2, suffix: '', label: 'Residential Blocks' },
  { value: 8, suffix: '', label: 'Homes per Floor' },
  { value: 10, suffix: '', label: 'Retail Spaces' },
]

export const about = {
  eyebrow: 'About the Developer',
  title: 'A living experience crafted to admire in Biharsharif, Nalanda',
  body: [
    'Abha Engicon Private Limited is a real estate and infrastructure company committed to delivering excellence through innovation, precision and trust. With a strong foundation in engineering and construction, we specialise in creating developments that blend modern design with long-lasting quality.',
    'Driven by a passion for perfection, we focus on building spaces that not only meet expectations but exceed them — whether residential or commercial. Our projects reflect thoughtful planning, superior craftsmanship and a deep understanding of evolving urban lifestyles.',
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
// Residences — every number below is printed in the brochure's area tables.
// carpet / balcony / bua / sba are in square feet.
// ---------------------------------------------------------------------------
const unit = (no, type, carpet, balcony, bua, sba) => ({
  no: String(no).padStart(2, '0'),
  type,
  carpet,
  balcony,
  bua,
  sba,
})

export const blocks = [
  {
    id: 'a',
    name: 'Block A',
    floors: 'Retail + Residences',
    units: [
      unit(1, '3 BHK + 2T', 815, 134, 1032, 1341),
      unit(2, '3 BHK + 2T', 812, 49, 950, 1234),
      unit(3, '3 BHK + 2T', 837, 49, 976, 1268),
      unit(4, '3 BHK + 2T', 861, 140, 1084, 1409),
      unit(5, '3 BHK + 2T', 810, 135, 1028, 1335),
      unit(6, '2 BHK + 2T', 671, 49, 798, 1037),
      unit(7, '3 BHK + 2T', 826, 49, 962, 1249),
      unit(8, '3 BHK + 3T', 851, 138, 1080, 1404),
    ],
    plans: [
      {
        id: 'a-ground',
        label: 'Ground Floor · Retail',
        image: 'images/brochure/plan-a-ground.jpg',
        note: 'Five shops of 1,550 – 2,567 sq ft opening onto a 5\'-4" platform, served by a 7\'-10" passage, lift and stair lobby.',
      },
      {
        id: 'a-first',
        label: 'First Floor · Retail',
        image: 'images/brochure/plan-a-first.jpg',
        note: 'Five shops of 1,728 – 2,802 sq ft with 3\'-11" balconies on both faces.',
      },
      {
        id: 'a-upper',
        label: '2nd – 4th Floor · Residences',
        image: 'images/brochure/plan-a-upper.jpg',
        note: 'Eight homes per floor around a 2\'-13" wide central passage. Homes 1 & 5 open onto a 3\'-11" balcony.',
      },
    ],
  },
  {
    id: 'b',
    name: 'Block B',
    floors: 'Residences only',
    units: [
      unit(1, '3 BHK + 3T', 829, 139, 1054, 1369),
      unit(2, '3 BHK + 2T', 855, 49, 995, 1293),
      unit(3, '3 BHK + 2T', 872, 49, 1012, 1315),
      unit(4, '3 BHK + 3T', 856, 138, 1085, 1410),
      unit(5, '3 BHK + 3T', 825, 139, 1049, 1363),
      unit(6, '2 BHK + 2T', 711, 49, 840, 1091),
      unit(7, '3 BHK + 2T', 864, 49, 1002, 1302),
      unit(8, '3 BHK + 3T', 851, 138, 1080, 1404),
    ],
    plans: [
      {
        id: 'b-upper',
        label: '1st – 4th Floor · Residences',
        image: 'images/brochure/plan-b-upper.jpg',
        note: 'Four floors of eight homes each, arranged around the central passage with balconies on both the east and west faces.',
      },
    ],
  },
]

export const shops = {
  ground: [
    { no: '01', sba: 2567, size: "41'-6\" × 47'-1\"" },
    { no: '02', sba: 2189, size: "41'-6\" × 46'-8\"" },
    { no: '03', sba: 1550, size: "31'-6\" × 36'-0\"" },
    { no: '04', sba: 1634, size: "41'-6\" × 28'-10\"" },
    { no: '05', sba: 1611, size: "41'-6\" × 28'-5\"" },
  ],
  first: [
    { no: 'F-01', sba: 2709, size: "41'-6\" × 47'-1\"" },
    { no: 'F-02', sba: 2802, size: "41'-6\" × 46'-8\"" },
    { no: 'F-03', sba: 2206, size: "41'-6\" × 36'-5\"" },
    { no: 'F-04', sba: 1728, size: "41'-6\" × 28'-5\"" },
    { no: 'F-05', sba: 1765, size: "41'-6\" × 28'-5\"" },
  ],
}

export const amenities = [
  {
    icon: 'pool',
    title: 'Swimming Pool',
    text: 'A landscaped deck pool set between the two blocks.',
    image: 'images/brochure/amenity-swim.jpg',
  },
  {
    icon: 'gym',
    title: 'Gymnasium',
    text: 'Fully equipped fitness studio for residents.',
    image: 'images/brochure/amenity-gym.jpg',
  },
  {
    icon: 'play',
    title: "Kids' Play Area",
    text: 'Shaded play lawn with swings and open green.',
    image: 'images/brochure/amenity-pool.jpg',
  },
  {
    icon: 'shop',
    title: 'Shopping Arcade',
    text: 'Ten retail spaces at the podium level.',
    image: 'images/brochure/amenity-retail.jpg',
  },
]

export const amenityList = [
  'Video door phone on every main door',
  'CCTV in floor lobbies & common areas',
  'Access control at entrance lobbies',
  'Central security control room',
  'EV charging point in every parking bay',
  'Wi-Fi point in drawing / dining',
  'Water purifier & geyser points',
  'Fire fighting system',
  '24×7 electrical & water supply',
  'High-speed lifts with lobby',
  'Dedicated utility & laundry balcony',
  'Landscaped courtyard & walkways',
]

export const specifications = [
  {
    title: 'Dining & Drawing Room',
    rows: [
      ['Flooring', '1200×600 mm vitrified tiles (Somany / Kajaria / GC or equivalent)'],
      ['Doors', 'Flush door shutter with SS fittings, duly painted (Mayur / Green / Duro or equivalent)'],
      ['Windows', 'Full-height UPVC sliding doors in the dining space; three-track UPVC windows with float glass'],
    ],
  },
  {
    title: 'Bedrooms',
    rows: [
      ['Flooring', '1200×600 mm vitrified tiles (Somany / Kajaria / GC or equivalent)'],
      ['Walls', 'Putty with primer, ready to paint'],
      ['Doors', 'Flush door shutter with SS fittings, duly painted; fittings from Europa, Godrej or equivalent'],
      ['Windows', 'Three-track UPVC windows with float glass'],
    ],
  },
  {
    title: 'Kitchen',
    rows: [
      ['Flooring', 'Anti-skid ceramic tiles (Somany / Kajaria / GC or equivalent)'],
      ['Walls', 'Putty with primer, ready to paint'],
      ['Counter', 'Polished granite with a single-bowl stainless steel hand-made sink and drain board'],
      ['Supply', 'Provision for hot & cold water; single-lever CP fittings (CERA / Jaguar / Hindware or equivalent)'],
      ['Utility', 'Washing machine point, laundry balcony, water purifier & geyser points'],
    ],
  },
  {
    title: 'Toilets',
    rows: [
      ['Flooring', 'Ceramic tile flooring'],
      ['Walls', 'Vitrified tiles up to roof height'],
      ['Fixtures', 'Wall-mounted commode with concealed cistern; single-lever CP fittings (CERA / Jaguar / Hindware)'],
      ['Supply', 'Provision for hot & cold water'],
    ],
  },
  {
    title: 'Balcony & Corridor',
    rows: [
      ['Balcony flooring', 'Anti-skid ceramic tiles'],
      ['Balcony walls', 'Finished to match the bedrooms'],
      ['Corridor', 'Granite / vitrified tiles with plastic emulsion paint up to full height'],
    ],
  },
  {
    title: 'Lift Lobby',
    rows: [
      ['Flooring', 'Granite and GVT tiles'],
      ['Walls', 'Plastic emulsion paint with Italian marble / granite lift fascia'],
      ['Ceiling', 'Normal ceiling finish'],
    ],
  },
  {
    title: 'Electrical & Security',
    rows: [
      ['Wiring', 'Copper wiring — POLYCAB / KBI — in conduit, with modular switches (Schneider / Legrand / ABB)'],
      ['Security', 'Video door phone, CCTV in lobbies and common areas, access control at entrance lobbies'],
      ['EV', 'Provision for EV charging points in all parking'],
      ['External', 'All-weather exterior paint on textured walls'],
    ],
  },
]

export const proximity = [
  {
    group: 'Schools & Colleges',
    icon: 'school',
    items: [
      ['Daffodil Public School', '2 km'],
      ['RPS School', '1 km'],
      ['Loyola School', '2 km'],
      ['JP Polytechnic College', '—'],
    ],
  },
  {
    group: 'Hospitals',
    icon: 'hospital',
    items: [
      ['Ramanuj Memorial Hospital', '300 m'],
      ['Janaki Hospital', '2 km'],
      ['Nalanda Bone & Spine Centre', '2.1 km'],
      ['Sadar Hospital', '3 km'],
    ],
  },
  {
    group: 'Connectivity',
    icon: 'plane',
    items: [
      ['Golapur Airport', '1 km'],
      ['Ramchandrapur Bus Stand', '1 km'],
      ['Biharsharif Railway Station', '5 km'],
      ['DevSurai More', '1 km'],
    ],
  },
  {
    group: 'Shopping & Leisure',
    icon: 'bag',
    items: [
      ['Reliance Trends', '1 km'],
      ['Nageshwar Mall', '2 km'],
      ['Kisan Cinema Hall', '6.2 km'],
      ['Nala Road / Fish Market', '2 km'],
    ],
  },
  {
    group: 'Temples & Parks',
    icon: 'temple',
    items: [
      ['Shitla Mata Mandir, Maghra', '500 m'],
      ['Hiranya Parwat', '1.5 km'],
      ['Subhas Park', '4 km'],
    ],
  },
]

export const previousProjects = [
  'Arpan Vilash Block A',
  'Arpan Enclave Phase 1 & 2',
  'Majestic',
  'Rajrappa Arpan',
  'Sri Ganesh Arpan',
  'Amar Villa',
  'Nishesh Arpan',
  'Bhardwaj Arpan',
  'Ambika Enclave',
  'Gomti Laxmi Enclave',
  'Shailmanoram Enclave',
]

export const gallery = [
  { src: 'images/brochure/hero-walkway.jpg', caption: 'The arrival walkway' },
  { src: 'images/brochure/facade-front.jpg', caption: 'Front elevation' },
  { src: 'images/brochure/pool-courtyard.jpg', caption: 'Pool deck & courtyard' },
  { src: 'images/brochure/exterior-angle.jpg', caption: 'Retail podium' },
  { src: 'images/brochure/aerial-view.jpg', caption: 'Aerial view' },
  { src: 'images/brochure/amenity-retail.jpg', caption: 'Shopping arcade' },
]
