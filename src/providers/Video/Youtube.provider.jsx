import React, { useContext, useEffect, useReducer, useCallback } from 'react';
import YoutubeReducer from '../../reducers/youtubeReducer';

import {
  CLEAR_FAVORITES,
  SEARCH_VIDEOS,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  RESTORE_STATE,
} from '../../actions/youtubeActions';

import { storage } from '../../utils/storage';
import { STATE_STORAGE } from '../../utils/constants';

import { queryVideos } from '../../api/youtube/youtube.api';

const YoutubeContext = React.createContext(null);

function useYoutube() {
  const context = useContext(YoutubeContext);
  if (!context) {
    throw new Error(`cannot use this without a YoutubeProvider`);
  }
  return context;
}

function YoutubeProvider({ children }) {
  const [state, dispatch] = useReducer(YoutubeReducer, {
    videos: [],
    favorites: [],
  });

  useEffect(() => {
    const storedState = storage.get(STATE_STORAGE) || null;
    dispatch({
      type: RESTORE_STATE,
      payload: {
        videos: storedState?.videos || [],
        favorites: storedState?.favorites || [],
      },
    });
  }, []);

  const addToFavorites = useCallback((video) => {
    dispatch({ type: ADD_TO_FAVORITES, payload: video });
  }, []);

  const removeFromFavorites = useCallback((video) => {
    dispatch({ type: REMOVE_FROM_FAVORITES, payload: video });
  }, []);

  const fetchVideos = useCallback(async (params) => {
    const result = await queryVideos(params);
    if (result.status === 200) {
      dispatch({ type: SEARCH_VIDEOS, payload: result.data.items });
    }
  }, []);

  const clearFavorites = useCallback(() => {
    dispatch({ type: CLEAR_FAVORITES });
  }, []);

  return (
    <YoutubeContext.Provider
      value={{ addToFavorites, clearFavorites, removeFromFavorites, fetchVideos, state }}
    >
      <div data-testid="youtube-provider">{children}</div>
    </YoutubeContext.Provider>
  );
}

export { useYoutube };
export default YoutubeProvider;
