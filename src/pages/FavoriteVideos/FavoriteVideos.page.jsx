import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, Col, Row } from 'react-bootstrap';

import { useYoutube } from '../../providers/Video';

function FavoriteVideos() {
  const history = useHistory();

  const { state, clearFavorites, removeFromFavorites } = useYoutube();
  const { favorites } = state;

  const toVideoView = (id) => {
    history.push(`/home/video/${id}`);
  };

  console.log(favorites);

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
        {favorites.map((video) => {
          return (
            <Col md={3} className="mt-4" key={video.id}>
              <Card style={{ maxHeight: '300pt', overflow: 'scroll' }}>
                <Card.Img
                  variant="top"
                  style={{ cursor: 'pointer' }}
                  src={video.snippet.thumbnails.medium.url}
                  onClick={() => toVideoView(video.id)}
                />
                <Card.Body>
                  <Card.Title>{video.snippet.title}</Card.Title>
                  <Row className="justify-content-center mb-4">
                    <Button variant="danger" onClick={() => removeFromFavorites(video)}>
                      Remove from favorites
                    </Button>
                  </Row>
                  <Card.Text>{video.snippet.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}{' '}
      </Row>
    </>
  );
}

export default FavoriteVideos;
