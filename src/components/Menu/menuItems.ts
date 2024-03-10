// Define a type for menu item
export type MenuItem = {
  label: string;
  link: string;
};

// Define an array of menu items
const menuItems: MenuItem[] = [
{
label: "Home",
link: "/"
},
{
label: "About",
link: "/about"
},
{
label: "Services",
link: "/services"
},
{
label: "Contact",
link: "/contact"
}
];

// Export the menu items array
export default menuItems;
