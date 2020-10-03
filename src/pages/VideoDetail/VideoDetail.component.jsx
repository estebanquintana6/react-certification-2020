import React from 'react';
import { Button, Col, Jumbotron, Row } from 'react-bootstrap';

const VideoDetail = ({
  video,
  favoriteAlready,
  authenticated,
  addToFavorites,
  relatedVideos,
  toVideoPage,
}) => {
  return (
    <div data-testid="video-container">
      <Row className="mt-4 mb-4 justify-content-center">
        <h3>{video.snippet.title}</h3>
      </Row>
      <div data-testid="favorite-button">
        {!favoriteAlready && authenticated && (
          <Row className="mt-4 mb-4 justify-content-center">
            <Button variant="info" onClick={() => addToFavorites(video)}>
              ADD TO FAVORITES
            </Button>
          </Row>
        )}
      </div>
      <Row className="mt-2 mb-4">
        <Col md={9} style={{ height: '450pt' }}>
          <div style={{ height: '100%' }}>
            <iframe
              style={{ width: '100%', height: '100%' }}
              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.id}
              data-testid={`video-${video.id}`}
              allowFullScreen
            />
          </div>
        </Col>
        <Col md={3} style={{ maxHeight: '450pt', overflow: 'scroll' }}>
          <Jumbotron>
            <Row>
              <h4>Related videos</h4>
            </Row>
            <div data-testid="related-videos-container">
              {relatedVideos?.map((v) => (
                <Row key={v.id.videoId}>
                  <Col md={12}>
                    <img
                      src={v.snippet.thumbnails.medium.url}
                      alt={v.snippet.title}
                      style={{ width: '100%', cursor: 'pointer' }}
                      onClick={() => toVideoPage(v.id.videoId)}
                    />
                  </Col>
                  <Col md={12}>
                    <div>
                      <p>{v.snippet.title}</p>
                    </div>
                  </Col>
                </Row>
              ))}
            </div>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col>
          <Jumbotron>
            <p>{video.snippet.description}</p>
          </Jumbotron>
        </Col>
      </Row>
    </div>
  );
};

export default VideoDetail;
