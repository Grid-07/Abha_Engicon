// The Abha Engicon group is three separate deployments, so these addresses
// have to be absolute — a relative link would jump inside whichever site you
// happen to be standing on. They are the eventual GitHub Pages URLs; the two
// project sites are still local, so until they are published these two links
// will 404. Nothing else in the app depends on them.
export const group = {
  parent: 'https://grid-07.github.io/Abha_Engicon/',
  projects: 'https://grid-07.github.io/Abha_Engicon/projects',
  sites: [
    {
      id: 'parent',
      label: 'Abha Engicon',
      href: 'https://grid-07.github.io/Abha_Engicon/',
    },
    {
      id: 'bimal',
      label: 'Bimal Mangal Gardens',
      href: 'https://grid-07.github.io/Arpan_Vilas/',
    },
    {
      id: 'sga',
      label: 'Shri Ganesh Arpan',
      href: 'https://grid-07.github.io/Shri_Ganesh_Arpan/',
    },
  ],
}
