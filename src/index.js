// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Context del carrito
import { CartProvider } from './context/CartContext';

// Bootstrap + estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles/styles.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
