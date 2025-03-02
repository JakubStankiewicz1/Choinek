import React from 'react';
import { useShopContext } from '../../ShopContext/ShopContext';
import { NavLink } from 'react-router-dom';
import './cart.css';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useShopContext();

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  if (cart.length === 0) {
    return <div className="cart">Twój koszyk jest pusty</div>;
  }

  return (
    <div className="cart">
      <h1>Twój koszyk</h1>
      <div className="cartItems">
        {cart.map((item, index) => (
          <div key={index} className="cartItem">
            <img src={item.zdjecia[0]} alt={item.nazwa} className="cartItemImage" />
            <div className="cartItemDetails">
              <h2>{item.nazwa}</h2>
              <p>Rozmiar: {item.size}</p>
              <p>Ilość: {item.quantity}</p>
              <p>Cena: {item.ceny[0] * item.quantity} PLN</p>
              <button onClick={() => handleRemoveFromCart(item.id)}>Usuń</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={clearCart} className="clearCartButton">Wyczyść koszyk</button>
      <NavLink to="/checkout" className="checkoutButton">Przejdź do kasy</NavLink>
    </div>
  );
};

export default Cart;