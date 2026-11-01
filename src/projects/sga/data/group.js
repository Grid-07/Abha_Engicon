// The group, as one site.
//
// These were absolute URLs while the three sites were separate deployments.
// Now that both projects live inside this one, every entry is an in-app route:
// nothing here leaves the parent, and the standalone deployments of these two
// projects are not linked from anywhere in it.
export const group = {
  sites: [
    { id: 'parent', label: 'Abha Engicon', route: '/' },
    { id: 'bimal', label: 'Bimal Mangal Gardens', route: '/bimla-mangal-gardens' },
    { id: 'sga', label: 'Shri Ganesh Arpan', route: '/shri-ganesh-arpan' },
  ],
}
