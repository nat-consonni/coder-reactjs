// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import BackdropFix from './components/BackdropFix';

import PromoBar from './components/PromoBar';
import NavBar from './components/NavBar';
import HeroCarousel from './components/HeroCarousel';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './pages/ItemDetailContainer';
import Discontinuados from './pages/Discontinuados';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';
import CategoryBand from './components/CategoryBand';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <BackdropFix />
      <PromoBar />
      <NavBar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroCarousel featuredOnly limit={4} autoPlay={false} />
              <ItemListContainer greeting="¡Bienvenida a la tienda!" />
            </>
          }
        />
        <Route path="/category/:categoryId" element={<ItemListContainer />} />
        <Route path="/item/:itemId" element={<ItemDetailContainer />} />
        <Route path="/discontinuados" element={<Discontinuados />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <CategoryBand />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
