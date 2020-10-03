import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

const FavoriteList = ({ favorites, removeFromFavorites, toVideoView }) => {
  return (
    <Row className="mt-4" data-testid="favorite-test-container">
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
  );
};

export default FavoriteList;
