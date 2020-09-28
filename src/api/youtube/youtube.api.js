import axios from 'axios';
import { youtubeApiKey } from '../../config/apiKeys';

const youtubeApi = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  timeout: 10000,
  params: {
    part: 'snippet',
    maxResults: 10,
    key: youtubeApiKey,
  },
});

export const queryVideos = (query) => {
  return youtubeApi.get('/search', {
    params: { q: query, type: 'video' },
  });
};

export const getVideoById = async (id) => {
  return youtubeApi.get('/videos', {
    params: {
      id,
    },
  });
};

export const getRelatedVideos = async (id) => {
  return youtubeApi.get('/search', {
    params: {
      type: 'video',
      maxResults: 5,
      relatedToVideoId: id,
    },
  });
};
