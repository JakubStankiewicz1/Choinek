import React from "react";
import { useShopContext } from "../../ShopContext/ShopContext";
import { NavLink } from "react-router-dom";
import "./cart.css";

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useShopContext();

  const handleRemoveFromCart = (productId, size) => {
    removeFromCart(productId, size);
  };

  const handleIncreaseQuantity = (productId, size, currentQuantity) => {
    updateCartQuantity(productId, size, currentQuantity + 1);
  };

  const handleDecreaseQuantity = (productId, size, currentQuantity) => {
    if (currentQuantity > 1) {
      updateCartQuantity(productId, size, currentQuantity - 1);
    }
  };

  if (cart.length === 0) {
    return <div className="cart">Twój koszyk jest pusty</div>;
  }

  return (
    <div className="cart">
      <h1 className="cartContainerTitleText">Twój koszyk</h1>
      <div className="cartLocationDiv">
        <div className="cartLocationDivHrOne" />
        <div className="cartLocationDivOne">
          <p className="cartLocationDivOneTextOne"></p>
          <div className="cartLocationDivOneCircle" />
        </div>
        <div className="cartLocationDivHrTwo" />
        <div className="cartLocationDivHrThree" />
        <div className="cartLocationDivHrFour" />
      </div>
      <div className="cartContainer">
        <div className="cartContainerLeft">
          <div className="cartContainerItems">
            {cart.map((item, index) => (
              <div key={index} className="cartContainerItemsItem">
                <img src={item.zdjecia[0]} alt={item.nazwa} className="cartContainerItemsItemImage" />
                <div className="cartContainerItemsItemDetails">
                  <h2 className="cartContainerItemsItemDetailsHeaderText">{item.nazwa}</h2>
                  <p className="cartContainerItemsItemDetailsTextOne">Rozmiar: {item.size}</p>
                  <p className="cartContainerItemsItemDetailsTextTwo">Ilość: {item.quantity}</p>
                  <div className="cartContainerItemsItemDetailsControls">
                    <button
                      onClick={() => handleDecreaseQuantity(item.id, item.size, item.quantity)}
                      className="cartContainerItemsItemDetailsControlsMinus"
                    >
                      -
                    </button>
                    <span className="cartContainerItemsItemDetailsControlsNumber">{item.quantity}</span>
                    <button
                      onClick={() => handleIncreaseQuantity(item.id, item.size, item.quantity)}
                      className="cartContainerItemsItemDetailsControlsPlus"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cartContainerItemsItemPrice">
                  <button onClick={() => handleRemoveFromCart(item.id, item.size)} className="cartContainerItemsItemDetailsDelete">
                    X
                  </button>
                  <p className="cartContainerItemsItemDetailsTextThree">Cena: {item.ceny[0] * item.quantity} PLN</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="cartContainerLeftRight">
          <p>klsad;fjklf</p>
        </div>
      </div>
      <div className="cartContainerLeftBottom">
        <button onClick={clearCart} className="cartContainerDeleteButton">
          Wyczyść koszyk
        </button>
        <NavLink to="/checkout" className="cartContainerCheckoutButton">
          Przejdź do kasy
        </NavLink>
      </div>
    </div>
  );
};

export default Cart;
