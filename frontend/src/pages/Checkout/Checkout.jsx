import React, { useState } from 'react';
import { useShopContext } from '../../ShopContext/ShopContext';
import { useOrderContext } from '../../OrderContext/OrderContext';
import { useNavigate } from 'react-router-dom';
import './checkout.css';

const Checkout = () => {
  const { cart, clearCart } = useShopContext();
  const { createOrder } = useOrderContext();
  const [customerDetails, setCustomerDetails] = useState({ name: '', email: '', address: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderDetails = {
      customer: customerDetails,
      items: cart,
      total: cart.reduce((sum, item) => sum + item.ceny[0] * item.quantity, 0),
    };

    // Send order to backend
    const response = await fetch('http://127.0.0.1:5000/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderDetails),
    });

    if (response.ok) {
      createOrder(orderDetails);
      clearCart();
      navigate('/order-confirmation');
    } else {
      console.error('Failed to place order');
    }
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={customerDetails.name} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={customerDetails.email} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={customerDetails.address} onChange={handleInputChange} required />
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;