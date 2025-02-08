import React from 'react';
import assets from '../../assets/assets';
import './hero.css';

const Hero = () => {
  return (
    <div className="hero">

    <video autoPlay loop muted className="heroVideo">
        <source src={assets.heroBackgroundVideo} type="video/mp4" />
        {/* Your browser does not support the video tag. */}
    </video>

    {/* Text elements container */}
    <div className="heroContainer">
        {/* Left Side */}
        <div className="heroContainerLeftSide">
            {/* Top Section */}
            <div className="heroContainerLeftSideTop">
                <p className="heroContainerLeftSideTopHeader">
                    Choinki z dostawą <span className="heroContainerLeftSideTopHeaderSpan">pod drzwi.</span><br />
                    Gwarancja realizacji <span className="heroContainerLeftSideTopHeaderSpan">w 48 godzin</span>
                </p>
                <p className="heroContainerLeftSideTopNormal">
                    lub w wybranym przez ciebie terminie
                </p>
            </div>
            {/* Bottom Section */}
            <div className="heroContainerLeftSideBottom">
                <button className="heroContainerLeftSideBottomBtn">ZAMÓW TERAZ</button>
            </div>
        </div>
        {/* Right Side */}
        <div className="heroContainerRightSide">
            <ul>
                <li className="heroContainerRightSideElement">Szeroki wybór, najniższe ceny</li>
                <li className="heroContainerRightSideElement">Choinki najwyższej klasy</li>
                <li className="heroContainerRightSideElement">Każde zamówienie potwierdzamy telefonicznie</li>
            </ul>
        </div>
    </div>
        
    </div>
  )
}

export default Hero