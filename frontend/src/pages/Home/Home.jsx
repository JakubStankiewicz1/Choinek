import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Title from "../../components/Title/Title";
import Offert from "../../components/Offert/Offert";
import Info from "../../components/Info/Info";
import TreePricer from "../../components/TreePricer/TreePricer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      {/* <Title text={"Choinki Warszawa - oferta"} /> */}
      <Offert />
      <Info />
      <TreePricer />
      <p>sdf</p>
      <p>sdf</p>
      <p>sdf</p>
      <p>sdf</p>
      <p>sdf</p>
      <p>sdf</p>
      <p>sdf</p>
      <p>sdf</p>
      <p>sdf</p>
      <p>sdf</p>
      <p>sdf</p>
    </div>
  );
};

export default Home;
