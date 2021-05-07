import React from 'react';
import { BrowserRouter as Router, Switch} from 'react-router-dom';
import { Home, Dashboard, Signin, Signup, Addmeal, NotFound, EditMeal} from './pages';
import * as ROUTES from './constants/routes';
import { IsUserRedirect, ProtectedRoute } from './helpers/routes';
import { useAuthListener} from './hooks';

export default function App() {
  const {user} = useAuthListener();

  return (
    <Router>

      <Switch>
        

        <IsUserRedirect 
          user={user} 
          loggedInPath={ROUTES.DASHBOARD} 
          path={ROUTES.HOME}
          exact
        >
          <Home/>
        </IsUserRedirect>

        <ProtectedRoute
          user={user}
          path={ROUTES.DASHBOARD}
          exact
        >
          <Dashboard/>
        </ProtectedRoute>

        <ProtectedRoute
          user={user}
          path={ROUTES.EDITMEAL}
          exact
        >
          <EditMeal/>
        </ProtectedRoute>

        <ProtectedRoute
          user={user}
          path={ROUTES.ADDMEAL}
          exact
        >
          <Addmeal/>
        </ProtectedRoute>

        <IsUserRedirect 
          user={user} 
          loggedInPath={ROUTES.DASHBOARD} 
          path={ROUTES.SIGNIN}
          exact
        >
          <Signin/>
        </IsUserRedirect>

        <IsUserRedirect 
          user={user} 
          loggedInPath={ROUTES.DASHBOARD} 
          path={ROUTES.SIGNUP}
          exact
        >
          <Signup/>
        </IsUserRedirect>

        <IsUserRedirect 
          user={user} 
          loggedInPath="*"
          path="*"
        >
          <NotFound/>
        </IsUserRedirect>
      </Switch>

      

    </Router>
  );
}