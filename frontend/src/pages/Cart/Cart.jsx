import React from "react";
import { useShopContext } from "../../ShopContext/ShopContext";
import { NavLink } from "react-router-dom";
import "./cart.css";
import assets from "../../assets/assets";

import Fotter from "../../components/Fotter/Fotter";

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

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.ceny[0] * item.quantity, 0);
  };

  const shippingCost = 20; // Przykładowy koszt wysyłki
  const subtotal = calculateSubtotal();
  const total = subtotal + shippingCost;

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
          <div className="cartContainerLeftRightTop">
            <div className="cartContainerLeftRightTopContainer">
              {/* Top */}
              <div className="cartContainerLeftRightTopContainerTop">
                <p className="cartContainerLeftRightTopContainerTopHeaderText">Quality accurance</p>
              </div>

              <div className="cartContainerLeftRightTopContainerHrDivElement" />

              {/* Middle */}
              <div className="cartContainerLeftRightTopContainerMiddle">
                <div className="cartContainerLeftRightTopContainerMiddleContainer">
                  {/* Top */}
                  <div className="cartContainerLeftRightTopContainerMiddleContainerTop">
                    <p className="cartContainerLeftRightTopContainerMiddleContainerTopText">
                      CUSTOMER SERVICE
                    </p>
                  </div>

                  <div className="cartContainerLeftRightTopContainerMiddleContainerHrDiv" />

                  {/* Bottom */}
                  <div className="cartContainerLeftRightTopContainerMiddleContainerBottom">
                    <div className="cartContainerLeftRightTopContainerMiddleContainerBottomOne">
                      <img src={assets.telephone} alt="" className="cartContainerLeftRightTopContainerMiddleContainerBottomOneImage" />
                      <p className="cartContainerLeftRightTopContainerMiddleContainerBottomPhone">
                        800-441-4488
                      </p>
                    </div>
                    <div className="cartContainerLeftRightTopContainerMiddleContainerBottomTwo">
                      <p className="cartContainerLeftRightTopContainerMiddleContainerBottomTwoOne">
                        Monday to Friday: 9am - 6pm EST
                      </p>
                      <p className="cartContainerLeftRightTopContainerMiddleContainerBottomTwoTwo">
                        Saturday: 10am - 6pm EST
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cartContainerLeftRightTopContainerHrDivElement" />

              <div className="cartContainerLeftRightTopContainerElementContainerThird">
                {/* First Element */}
                <div className="cartContainerLeftRightTopContainerElementContainerThirdFirst">
                  <div className="cartContainerLeftRightTopContainerElementContainerThirdFirstContainer">
                    <img src={assets.van} alt="" className="cartContainerLeftRightTopContainerElementContainerThirdFirstContainerImage" />
                    <p className="cartContainerLeftRightTopContainerElementContainerThirdFirstContainerText">
                      Free standard delivery
                    </p>
                  </div>
                </div>

                {/* Second Element */}
                <div className="cartContainerLeftRightTopContainerElementContainerThirdSecond">
                  <div className="cartContainerLeftRightTopContainerElementContainerThirdSecondContainer">
                    <img src={assets.lock} alt="" className="cartContainerLeftRightTopContainerElementContainerThirdSecondContainerImage" />
                    <p className="cartContainerLeftRightTopContainerElementContainerThirdSecondContainerText">Returns & exchanges</p>
                  </div>
                </div>

                {/* Third Element */}
                <div className="cartContainerLeftRightTopContainerElementContainerThirdThird">
                  <div className="cartContainerLeftRightTopContainerElementContainerThirdThirdContainer">
                    <img src={assets.productReturn} alt="" className="cartContainerLeftRightTopContainerElementContainerThirdThirdContainerImage" />
                    <p className="cartContainerLeftRightTopContainerElementContainerThirdThirdContainerText">
                      Shop security
                    </p>
                  </div>
                </div>
              </div>

              <div className="cartContainerLeftRightTopContainerHrDivElement" />

              {/* Bottom */}
              <div className="cartContainerLeftRightTopContainerBottom">
                <div className="cartContainerLeftRightTopContainerBottomContainer">
                  <img src={assets.mastercard} alt="" className="cartContainerLeftRightTopContainerBottomContainerImage" />
                  <img src={assets.visa} alt="" className="cartContainerLeftRightTopContainerBottomContainerImage" />
                  <img src={assets.stripe} alt="" className="cartContainerLeftRightTopContainerBottomContainerImage" />
                  <img src={assets.paypal} alt="" className="cartContainerLeftRightTopContainerBottomContainerImage" />
                </div>
              </div>
            </div>
          </div>

          <div className="cartContainerLeftRightBottom"></div>
        </div>
      </div>
      <div className="cartContainerLeftBottom">
        <button onClick={clearCart} className="cartContainerDeleteButton">
          Wyczyść koszyk
        </button>
        <NavLink to="/checkout" className="cartContainerCheckoutButton">
          Przejdź do kasy
        </NavLink>
        <div className="cartSummary">
          <div className="cartSummaryItem">
            <span>Subtotal:</span>
            <span>{subtotal} PLN</span>
          </div>
          <div className="cartSummaryItem">
            <span>Shipping:</span>
            <span>{shippingCost} PLN</span>
          </div>
          <div className="cartSummaryItem">
            <span>Total:</span>
            <span>{total} PLN</span>
          </div>
        </div>
      </div>
      <Fotter />
    </div>
  );
};

export default Cart;