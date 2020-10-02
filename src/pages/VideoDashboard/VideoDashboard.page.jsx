import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, Col, Form, Jumbotron, Row } from 'react-bootstrap';

import { useYoutube } from '../../providers/Video';

function VideoDashboard() {
  const [query, setQuery] = useState('');
  const history = useHistory();
  const { fetchVideos, state } = useYoutube();
  const { videos } = state;

  const getVideos = async () => {
    try {
      await fetchVideos(query);
    } catch (e) {
      console.log(e);
    }
  };

  const handleInputChange = async (e) => {
    setQuery(e.target.value);
  };

  const handleSearchButton = async () => {
    await getVideos();
  };

  const toVideoView = (id) => {
    history.push(`/home/video/${id}`);
  };

  useEffect(() => {
    if (videos.length === 0) {
      getVideos();
    }
  });

  return (
    <>
      <Row className="mt-4 justify-content-center">
        <h2>Welcome to my challange</h2>
      </Row>
      <Row className="mt-4">
        <Col>
          <Jumbotron style={{ padding: '1rem 2rem' }}>
            <Form>
              <Row>
                <Form.Group as={Col} md={10} controlId="formBasicEmail">
                  <Form.Label>Search something cool!</Form.Label>
                  <Form.Control
                    placeholder="Type something..."
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Col md={2}>
                  <Button
                    variant="info"
                    className="mt-4 p-3"
                    onClick={handleSearchButton}
                  >
                    Search
                  </Button>
                </Col>
              </Row>
            </Form>
          </Jumbotron>
        </Col>
      </Row>
      <Row className="mt-2 mb-4">
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
    </>
  );
}

export default VideoDashboard;
