import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

import Home from './Home.page';

import AuthContext from '../../providers/Auth';

describe('Layout', () => {
  it('renders itself', () => {
    render(
      <BrowserRouter>
        <AuthContext>
          <Home />
        </AuthContext>
      </BrowserRouter>
    );
  });
});
