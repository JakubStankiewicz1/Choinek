import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Title from "../../components/Title/Title";
import Offert from "../../components/Offert/Offert";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      {/* <Title text={"Choinki Warszawa - oferta"} /> */}
      <Offert />
    </div>
  );
};

export default Home;
