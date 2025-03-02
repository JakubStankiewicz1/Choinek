import React, { createContext, useState, useContext } from 'react';

const OrderContext = createContext();

export const OrderContextProvider = ({ children }) => {
  const [order, setOrder] = useState(null);

  const createOrder = (orderDetails) => {
    setOrder(orderDetails);
  };

  return (
    <OrderContext.Provider value={{ order, createOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  return useContext(OrderContext);
};