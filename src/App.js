import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PromoBar from './components/PromoBar';
import NavBar from './components/NavBar';
import HeroCarousel from './components/HeroCarousel';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './pages/ItemDetailContainer';
import Discontinuados from './pages/Discontinuados';
import NotFound from './pages/NotFound';
import CategoryBand from './components/CategoryBand';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <PromoBar />
      <NavBar />

      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={
            <>
              <HeroCarousel featuredOnly limit={4} />
              <ItemListContainer greeting="¡Bienvenido a la tienda!" />
            </>
          }
        />

        {/* Catálogo por categoría */}
        <Route path="/category/:categoryId" element={<ItemListContainer />} />

        {/* Detalle de producto */}
        <Route path="/item/:itemId" element={<ItemDetailContainer />} />

        {/* Discontinuados */}
        <Route path="/discontinuados" element={<Discontinuados />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CategoryBand />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
