import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import { getProducts } from '../services/productsApi';
import ItemList from './ItemList';

const ItemListContainer = ({ greeting = 'Nuestro catálogo' }) => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProducts(categoryId)
      .then(setItems)
      .finally(() => setLoading(false));
  }, [categoryId]); // URL en deps

  return (
    <div className="item-list-container container py-5">
      <Breadcrumbs />
      <h3 className="text-left mb-4">
        {greeting}<span className='text-capitalize'>{categoryId ? `: ${categoryId}` : ''} <i>({items.length})</i></span>
      </h3>

      {loading ? (
        <p className="text-center">Cargando productos…</p>
      ) : (
        <ItemList items={items} />
      )}
    </div>
  );
};

export default ItemListContainer;
