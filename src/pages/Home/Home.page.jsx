import React, { useRef } from 'react';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from '../../components/Header';

import VideoDashboard from '../VideoDashboard';
import VideoView from '../VideoView';
import FavoriteVideos from '../FavoriteVideos';

import { useAuth } from '../../providers/Auth';
import './Home.styles.css';

function HomePage() {
  const history = useHistory();
  const sectionRef = useRef(null);
  const { authenticated, logout } = useAuth();

  function deAuthenticate(event) {
    event.preventDefault();
    logout();
    history.push('/');
  }

  return (
    <section ref={sectionRef}>
      <Header
        history={history}
        deAuthenticate={deAuthenticate}
        authenticated={authenticated}
      />
      <Container>
        <Switch>
          <Route exact path="/home">
            <VideoDashboard />
          </Route>
          <Route path="/home/favorites">
            {authenticated ? (
              <FavoriteVideos />
            ) : (
              <div className="homepage">
                <Link to="/login">let me in →</Link>
              </div>
            )}
          </Route>
          <Route path="/home/video/:id">
            <VideoView />
          </Route>
        </Switch>
      </Container>
    </section>
  );
}

export default HomePage;
