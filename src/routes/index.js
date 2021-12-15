import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Product = lazy(() => import('../pages/Product/Product'))
const ProductCreate = lazy(() => import('../pages/Product/ProductCreate'))
const ProductUpdate = lazy(() => import('../pages/Product/ProductUpdate'))
const Category = lazy(() => import('../pages/Category/Category'))
const CategoryCreate = lazy(() => import('../pages/Category/CategoryCreate'))
const CategoryUpdate = lazy(() => import('../pages/Category/CategoryUpdate'))

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/products', // the url
    component: Product, // view rendered
  },
  {
    path: '/products-create', // the url
    component: ProductCreate, // view rendered
  },
  {
    path: '/products-update/:id', // the url
    component: ProductUpdate, // view rendered
  },
  {
    path: '/categories', // the url
    component: Category, // view rendered
  },
  {
    path: '/category-create', // the url
    component: CategoryCreate, // view rendered
  },
  {
    path: '/category-update/:id', // the url
    component: CategoryUpdate, // view rendered
  },
]

export default routes
