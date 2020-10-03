import React from 'react';
import { render } from '@testing-library/react';
import FavoriteVideos from './FavoriteVideos.page';

import YoutubeProvider from '../../providers/Video/Youtube.provider';

describe('App', () => {
  it('renders favorite videos component', () => {
    render(
      <YoutubeProvider>
        <FavoriteVideos />
      </YoutubeProvider>
    );
  });
});
