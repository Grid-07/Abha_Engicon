// Single source of truth for the Abha Engicon portfolio site.
// Company details, contact numbers, vision/mission and the project list are
// transcribed from the printed BIMAL MANGAL GARDEN and SHRI GANESH ARPAN
// brochures. Nothing here is invented.

export const brand = {
  name: 'Abha Engicon',
  wordmark: ['ABHA', 'ENGICON'],
  legal: 'Abha Engicon Pvt. Ltd.',
  tagline: 'Two addresses open. Ten already lived in.',
  intro:
    'A Biharsharif developer. Two addresses open, ten already handed over — and a specification sheet we are happy to publish.',
  credai: 'CREDAI Bihar Member · BR/PTN/168',
  established: 15,
}

export const contact = {
  phones: [
    { label: '+91 94610 75805', value: '919461075805' },
    { label: '+91 85214 56165', value: '918521456165' },
    { label: '+91 99057 05709', value: '919905705709' },
  ],
  whatsapp: '919461075805',
  email: 'abhaengicon@gmail.com',
  website: 'www.abhaengicon.com',
  regOffice: {
    label: 'Registered office',
    lines: [
      'GE, Ambika Enclave, Shiv Bagan,',
      'Upper Bazar, opp. Governor House,',
      'Ranchi, Jharkhand',
    ],
  },
  siteOffice: {
    label: 'Site office',
    lines: [
      'Flat No. 101, Shri Ganesh Arpan Apartment,',
      'Biharsharif – Ekangar Road, Maghra,',
      'Biharsharif, Nalanda, Bihar',
    ],
  },
  siteAddress: 'Biharsharif – Ekangarsarai Main Road, Maghra, Biharsharif, Nalanda',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Shri+Ganesh+Arpan+Maghra+Biharsharif+Nalanda',
}

export const about = {
  eyebrow: 'The company',
  title: 'Fifteen years of building, one address at a time',
  body: [
    'Abha Engicon Private Limited is a real estate and infrastructure company committed to delivering excellence through innovation, precision and trust. With a strong foundation in engineering and construction, we specialise in developments that blend modern design with long-lasting quality.',
    'Our work in Biharsharif is deliberately low-rise and deliberately small. Fewer homes per floor, wider decks, cross-ventilated rooms, and retail at grade so the street outside stays alive after dark.',
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
// The two developments that have their own microsites. `href` points at the
// deployed site, so the parent portfolio is the single entry point for both.
// ---------------------------------------------------------------------------
export const live = [
  {
    slug: 'bimal-mangal-gardens',
    name: 'Bimal Mangal Gardens',
    status: 'Now selling',
    location: 'Biharsharif, Nalanda',
    image: 'images/projects/bimal-mangal-gardens.jpg',
    line: 'Two blocks of homes over a retail plinth, set around a landscaped courtyard and deck pool.',
    facts: [
      ['2', 'Blocks'],
      ['16', 'Residences'],
      ['10', 'Retail shops'],
    ],
    href: 'https://grid-07.github.io/Arpan_Vilas/',
  },
  {
    slug: 'shri-ganesh-arpan',
    name: 'Shri Ganesh Arpan',
    status: 'Now selling',
    location: 'Biharsharif, Nalanda',
    image: 'images/projects/shri-ganesh-hero.jpg',
    line: 'Two low-rise towers of two, three and four bedroom homes on the Ekangarsarai Main Road.',
    facts: [
      ['2', 'Towers'],
      ['22', 'Homes'],
      ['6', 'Layouts'],
    ],
    href: 'https://grid-07.github.io/Shri_Ganesh_Arpan/',
  },
]

// ---------------------------------------------------------------------------
// Delivered addresses, in the order the brochure prints them.
// ---------------------------------------------------------------------------
export const delivered = [
  { name: 'Arpan Vilash', note: 'Blocks A & B', image: 'images/projects/arpan-vilash-a.jpg' },
  { name: 'Arpan Enclave', note: 'Phase 1 & 2', image: 'images/projects/arpan-enclave.jpg' },
  { name: 'Majestic', note: 'Apartments', image: 'images/projects/majestic.jpg' },
  { name: 'Rajrappa Arpan', note: 'Apartments', image: 'images/projects/rajrappa-arpan.jpg' },
  { name: 'Amar Villa', note: 'Apartments', image: 'images/projects/amar-villa.jpg' },
  { name: 'Nishesh Arpan', note: 'Apartments', image: 'images/projects/nishesh-arpan.jpg' },
  { name: 'Bhardwaj Arpan', note: 'Apartments', image: 'images/projects/bhardwaj-arpan.jpg' },
  { name: 'Ambika Enclave', note: 'Apartments', image: 'images/projects/ambika-enclave.jpg' },
  { name: 'Gomti Laxmi Enclave', note: 'Apartments', image: 'images/projects/gomti-laxmi-enclave.jpg' },
  { name: 'Shailmanoram Enclave', note: 'Apartments', image: 'images/projects/shailmanoram-enclave.jpg' },
]

export const stats = [
  { value: 12, suffix: '', label: 'Addresses delivered or selling' },
  { value: 38, suffix: '', label: 'Homes in the two live projects' },
  { value: 15, suffix: '', label: 'Years of the group' },
  { value: 2, suffix: '', label: 'Offices across Bihar & Jharkhand' },
]

export const disclaimer =
  'All details on this site are for easy information and concept purposes only, and do not form part of any agreement. This is a tentative document and the promoter reserves the right to make variations and modifications.'
