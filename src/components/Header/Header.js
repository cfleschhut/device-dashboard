import React from 'react';
import Logo from './Logo';
import Search from '../Search/Search';
import './header.css';

const TagLine = () => (
  <div className="header-tagline">
    <h1>Device Dashboard</h1>
  </div>
);

const Header = ({ onSearch }) => (
  <header className="header">
    <Logo />
    <TagLine />

    <Search onSearch={onSearch} />
  </header>
);

export default Header;
