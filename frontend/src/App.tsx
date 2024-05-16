import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

import Homepage from './views/Homepage';
import Registerpage from './views/Registerpage';
import Loginpage from './views/Loginpage';
import Dashboard from './views/Dashboard';
import MyWatchList from './views/MyWatchList';
import Navbar from './views/Navbar';
import Layout from './views/Layout';

function App() {
  return (
    <Router>
      <AuthProvider>
          <Switch>
            <PrivateRoute path="/dashboard">
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
            <PrivateRoute path="/watchlist">
              <Layout>
                <MyWatchList />
              </Layout>
            </PrivateRoute>
              <Route path="/login" component={Loginpage} />
              <Route path="/register" component={Registerpage} />
            <Layout>
              <Route path="/" component={Homepage} />
            </Layout>
          </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
