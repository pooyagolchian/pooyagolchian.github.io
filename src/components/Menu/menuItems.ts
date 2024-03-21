export type MenuItem = {
  label: string
  link: string
}

// Define an array of menu items
const menuItems: MenuItem[] = [
  {
    label: 'Home',
    link: '/',
  },
  {
    label: 'About',
    link: '/about',
  },
  {
    label: 'Blog',
    link: '/blog',
  },
  {
    label: 'Tags',
    link: '/tags',
  },
]

// Export the menu items array
export default menuItems
