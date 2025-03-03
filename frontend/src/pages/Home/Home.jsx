import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import Offert from '../../components/Offert/Offert';
import Info from '../../components/Info/Info';
import TreePricer from '../../components/TreePricer/TreePricer';
import OrderInfo from '../../components/OrderInfo/OrderInfo';
import Hero2 from '../../components/Hero2/Hero2';
import Fotter from '../../components/Fotter/Fotter';

const Home = () => {
  return (
    <div>
        <Hero />

        <Offert />

        <Info />

        <TreePricer />

        <OrderInfo />

        <Hero2 />

        <Fotter />
        
    </div>
  )
}

export default Home