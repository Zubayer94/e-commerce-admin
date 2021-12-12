import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'
import PrivateRoutes from './utils/PrivateRoutes'
import PublicRoutes from './utils/PublicRoutes'

const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const CreateAccount = lazy(() => import('./pages/CreateAccount'))
// const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))

function App() {
  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>

          <PublicRoutes exact path="/login" >
            <Login />
          </PublicRoutes>
          <PublicRoutes exact path="/create-account" >
            <CreateAccount />
            {/* <Route path="/login" component={Login} /> */}
          </PublicRoutes>
          {/* <Route path="/forgot-password" component={ForgotPassword} /> */}

          {/* Place new routes over this */}
          <PrivateRoutes>
            <Route path="/" component={Layout} />
          </PrivateRoutes>
          
          {/* If you have an index page, you can remothis Redirect */}
          {/* <Redirect exact from="/" to="/app" /> */}
        </Switch>
      </Router>
    </>
  )
}

export default App
