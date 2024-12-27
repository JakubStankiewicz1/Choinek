import React from "react";
import { assets } from "../../assets/assets";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbarContainer">
        {/* Left Side */}
        <div className="navbarLeftSide">
          <Link to="/">
            <p className="navbarLeftSideText snowburst-one-regular">
              Choinek.pl
            </p>
          </Link>
        </div>

        {/* Middle Side */}
        <ul className="navbarMiddleSide">
          <li className="navbarMiddleSideText">oferta</li>
          <li className="navbarMiddleSideText">cennik</li>
          <li className="navbarMiddleSideText">nasze realizacje</li>
          <li className="navbarMiddleSideText">faq</li>
          <li className="navbarMiddleSideText">zamów online</li>
          <li>
            <img
              className="navbarMiddleSideImage"
              src={assets.shoppingCart}
              alt=""
            />
          </li>

          {/* <p>Polski język</p> */}
        </ul>

        {/* Right Side */}
        <div className="navbarRightSide">
          <b className="navbarRightSidePhoneText">+48 123 456 789</b>
          <p className="navbarRightSideEmailText">kontakt@choinek.pl</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
