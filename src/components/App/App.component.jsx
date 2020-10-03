import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

import AuthProvider from '../../providers/Auth';
import YoutubeProvider from '../../providers/Video';
import HomePage from '../../pages/Home';
import LoginPage from '../../pages/Login';
import NotFound from '../../pages/NotFound';
import Layout from '../Layout';

function App() {
  return (
    <BrowserRouter>
      <YoutubeProvider>
        <AuthProvider>
          <Layout>
            <Switch>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route path="/home">
                <HomePage />
              </Route>
              <Route exact path="/login">
                <LoginPage />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </Layout>
        </AuthProvider>
      </YoutubeProvider>
    </BrowserRouter>
  );
}

export default App;
