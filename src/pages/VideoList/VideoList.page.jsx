import React from 'react';
import { Row, Card, Col } from 'react-bootstrap';

const VideoList = ({ videos, toVideoView }) => {
  return (
    <Row className="mt-2 mb-4" data-testid="video-container">
      {videos.map((video) => {
        return (
          <Col md={3} className="mt-4" key={video.id.videoId}>
            <Card style={{ maxHeight: '300pt', overflow: 'scroll' }}>
              <Card.Img
                variant="top"
                style={{ cursor: 'pointer' }}
                src={video.snippet.thumbnails.medium.url}
                onClick={() => toVideoView(video.id.videoId)}
              />
              <Card.Body>
                <Card.Title>{video.snippet.title}</Card.Title>
                <Card.Text>{video.snippet.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default VideoList;
