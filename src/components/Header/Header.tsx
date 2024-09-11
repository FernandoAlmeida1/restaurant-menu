import React from 'react';
import './Header.css';

interface HeaderProps {
  bannerImage: string;
  restaurantName: string;
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ bannerImage, restaurantName, onMenuToggle }) => {
  return (
    <header className="header">
      <button className="menu-btn" onClick={onMenuToggle}>☰</button>
      <img
        src={bannerImage}
        alt="Banner"
        className="banner-image"
      />
      <h1 className="restaurant-name">{restaurantName}</h1>
    </header>
  );
};

export default Header;
