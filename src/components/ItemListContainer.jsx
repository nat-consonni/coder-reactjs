import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts } from '../services/productsApi';
import ItemList from './ItemList';

const ItemListContainer = ({ greeting = 'Nuestros Productos' }) => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProducts(categoryId)
      .then(setItems)
      .finally(() => setLoading(false));
  }, [categoryId]); // 👈 parámetro de la URL en deps

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">
        {greeting}{categoryId ? ` · ${categoryId}` : ''}
      </h2>

      {loading ? (
        <p className="text-center">Cargando…</p>
      ) : (
        <ItemList items={items} />
      )}
    </div>
  );
};

export default ItemListContainer;
