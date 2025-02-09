import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./product.css";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/choinka/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => {
        console.error("Błąd pobierania danych:", error);
        console.error("Response data:", error.response?.data);
      });
  }, [id]);

  if (!product) {
    return <div>Ładowanie danych...</div>;
  }

  return (
    <div className="product">
      <div className="productImageContainer">
        <img src={product.zdjecia?.[0]} alt={product.nazwa} className="productImage" />
      </div>
      <div className="productDetails">
        <h1>{product.nazwa}</h1>
        <ul>
          <li>{product.informacja_1?.join(", ")}</li>
          <li>{product.informacja_2?.join(", ")}</li>
          <li>{product.informacja_3?.join(", ")}</li>
        </ul>
      </div>
    </div>
  );
};

export default Product;