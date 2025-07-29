import React from 'react';
import PromoBar from './components/PromoBar';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';

function App() {
// Ejemplo de productos que pasamos como props al ItemListContainer
// en la proxima entrega voy a cambiar esto por un json
  const items = [
    {
      name: 'Colchón Premium',
      description: 'Colchón de alta calidad para un sueño reparador.',
      price: 250.00,
      image: 'https://picsum.photos/seed/picsum/300/200',
    },
    {
      name: 'Sofá de Cuero',
      description: 'Sofá de 3 cuerpos, diseño elegante y confortable.',
      price: 499.00,
      image: 'https://picsum.photos/seed/picsum/300/200',
    },
    {
      name: 'Mesa de Comedor',
      description: 'Mesa de comedor de madera con capacidad para 6 personas.',
      price: 150.00,
      image: 'https://picsum.photos/seed/picsum/300/200',
    },
  ];

  return (
    <div>
        <PromoBar />
        <NavBar />
        <ItemListContainer items={items} />
    </div>
  );
}

export default App;
