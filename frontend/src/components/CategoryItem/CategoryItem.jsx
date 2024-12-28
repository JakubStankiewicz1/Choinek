import React from "react";
import "./CategoryItem.css";

const CategoryItem = ({ name, image }) => {
  return (
    <div className="categoryItem">
      <div className="categoryItemImageContainer">
        <img src={image} alt="" />
      </div>

      <div className="categoryItemText">
        <p>{name}</p>
      </div>
    </div>
  );
};

export default CategoryItem;
