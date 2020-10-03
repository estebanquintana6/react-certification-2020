import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from './Layout.component';

describe('Layout', () => {
  it('renders itself', () => {
    render(<Layout />);
    const main = screen.getByRole('main');
    expect(main.childElementCount).toBe(0);
  });

  it('should render all the children of the layout component', () => {
    render(
      <Layout>
        <span type="span">Im a test</span>
      </Layout>
    );

    expect(screen.getAllByRole('main').length).toEqual(1);
    expect(screen.getAllByText('Im a test').length).toEqual(1);
  });
});
