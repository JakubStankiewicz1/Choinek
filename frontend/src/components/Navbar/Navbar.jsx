import React, { useState } from 'react';
import './navbar.css';
import assets from '../../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { useShopContext } from '../../ShopContext/ShopContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useShopContext();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

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
          <NavLink to="/our-realizations" className="navbarMiddlePartElement">nasze realizacje<div className="navbarMiddlePartUnderline" /></NavLink>
          <NavLink to="/faq" className="navbarMiddlePartElement">faq<div className="navbarMiddlePartUnderline" /></NavLink>
          <NavLink to="/cart" className="navbarMiddlePartElement">
            <img src={assets.shoppingCart} alt="Koszyk" className="navbarMiddlePartElementImg" />
            {cartItemCount > 0 && <span className="cartBadge">{cartItemCount}</span>}
            <div className="navbarMiddlePartUnderline" />
          </NavLink>
        </div>
        <div className="navbarRightPart">
          <p className="navbarRightPartTop">+48 123 456 789</p>
          <p className="navbarRightPartBottom">kontakt@choinek.pl</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;