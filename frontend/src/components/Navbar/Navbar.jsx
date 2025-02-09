import React, { useState } from 'react';
import './navbar.css';
import assets from '../../assets/assets';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar">
        <div className="navbarContainer">
            <div className="navbarLeftPart">
                <Link to="/" className="navbarLeftPartName snowburst-one-regular">Choinek.pl</Link>
            </div>
            <div className="navbarToggle" onClick={toggleMenu}>
                &#9776;
            </div>
            <div className={`navbarMiddlePart ${menuOpen ? 'active' : ''}`}>
                <p className="navbarMiddlePartElement"><NavLink to="/products">oferta</NavLink><div className="navbarMiddlePartUnderline" /></p>
                <p className="navbarMiddlePartElement">cennik<div className="navbarMiddlePartUnderline" /></p>
                <NavLink to="/our-realizations" className="navbarMiddlePartElement">nasze realizacje<div className="navbarMiddlePartUnderline" /></NavLink>
                <NavLink to="/faq" className="navbarMiddlePartElement">faq<div className="navbarMiddlePartUnderline" /></NavLink>
                <div className="navbarMiddlePartElement">
                    <img src={assets.shoppingCart} alt="" className="navbarMiddlePartElementImg" />
                    <div className="navbarMiddlePartUnderline" />
                </div>
            </div>
            <div className="navbarRightPart">
                <p className="navbarRightPartTop">+48 123 456 789</p>
                <p className="navbarRightPartBottom">kontakt@choinek.pl</p>
            </div>
        </div>
    </div>
  )
};

export default Navbar;