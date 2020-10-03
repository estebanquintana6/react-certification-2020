import React from 'react';
import { screen, render } from '@testing-library/react';
import FavoriteList from './FavoriteList.component';
import { mockFavorites } from '../../utils/mockVideoResponse';

describe('FavoriteList', () => {
  let favorites;

  beforeEach(() => {
    favorites = mockFavorites;
  });

  it('should render one child per favorite video', () => {
    render(
      <FavoriteList
        toVideoView={jest.fn().mockImplementation(() => {})}
        removeFromFavorites={jest.fn().mockImplementation(() => {})}
        favorites={favorites}
      />
    );
    const container = screen.getByTestId('favorite-test-container');
    expect(container.childElementCount).toBe(favorites.length);
  });

  it('should render no children if theres no favorite videos', () => {
    render(
      <FavoriteList
        toVideoView={jest.fn().mockImplementation(() => {})}
        removeFromFavorites={jest.fn().mockImplementation(() => {})}
        favorites={[]}
      />
    );
    const container = screen.getByTestId('favorite-test-container');
    expect(container.childElementCount).toBe(0);
  });
});
