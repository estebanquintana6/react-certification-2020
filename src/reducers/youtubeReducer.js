import {
  SEARCH_VIDEOS,
  CLEAR_FAVORITES,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  RESTORE_STATE,
} from '../actions/youtubeActions';

import { STATE_STORAGE } from '../utils/constants';

import { storage } from '../utils/storage';

const YoutubeReducer = (state, action) => {
  switch (action.type) {
    case RESTORE_STATE: {
      return { ...action.payload };
    }
    case SEARCH_VIDEOS: {
      const result = {
        ...state,
        videos: action.payload,
      };
      storage.set(STATE_STORAGE, result);
      return result;
    }
    case ADD_TO_FAVORITES: {
      const favorites = [...state.favorites, action.payload];
      const result = {
        ...state,
        favorites: [...new Set(favorites)],
      };
      storage.set(STATE_STORAGE, result);
      return result;
    }
    case REMOVE_FROM_FAVORITES: {
      const newFavorites = state.favorites.filter((f) => f.id !== action.payload.id);
      const result = {
        ...state,
        favorites: newFavorites,
      };
      storage.set(STATE_STORAGE, result);
      return result;
    }
    case CLEAR_FAVORITES: {
      const result = {
        ...state,
        favorites: [],
      };
      storage.set(STATE_STORAGE, result);
      return result;
    }
    default:
      return state;
  }
};

export default YoutubeReducer;
