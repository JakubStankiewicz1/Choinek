import React, { createContext, useState, useContext } from 'react';

const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity, size) => {
    setCart(prevCart => {
      const existingProductIndex = prevCart.findIndex(
        item => item.id === product.id && item.size === size
      );

      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += quantity;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity, size }];
      }
    });
  };

  const removeFromCart = (productId, size) => {
    setCart(prevCart => prevCart.filter(item => !(item.id === productId && item.size === size)));
  };

  const updateCartQuantity = (productId, size, quantity) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => {
        if (item.id === productId && item.size === size) {
          return { ...item, quantity };
        }
        return item;
      });
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <ShopContext.Provider value={{ cart, addToCart, removeFromCart, updateCartQuantity, clearCart }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShopContext = () => {
  return useContext(ShopContext);
};