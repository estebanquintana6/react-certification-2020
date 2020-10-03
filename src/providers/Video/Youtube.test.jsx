import React from 'react';
import { render, screen } from '@testing-library/react';
import YoutubeProvider from './Youtube.provider';

describe('YoutubeProvider', () => {
  it('renders itself', () => {
    render(<YoutubeProvider />);
    const main = screen.getByTestId('youtube-provider');
    expect(main.children.length).toBe(0);
  });

  it('renders itself and its children', () => {
    render(
      <YoutubeProvider>
        <h2>Example</h2>
      </YoutubeProvider>
    );
    const main = screen.getByTestId('youtube-provider');
    expect(main.children.length).toBe(1);
  });
});
