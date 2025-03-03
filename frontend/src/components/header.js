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

  return (
    <header>
      <div className="header-top">
        <div className="logo">
          <img src={logo} alt="Logo Web Dev" />
        </div>
        {/* Burger menu visible en mobile */}
        <div className="burger-menu" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className={menuOpen ? 'open' : ''}>
          <ul>
            <li><a href="#Bio">Bio</a></li>
            <li><a href="#beats">Beats</a></li>
            <li><a href="#Agenda">Agenda</a></li>
            <li><a href="#contact">Contacto</a></li>
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
