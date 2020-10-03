import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header.component';

describe('Header', () => {
  const mockLogoutFn = jest.fn().mockImplementation(() => {
    console.log('Logged out');
  });

  const mockHistory = {
    push: jest.fn().mockImplementation((route) => {
      console.log(`Pushed route ${route}`);
    }),
  };

  it('renders', () => {
    render(
      <Header
        history={mockHistory}
        deAuthenticate={jest.fn().mockImplementation(() => {
          console.log('Logged out');
        })}
        authenticated
      />
    );

    const container = screen.getByTestId('action-container');
    expect(container.children.length).toBe(2);
  });

  it('renders', () => {
    render(<Header history={mockHistory} deAuthenticate={mockLogoutFn} authenticated />);

    const button = screen.getByTestId('logout-button');
    button.click();

    expect(mockLogoutFn).toHaveBeenCalled();
  });

  it('redirects to favorite page', () => {
    render(<Header history={mockHistory} deAuthenticate={mockLogoutFn} authenticated />);

    const button = screen.getByTestId('to-favorites-button');
    button.click();

    expect(mockHistory.push).toHaveBeenCalled();
  });

  it('redirects to login page', () => {
    render(
      <Header history={mockHistory} deAuthenticate={mockLogoutFn} authenticated={false} />
    );

    const button = screen.getByTestId('login-button');
    button.click();

    expect(mockHistory.push).toHaveBeenCalled();
  });
});
