import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import VideoView from './VideoView.page';

import YoutubeProvider from '../../providers/Video';
import AuthProvider from '../../providers/Auth';

describe('VideoView', () => {
  it('renders VideoView component', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <YoutubeProvider>
            <VideoView />
          </YoutubeProvider>
        </AuthProvider>
      </BrowserRouter>
    );
  });
});
