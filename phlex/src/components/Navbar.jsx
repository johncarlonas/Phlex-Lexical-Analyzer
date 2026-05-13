import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <div className="logo-box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        </div>
        <span>Phlex.</span>
      </div>
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Analyzer</NavLink>
        <NavLink to="/docs" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Documentation</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
