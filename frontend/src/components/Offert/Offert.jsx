import React from "react";
import Title from "../Title/Title";
import "./Offert.css";
import { products } from "../../assets/assets";
import ProductItem from "../ProductItem/ProductItem";

const Offert = () => {
  return (
    <div className="offert">
      <Title text={"Choinki Warszawa - oferta"} />

      {/* Mapping products */}
      <div className="offertProductContainer">
        {products.map((item, index) => (
          <ProductItem
            key={index}
            id={item.id}
            name={item.name}
            images={item.images}
            lists={item.lists}
          />
        ))}
      </div>
    </div>
  );
};

export default Offert;
