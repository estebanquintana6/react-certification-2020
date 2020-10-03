import React from 'react';
import { screen, render } from '@testing-library/react';
import VideoDetail from './VideoDetail.component';
import { mockVideoView, mockVideos } from '../../utils/mockVideoResponse';

describe('VideoList', () => {
  it('renders the video according to the content & shows favorite button', () => {
    render(
      <VideoDetail
        video={mockVideoView}
        favoriteAlready={false}
        authenticated
        addToFavorites={jest.fn()}
        relatedVideos={[]}
        toVideoPage={jest.fn()}
      />
    );

    const video = screen.getByTestId('video-ptxAslIwvYI');
    const favoriteButton = screen.getByTestId('favorite-button');
    const favoriteVideosContainer = screen.getByTestId('related-videos-container');

    expect(video).toHaveAttribute(
      'src',
      `https://www.youtube.com/embed/${mockVideoView.id}`
    );

    expect(favoriteButton.children.length).toBe(1);
    expect(favoriteVideosContainer.children.length).toBe(0);
  });

  it('renders the video according to the content & not showing favorite button', () => {
    render(
      <VideoDetail
        video={mockVideoView}
        favoriteAlready
        authenticated
        addToFavorites={jest.fn()}
        relatedVideos={mockVideos}
        toVideoPage={jest.fn()}
      />
    );

    const video = screen.getByTestId('video-ptxAslIwvYI');
    const favoriteButton = screen.getByTestId('favorite-button');
    const favoriteVideosContainer = screen.getByTestId('related-videos-container');

    expect(video).toHaveAttribute(
      'src',
      `https://www.youtube.com/embed/${mockVideoView.id}`
    );

    expect(favoriteButton.children.length).toBe(0);
    expect(favoriteVideosContainer.children.length).toBe(mockVideos.length);

  });
});
