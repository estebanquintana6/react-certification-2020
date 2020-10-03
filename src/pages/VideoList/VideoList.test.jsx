import React from 'react';
import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import VideoList from './VideoList.page';
import { mockVideos } from '../../utils/mockVideoResponse';

describe('VideoList', () => {
  let videos;

  beforeEach(() => {
    videos = mockVideos;
  });

  it('should render one child per video', () => {
    render(
      <BrowserRouter>
        <VideoList
          toVideoView={jest.fn().mockImplementation(() => {})}
          videos={mockVideos}
        />
      </BrowserRouter>
    );
    const container = screen.getByTestId('video-container');
    expect(container.childElementCount).toBe(videos.length);
  });

  it('should render no children if no videos', () => {
    render(
      <BrowserRouter>
        <VideoList toVideoView={jest.fn().mockImplementation(() => {})} videos={[]} />
      </BrowserRouter>
    );
    const container = screen.getByTestId('video-container');
    expect(container.childElementCount).toBe(0);
  });
});
