import React from "react";
import "./TreePriceInfo.css";

const TreePriceInfo = ({ name, magazineData }) => {
  return (
    <div className="TreePriceInfo">
      <div className="TreePriceInfoTitle">
        <p>{name}</p>
      </div>

      <div className="TreePriceInfoDataContainer">
        {magazineData.map((item, index) => (
          <div key={index} className="TreePriceInfoDataResult">
            <p>{item.size}</p>
            <div className="TreePriceInfoHrElement"></div>
            <p>{item.price} zł</p>
          </div>
        ))}
        <button className="TreePriceInfoDataContainerButton">
          Zamów teraz
        </button>
      </div>
    </div>
  );
};

export default TreePriceInfo;
