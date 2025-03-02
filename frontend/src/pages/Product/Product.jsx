import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import { useShopContext } from '../../ShopContext/ShopContext';
import "./product.css";
import Fotter from "../../components/Fotter/Fotter";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [deliveryOption, setDeliveryOption] = useState("najszybciej");
  const [recyclingOption, setRecyclingOption] = useState("brak");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const { addToCart } = useShopContext();

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/choinka/${id}`)
      .then(response => {
        setProduct(response.data);
        setSelectedImage(response.data.zdjecia?.[0]);
        setSelectedSize(response.data.rozmiary?.[0]);
      })
      .catch(error => {
        console.error("Błąd pobierania danych:", error);
        console.error("Response data:", error.response?.data);
      });

    axios.get(`http://127.0.0.1:5000/choinki`)
      .then(response => setRelatedProducts(response.data.filter(p => p.id !== parseInt(id)).slice(0, 5)))
      .catch(error => console.error("Błąd pobierania danych:", error));
  }, [id]);

  if (!product) {
    return <div>Ładowanie danych...</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    console.log("Dodano do koszyka:", product.nazwa, "Ilość:", quantity, "Rozmiar:", selectedSize);
  };

  return (
    <div className="product">
      <div className="productContainer">
        <div className="productImageContainer">
          <div className="productImageContainerBigImg">
            <img src={selectedImage} alt={product.nazwa} className="productImage" />
          </div>
          <div className="productImageThumbnails">
            {product.zdjecia?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.nazwa} ${index + 1}`}
                className={`productThumbnail ${selectedImage === image ? 'selected' : ''}`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>
        <div className="productDetails">
          <h1>{product.nazwa}</h1>
          <p className="productPrice">Cena: {product.ceny[0]} PLN</p>
          <p>Lokalizacja: {product.miasto}</p>
          <p>Dostępność: {product.ilosci[0] > 0 ? 'Dostępne' : 'Niedostępne'}</p>
          <p>Wybierz rozmiar choinki:</p>
          <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
            {product.rozmiary?.map((size, index) => (
              <option key={index} value={size}>{size}</option>
            ))}
          </select>
          <p>Opcje wyboru daty wysyłki:</p>
          <select value={deliveryOption} onChange={(e) => setDeliveryOption(e.target.value)}>
            <option value="najszybciej">Najszybciej</option>
            <option value="za_tydzien">Za tydzień</option>
            <option value="za_2_tygodnie">Za 2 tygodnie</option>
          </select>
          <p>Recykling - odbiór choinki po Świętach:</p>
          <select value={recyclingOption} onChange={(e) => setRecyclingOption(e.target.value)}>
            <option value="brak">Brak</option>
            <option value="tak">Tak, +30zł</option>
          </select>
          <div className="quantityContainer">
            <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} className="quantityContainerBtn">-</button>
            <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
            <button onClick={() => setQuantity(quantity + 1)} className="quantityContainerBtn">+</button>
          </div>
          <button className="addToCartButton" onClick={handleAddToCart}>Dodaj do koszyka</button>
          <p className="productDescriptionTitle">Opis:</p>
          <p className="productDescription">{product.opis}</p>
        </div>
      </div>
      <div className="relatedProducts">
        <h2>Powiązane produkty</h2>
        <div className="relatedProductsContainer">
          {relatedProducts.map(relatedProduct => (
            <NavLink to={`/product/${relatedProduct.id}`} key={relatedProduct.id} className="relatedProductItem">
              <img src={relatedProduct.zdjecia?.[0]} alt={relatedProduct.nazwa} className="relatedProductImage" />
              <p>{relatedProduct.nazwa}</p>
            </NavLink>
          ))}
        </div>
      </div>

      <div className="productHrDivider" />

      <Fotter />
    </div>
  );
};

export default Product;