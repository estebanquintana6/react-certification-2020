import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { useAuth } from '../../providers/Auth';
import './Login.styles.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const history = useHistory();

  const authenticate = async (event) => {
    event.preventDefault();
    try {
      await login(username, password);
      history.push('/home');
    } catch (err) {
      setError('wrong user/password');
    }
  };

  return (
    <section className="login loginpage">
      <h1>Welcome back!</h1>
      {error && <span className="justify-center">{error}</span>}
      <form onSubmit={authenticate} className="login-form">
        <div className="form-group">
          <label htmlFor="username">
            <strong>username </strong>
            <input
              required
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            <strong>password </strong>
            <input
              required
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </section>
  );
}

export default LoginPage;
