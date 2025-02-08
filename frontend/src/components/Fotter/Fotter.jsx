import React from 'react';
import Title from '../Title/Title';
import { NavLink } from 'react-router-dom';
import assets from '../../assets/assets';
import './fotter.css';

const Fotter = () => {
  return (
    <footer className="fotter">

        <div className="fotterContainer">
            <Title text={"Kontakt"} />

            <div className="fotterInfoSection">

                {/* Left Section */}
                <div className="fotterSection fotterLeft">
                    <h4 className="fotterHeading">Menu</h4>

                    <nav className="fotterLinks">
                        <NavLink to="/" className="fotterNavLink">
                            Zamów online
                        </NavLink>
                        <NavLink to="/" className="fotterNavLink">
                            Regulamin
                        </NavLink>
                        <NavLink to="/" className="fotterNavLink">
                            Polityka prywatności
                        </NavLink>
                    </nav>

                    <div className="fotterSocialMedia">
                        <img src={assets.facebook} alt="Facebook" className="footerSocialMediaIcon" />
                        <img src={assets.instagram} alt="Instagram" className="footerSocialMediaIcon" />
                        <img src={assets.twitter} alt="Twitter" className="footerSocialMediaIcon" />
                    </div>

                </div>

                {/* Middle Section */}
                <div className="fotterSection fotterMiddle">
                    <h4 className="fotterHeading">choinek.pl</h4>
                    <address>
                        <p>BW INWESTMENTS 1 Sp. z o.o.</p>
                        <p>ul. Foksal 3/5</p>
                        <p>00-366 Warszawa</p>
                        <p>NIP: 5252763645</p>
                        <p>Tel: +48 690 596 694</p>
                    </address>
                </div>

                {/* Right Section */}
                <div className="fotterSection fotterRight">
                    <div className="fotterPaymentIcons">
                        <img src={assets.mastercard} alt="Mastercard" />
                        <img src={assets.visa} alt="Visa" />
                        <img src={assets.stripe} alt="Stripe" />
                        <img src={assets.paypal} alt="" />
                    </div>

                    <p className="fotterNote">
                        W sprawie zamówień specjalnych zapraszam do indyfidualnego kontaktu. Na życzenie dekorujemy drzewka.
                    </p>

                </div>

            </div>

        </div>
        
    </footer>
  )
}

export default Fotter