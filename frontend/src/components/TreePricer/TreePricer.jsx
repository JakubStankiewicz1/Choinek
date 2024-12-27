import React from "react";
import "./TreePricer.css";
import Title from "../Title/Title";
import { products } from "../../assets/assets";
import TreePriceInfo from "../TreePriceInfo/TreePriceInfo";

const TreePricer = () => {
  return (
    <div className="treePricer">
      {/* Tytuł */}
      <div className="treePricerTitleEle">
        <Title text={"cennik choinek"} />
      </div>

      {/* Mapowanie elementów */}
      <div className="treePricerMapping">
        {products.map((item, index) => (
          <TreePriceInfo
            key={index}
            name={item.name}
            magazineData={item.magazineData}
          />
        ))}
      </div>
    </div>
  );
};

export default TreePricer;
