import React from "react";
import "./Fotter.css";
import Title from "../Title/Title";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Fotter = () => {
  return (
    <div className="fotter">
      <div className="fotterContainer">
        {/* Title element */}
        <Title text="kontakt" />

        {/* Info Section */}
        <div className="fotterContainerInfoSection">
          {/* Left Side */}
          <div className="fotterContainerInfoSectionLeftSide">
            {/* First Part */}
            <div className="fotterContainerInfoSectionLeftSideFirstPart">
              <p className="fotterContainerInfoSectionLeftSideFirstPartText1">
                Menu
              </p>
              <div className="fotterContainerInfoSectionLeftSideFirstPartList">
                <NavLink to="/" className="fotterNavLink">
                  Zamów online
                </NavLink>
                <NavLink to="/" className="fotterNavLink">
                  Regulamin
                </NavLink>
                <NavLink to="/" className="fotterNavLink">
                  Polityka prywatności
                </NavLink>
              </div>
              <div className="fotterContainerInfoSectionLeftSideFirstPartSocialMedia">
                <img src={assets.facebook} alt="" />
              </div>
            </div>

            {/* Part with links (icons) to social media */}
            <div className="fotterContainerInfoSectionLeftSideSecondPart"></div>
          </div>

          {/* Middle Side */}
          <div className="fotterContainerInfoSectionMiddleSide">
            <p className="fotterContainerInfoSectionMiddleSideText1">
              choinek.pl
            </p>
            <p className="fotterContainerInfoSectionMiddleSideText2">
              BW INWESTMENTS 1 Sp. z o.o.
            </p>
            <p className="fotterContainerInfoSectionMiddleSideText3">
              ul. Foksal 3/5
            </p>
            <div className="fotterContainerInfoSectionMiddleSideText4">
              00-366 Warszawa
            </div>
            <div className="fotterContainerInfoSectionMiddleSideText5">
              NIP 5252763645
            </div>

            <div className="fotterContainerInfoSectionMiddleSideText6">
              +48 690 596 694
            </div>
          </div>

          {/* Right Side */}
          <div className="fotterContainerInfoSectionRightSide">
            {/* Images Container */}
            <div className="fotterContainerInfoSectionRightSideImagesContainer">
              <img src={assets.mastercard} alt="" />
              <img src={assets.visa} alt="" />
              <img src={assets.stripe} alt="" />
            </div>

            <p className="fotterContainerInfoSectionRightSideText">
              W sprawie zamówień specjalnych zapraszam do indywidualnego
              kontaktu. Na życzenie dekorujemy drzewka.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fotter;
