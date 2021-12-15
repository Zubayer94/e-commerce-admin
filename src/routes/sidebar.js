/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: '/app/dashboard', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
  },

  {
    icon: 'PagesIcon',
    name: 'Products',
    routes: [
      // submenu
      {
        path: '/app/products',
        name: 'Product List',
      },
      {
        path: '/app/products-create',
        name: 'Product Create',
      },
    ],
  },
  
  {
    icon: 'PagesIcon',
    name: 'Category',
    routes: [
      // submenu
      {
        path: '/app/categories',
        name: 'Category List',
      },
      {
        path: '/app/category-create',
        name: 'Category Create',
      },
    ],
  },
  
  // {
  //   icon: 'PagesIcon',
  //   name: 'Pages',
  //   routes: [
  //     // submenu
  //     {
  //       path: '/login',
  //       name: 'Login',
  //     },
  //     {
  //       path: '/create-account',
  //       name: 'Create account',
  //     },
  //     {
  //       path: '/forgot-password',
  //       name: 'Forgot password',
  //     },
  //     {
  //       path: '/app/404',
  //       name: '404',
  //     },
  //     {
  //       path: '/app/blank',
  //       name: 'Blank',
  //     },
  //   ],
  // },
]

export default routes
