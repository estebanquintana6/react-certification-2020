/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useYoutube } from '../../providers/Video';
import { useAuth } from '../../providers/Auth';

import { getRelatedVideos, getVideoById } from '../../api/youtube/youtube.api';

import VideoDetail from '../VideoDetail';

function VideoView() {
  const { id } = useParams();

  const history = useHistory();

  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState(null);
  const [favoriteAlready, setFavoriteAlready] = useState(false);
  const { state, addToFavorites } = useYoutube();
  const { authenticated } = useAuth();
  const { favorites } = state;

  const toVideoPage = (videoId) => {
    history.push(`/home/video/${videoId}`);
  };

  useEffect(() => {
    const fetchRelatedVideos = async () => {
      try {
        const response = await getRelatedVideos(id);
        setRelatedVideos(response.data.items);
      } catch (e) {}
    };

    const fetchVideo = async () => {
      try {
        const response = await getVideoById(id);
        setVideo(response.data.items[0]);
      } catch (e) {}
    };

    const aux = favorites.find((favorite) => id === favorite.id);
    if (aux) setFavoriteAlready(true);
    else setFavoriteAlready(false);

    fetchVideo();
    fetchRelatedVideos();
  }, [favorites, id]);

  return (
    <>
      {video && (
        <VideoDetail
          video={video}
          favoriteAlready={favoriteAlready}
          authenticated={authenticated}
          addToFavorites={addToFavorites}
          relatedVideos={relatedVideos}
          toVideoPage={toVideoPage}
        />
      )}
    </>
  );
}

export default VideoView;
