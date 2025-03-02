import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ShopContextProvider } from './ShopContext/ShopContext';
import { OrderContextProvider } from './OrderContext/OrderContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ShopContextProvider>
        <OrderContextProvider>
          <App />
        </OrderContextProvider>
      </ShopContextProvider>
    </BrowserRouter>
  </StrictMode>,
);