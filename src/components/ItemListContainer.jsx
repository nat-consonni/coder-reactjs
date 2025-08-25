// src/components/ItemListContainer.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import { getProducts } from '../services/productsApi';
import ItemList from './ItemList';

const CATEGORY_LABELS = {
  colchones: 'Colchones y sommiers',
  living: 'Living',
  textiles: 'Textiles del hogar',
  oficina: 'Oficina',
  comedor: 'Comedor',
  cocinas: 'Cocinas',
};

const ItemListContainer = ({ greeting = 'Nuestro catálogo' }) => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const catLabel = useMemo(
    () => (categoryId ? CATEGORY_LABELS[categoryId] || categoryId : null),
    [categoryId]
  );

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);

    getProducts(categoryId)
      .then((data) => { if (alive) setItems(data); })
      .catch((err) => {
        console.error(err);
        if (alive) setError('No pudimos cargar los productos.');
      })
      .finally(() => { if (alive) setLoading(false); });

    return () => { alive = false; };
  }, [categoryId]);

  return (
    <div className="item-list-container container py-5">
      <Breadcrumbs />

      <h3 className="mb-4">
        {greeting}
        {catLabel ? `: ${catLabel}` : ''}
        {!loading && (
          <span className="small text-muted ms-2">
            · {items.length} {items.length === 1 ? 'producto' : 'productos'}
          </span>
        )}
      </h3>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border" role="status" aria-hidden="true" />
          <div className="mt-2">Cargando productos…</div>
        </div>
      )}

      {!loading && error && <p className="text-center text-danger">{error}</p>}

      {!loading && !error && <ItemList items={items} />}
    </div>
  );
};

export default ItemListContainer;
