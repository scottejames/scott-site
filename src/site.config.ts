// Site-wide settings. Add a page by creating it in src/pages and listing it in `nav`.
export const site = {
  name: 'Scott James',
  description:
    'Developer experience leader, ex-programmer, long-distance hiker and Scout leader from Mid Sussex.',
  nav: [
    { href: '/', label: 'Home' },
    { href: '/about/', label: 'About' },
    { href: '/projects/', label: 'Projects' },
    { href: '/blog/', label: 'Writing' },
    { href: '/private/', label: 'Private' },
  ],
  // Page view counts. Set to '' to turn off. Stats: https://scottejames.goatcounter.com
  goatcounter: 'https://scottejames.goatcounter.com/count',
  links: [
    { href: 'https://www.linkedin.com/in/scottejames/', label: 'LinkedIn' },
    { href: 'https://github.com/scottejames', label: 'GitHub' },
  ],
};
