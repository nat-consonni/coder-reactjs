// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // esto me salia un error, y decia que era que tengo la ultima version de React y que le faltaba eso
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './styles/styles.scss';


const root = ReactDOM.createRoot(document.getElementById('root')); // createRoot en lugar de render por el error de la version de React
root.render(
  <App />,
);
