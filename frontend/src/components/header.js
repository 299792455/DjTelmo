import React, { useState, useContext } from 'react';
import '../style/header.scss';
import logo from '../style/Medias/logoST.png';
import { AuthContext } from '../context/authContext';

const Header = () => {
  const { isAuthenticated, userRole, logoutUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header>
      <div className="header-top">
        <div className="logo">
          <img src={logo} alt="Sergio Telmo DJ" />
        </div>
        {/* Burger menu visible en mobile */}
        <div 
          className={`burger-menu ${menuOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={menuOpen ? 'open' : ''}>
          <ul>
            <li><a href="#Bio" onClick={handleLinkClick}>Bio</a></li>
            <li><a href="#beats" onClick={handleLinkClick}>Beats</a></li>
            <li><a href="#Agenda" onClick={handleLinkClick}>Agenda</a></li>
            <li><a href="#contact" onClick={handleLinkClick}>Contacto</a></li>
            <li className="social-icon">
              <a
                href="https://www.instagram.com/sergiotelmo_?igsh=Z201bWx6ZTdncXgz"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/DjTelmoInstagram.webp"
                  alt="Instagram DJ Telmo"
                  width="70px"
                  height="70px"
                />
              </a>
            </li>
            {isAuthenticated && userRole === 'Admin' && (
              <li>
                <button onClick={logoutUser} className="logout-btn">
                  Desconectar
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
      {isAuthenticated && userRole === 'Admin' && (
        <div className="admin-banner">
          <p>Modo Admin</p>
        </div>
      )}
    </header>
  );
};

export default Header;
