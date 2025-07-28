import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';


// Import assets from the src/assets folder
import logo from '../assets/logo.png';
import avatar from '../assets/avatar.png';

const Navbar = () => {
  const [show, handleShow] = useState(false);
  const dispatch = useDispatch();

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', transitionNavBar);
    return () => window.removeEventListener('scroll', transitionNavBar);
  }, []);

  const handleSignOut = () => {
    dispatch(logout());
    localStorage.removeItem('user');
  };

  return (
    <div className={`nav ${show && 'nav__black'}`}>
      <div className="nav__contents">
        <img
          className="nav__logo"
          src={logo} // Use the imported logo variable
          alt="Netflix Logo"
        />
        <img
          onClick={handleSignOut}
          className="nav__avatar"
          src={avatar} // Use the imported avatar variable
          alt="User Avatar"
        />
      </div>
    </div>
  );
};

export default Navbar;