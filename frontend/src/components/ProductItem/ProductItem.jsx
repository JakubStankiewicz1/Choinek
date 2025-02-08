import React from 'react';
import "./productItem.css";
import { Link } from 'react-router-dom';

const ProductItem = ({ id, name, images, lists }) => {
  return (
    <div className="productItem">
        <Link to={`/product/${id}`}>
            <div className="productItemImageContainer">
                <img src={images[0]} alt={name} className="productItemImageContainerImage" />
            </div>
            <div className="productItemTextContainer">
                <p className="productItemTextContainerText">{name}</p>
            </div>
        </Link>
        <ul className="productItemUlContainer">
            {lists.map((item, index) => (
                <li key={index} className="productItemUlContainerLi">
                    {item}
                </li>
            ))}
        </ul>
    </div>
  )
}

export default ProductItem;