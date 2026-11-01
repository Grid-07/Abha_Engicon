// Single source of truth for the Abha Engicon portfolio site.
// Company details, contact numbers, vision/mission and the project list are
// transcribed from the printed BIMAL MANGAL GARDEN and SHRI GANESH ARPAN
// brochures. Nothing here is invented.
//
// Adding a project later means adding one entry to `live` (with its deployed
// `href`) — the counters, the headline and the enquiry dropdown all follow.

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
// The developments that live inside this site. `route` is the in-app path the
// banner hands off to; `site` is the standalone deployment, which still exists
// and still works but is no longer the way in from here.
// ---------------------------------------------------------------------------
export const live = [
  {
    slug: 'bimal-mangal-gardens',
    name: 'Bimal Mangal Gardens',
    status: 'Now selling',
    location: 'Biharsharif, Nalanda',
    image: 'images/projects/bimal-mangal-gardens.jpg',
    line: 'Two blocks of homes over a retail plinth, set around a landscaped courtyard and deck pool.',
    homes: 16,
    facts: [
      ['2', 'Blocks'],
      ['16', 'Residences'],
      ['10', 'Retail shops'],
    ],
    route: '/bimla-mangal-gardens',
    site: 'https://grid-07.github.io/Arpan_Vilas/',
  },
  {
    slug: 'shri-ganesh-arpan',
    name: 'Shri Ganesh Arpan',
    status: 'Now selling',
    location: 'Biharsharif, Nalanda',
    image: 'images/projects/shri-ganesh-hero.jpg',
    line: 'Two low-rise towers of two, three and four bedroom homes on the Ekangarsarai Main Road.',
    homes: 22,
    facts: [
      ['2', 'Towers'],
      ['22', 'Homes'],
      ['6', 'Layouts'],
    ],
    route: '/shri-ganesh-arpan',
    site: 'https://grid-07.github.io/Shri_Ganesh_Arpan/',
  },
]

// ---------------------------------------------------------------------------
// Everything below is derived. Add a project above and the copy, the counters
// and the headline all keep up.
// ---------------------------------------------------------------------------
const WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']

export const word = (n) => WORDS[n] || String(n)

export const counts = {
  live: live.length,
  homes: live.reduce((n, p) => n + (p.homes || 0), 0),
}

const addresses = (n) => `${word(n)} ${n === 1 ? 'address' : 'addresses'}`

export const brand = {
  name: 'Abha Engicon',
  wordmark: ['ABHA', 'ENGICON'],
  legal: 'Abha Engicon Pvt. Ltd.',
  tagline: `${addresses(counts.live)} open in Biharsharif.`,
  // No count here on purpose — the tagline directly above already carries it,
  // and repeating "two addresses open" twice reads as a stutter.
  intro:
    'A Biharsharif developer. Low-rise homes, a specification sheet we publish, and a sales desk that answers after handover.',
  credai: 'CREDAI Bihar Member · BR/PTN/168',
  established: 15,
}

export const stats = [
  { value: counts.live, suffix: '', label: 'Addresses open today' },
  { value: counts.homes, suffix: '', label: 'Homes in those addresses' },
  { value: 15, suffix: '', label: 'Years of the group' },
  { value: 2, suffix: '', label: 'Offices across Bihar & Jharkhand' },
]

export const disclaimer =
  'All details on this site are for easy information and concept purposes only, do not form part of any agreement. This is a tentative document and the promoter reserves the right to make variations and modifications.'
