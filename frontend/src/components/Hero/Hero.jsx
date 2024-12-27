import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero">
      <div className="heroContainer">
        {/* Left Side */}
        <div className="heroContainerLeftSide">
          <div className="heroContainerLeftSideText">
            <p className="heroContainerLeftSideTextTitle">
              Choinki z dostawą{" "}
              <span className="heroContainerLeftSideTextBold">pod drzwi.</span>
            </p>
            <p className="heroContainerLeftSideTextTitle">
              Gwarancja realizacji w{" "}
              <span className="heroContainerLeftSideTextBold">48 godzin</span>
            </p>
            <p className="heroContainerLowText">
              lub w wybranym przez ciebie terminie
            </p>
          </div>

          <button className="heroContainerButton">ZAMÓW TERAZ</button>
        </div>

        {/* Right Side */}
        <div className="heroContainerRightSide">
          <ul className="heroContainerRightSideList">
            <li className="heroContainerRightSideListElement">
              Szeroki wybór, najniższe ceny
            </li>
            <li className="heroContainerRightSideListElement">
              Choinki najwyższej klasy
            </li>
            <li className="heroContainerRightSideListElement">
              Każde zamówienie potwierdzamy telefonicznie
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Hero;
