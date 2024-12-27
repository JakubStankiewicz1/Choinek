import React from "react";
import { Link } from "react-router-dom";
import "./ProductItem.css";

const ProductItem = ({ id, name, images, lists }) => {
  return (
    <div className="productItem">
      <Link to={`/product/${id}`}>
        {/* Image Container */}
        <div className="productItemImageContainer">
          <img src={images[0]} alt="" />
        </div>

        {/* Text Container */}
        <div className="productItemTextContainer">
          <p className="productItemTextContainerText">{name}</p>
        </div>
      </Link>
      {/* Mapping of li elements */}
      <ul className="productItemUlContainer">
        {lists.map((item, index) => (
          <li key={index} className="productItemUlContainerLi">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductItem;
