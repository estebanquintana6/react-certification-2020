import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Row } from 'react-bootstrap';

import { useYoutube } from '../../providers/Video';

import FavoriteList from '../FavoriteList';

function FavoriteVideos() {
  const history = useHistory();

  const { state, clearFavorites, removeFromFavorites } = useYoutube();

  const { favorites } = state;

  const toVideoView = (id) => {
    history.push(`/home/video/${id}`);
  };

  return (
    <>
      <Row className="mt-4 justify-content-center">
        <h2>Your favorites</h2>
      </Row>
      <Row className="mt-4 mb-4 justify-content-center">
        <Button variant="info" onClick={clearFavorites}>
          CLEAR FAVORITES
        </Button>
      </Row>
      <Row className="mt-4">
        <FavoriteList
          favorites={favorites}
          removeFromFavorites={removeFromFavorites}
          toVideoView={toVideoView}
        />
      </Row>
    </>
  );
}

export default FavoriteVideos;
