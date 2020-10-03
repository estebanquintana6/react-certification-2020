import React from 'react';
import { render } from '@testing-library/react';
import Login from './Login.page';

import AuthProvider from '../../providers/Auth';

describe('Login', () => {
  it('renders login component', () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );
  });
});
