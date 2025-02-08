import React from 'react';
import './navbar.css';
import assets from '../../assets/assets';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="navbarContainer">
            <div className="navbarLeftPart">
                <Link to="/" className="navbarLeftPartName snowburst-one-regular">Choinek.pl</Link>
            </div>
            <div className="navbarMiddlePart">
                <p className="navbarMiddlePartElement"><NavLink to="/products">oferta</NavLink><div className="navbarMiddlePartUnderline" /></p>
                <p className="navbarMiddlePartElement">cennik<div className="navbarMiddlePartUnderline" /></p>
                <NavLink to="/our-realizations" className="navbarMiddlePartElement">nasze realizacje<div className="navbarMiddlePartUnderline" /></NavLink>
                <NavLink to="/faq" className="navbarMiddlePartElement">faq<div className="navbarMiddlePartUnderline" /></NavLink>
                {/* <p className="navbarMiddlePartElement">zamów online<div className="navbarMiddlePartUnderline" /></p> */}
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