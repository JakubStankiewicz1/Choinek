import React from 'react';
import { useOrderContext } from '../../OrderContext/OrderContext';
import './orderConfirmation.css';

const OrderConfirmation = () => {
  const { order } = useOrderContext();

  if (!order) {
    return <div>No order found</div>;
  }

  return (
    <div className="orderConfirmation">
      <h1>Order Confirmation</h1>
      <p>Thank you for your order, {order.customer.name}!</p>
      <p>Order Details:</p>
      <ul>
        {order.items.map((item, index) => (
          <li key={index}>
            {item.nazwa} - {item.quantity} x {item.ceny[0]} PLN
          </li>
        ))}
      </ul>
      <p>Total: {order.total} PLN</p>
    </div>
  );
};

export default OrderConfirmation;