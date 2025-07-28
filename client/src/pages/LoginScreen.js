import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import axios from 'axios';


const LoginScreen = () => {
  const [isSigningIn, setIsSigningIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleAuth = async (e) => {
    e.preventDefault();
    const url = isSigningIn ? '/api/auth/login' : '/api/auth/register';
    try {
      const { data } = await axios.post(url, { email, password });
      localStorage.setItem('user', JSON.stringify(data));
      dispatch(login(data));
    } catch (error) {
      alert(error.response?.data?.message || 'Authentication failed!');
    }
  };

  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <img className="loginScreen__logo" src="/logo.png" alt="Logo" />
        <div className="loginScreen__gradient" />
      </div>
      <div className="loginScreen__body">
        <form onSubmit={handleAuth}>
          <h1>{isSigningIn ? 'Sign In' : 'Register'}</h1>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" required />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" required />
          <button type="submit">{isSigningIn ? 'Sign In' : 'Register'}</button>
          <h4>
            <span className="loginScreen__gray">{isSigningIn ? 'New to Netflix? ' : 'Have an account? '}</span>
            <span className="loginScreen__link" onClick={() => setIsSigningIn(!isSigningIn)}>
              {isSigningIn ? 'Sign up now.' : 'Sign in now.'}
            </span>
          </h4>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;