import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import users from '../data/users.json';
import { useUser } from '../context/UserContext';
import type { User } from '../context/UserContext';
import './LoginPage.css';

// ...

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // Explicitly cast the role property
      const typedUser: User = {
        ...user,
        role: user.role as 'user' | 'admin'
      };
      setUser(typedUser);

      if (typedUser.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="text-center mb-4">Campus Blood Connect</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g., user@student.com"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Login
          </button>
        </form>
        <div className="mt-3 text-center text-muted">
          <p className="mb-0">Admin: admin@campus.com / adminpassword</p>
          <p className="mb-0">User: budi@student.com / password123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;