import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Col, Form, Jumbotron, Row } from 'react-bootstrap';

import VideoList from '../VideoList/VideoList.page';

import { useYoutube } from '../../providers/Video';

function VideoDashboard() {
  const [query, setQuery] = useState('');
  const history = useHistory();
  const { fetchVideos, state } = useYoutube();
  const { videos } = state;

  const getVideos = async () => {
    try {
      await fetchVideos(query);
    } catch (e) {}
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
  }, []);

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
      <VideoList videos={videos} toVideoView={toVideoView} />
    </>
  );
}

export default VideoDashboard;
