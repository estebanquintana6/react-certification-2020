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
      {authenticated ? (
        <>
          <Header deAuthenticate={deAuthenticate} />
          <Container>
            <Switch>
              <Route exact path="/home">
                <VideoDashboard />
              </Route>
              <Route path="/home/favorites">
                <FavoriteVideos />
              </Route>
              <Route path="/home/video/:id">
                <VideoView />
              </Route>
            </Switch>
          </Container>
        </>
      ) : (
        <div className="homepage">
          <Link to="/login">let me in →</Link>
        </div>
      )}
    </section>
  );
}

export default HomePage;
