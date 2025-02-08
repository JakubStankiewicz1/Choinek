import React from 'react';
import Title from '../Title/Title';
import assets from '../../assets/assets';
import "./hero2.css";

const Hero2 = () => {
  return (
    <div className="hero2">

        <div className="hero2Container">

            {/* Title Component */}
            <div className="hero2ContainerTitle">
                <Title text={"Liczniejsze potrzeby?"} />
            </div>

            <div className="hero2ContainerDouble">
                {/* Hero Left Side */}
                <div className="hero2ContainerLeftSide">
                    <img src={assets.treeFarm} alt="" />
                </div>

                {/* Hero Right Side */}
                <div className="hero2ContainerRightSide">
                    <div className="hero2ContainerRightSideText1">
                        Prowadzimy także sprzedaż hurtową.
                    </div>

                    <div className="hero2ContainerRightSideText2">
                    Poprzez wieloletnią obecność na rynku posiadamy dostęp do najpiękniejszych choinek. Mamy sprawdzonych dostawców, dla których uprawa drzew dekoracyjnych to życiowa pasja. Dzięki temu możemy zaoferować najlepsze ceny i gwarancję satysfakcji dla Twoich przyszłych klientów. Zapraszamy do zapytań o choinki w ilościach hurtowych. 
                    </div>

                </div>

            </div>

        </div>
        
    </div>
  )
}

export default Hero2