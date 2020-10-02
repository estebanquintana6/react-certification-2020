/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Button, Col, Row, Jumbotron } from 'react-bootstrap';

import { useYoutube } from '../../providers/Video';
import { getRelatedVideos, getVideoById } from '../../api/youtube/youtube.api';

function VideoView() {
  const { id } = useParams();

  const history = useHistory();

  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState(null);
  const [favoriteAlready, setFavoriteAlready] = useState(false);
  const { state, addToFavorites } = useYoutube();
  const { videos, favorites } = state;

  const toVideoPage = (videoId) => {
    history.push(`/home/video/${videoId}`);
  };

  useEffect(() => {
    const fetchRelatedVideos = async () => {
      try {
        const response = await getRelatedVideos(id);
        setRelatedVideos(response.data.items);
      } catch (e) {
        console.log(e);
      }
    };

    const fetchVideo = async () => {
      try {
        const response = await getVideoById(id);
        setVideo(response.data.items[0]);
      } catch (e) {
        console.log(e);
      }
    };

    const aux = favorites.find((favorite) => id === favorite.id);
    if (aux) setFavoriteAlready(true);
    else setFavoriteAlready(false);

    fetchVideo();
    fetchRelatedVideos();
  }, [videos, id]);

  return (
    <>
      {video && (
        <>
          <Row className="mt-4 mb-4 justify-content-center">
            <h3>{video.snippet.title}</h3>
          </Row>
          {!favoriteAlready && (
            <Row className="mt-4 mb-4 justify-content-center">
              <Button variant="info" onClick={() => addToFavorites(video)}>
                ADD TO FAVORITES
              </Button>
            </Row>
          )}
          <Row className="mt-2 mb-4">
            <Col md={9} style={{ height: '450pt' }}>
              <div style={{ height: '100%' }}>
                <iframe
                  style={{ width: '100%', height: '100%' }}
                  src={`https://www.youtube.com/embed/${id}`}
                  title={id}
                  allowFullScreen
                />
              </div>
            </Col>
            <Col md={3} style={{ maxHeight: '450pt', overflow: 'scroll' }}>
              <Jumbotron>
                <Row>
                  <h4>Related videos</h4>
                </Row>
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
        </>
      )}
    </>
  );
}

export default VideoView;
