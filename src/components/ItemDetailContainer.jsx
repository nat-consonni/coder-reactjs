import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productsApi';
import Breadcrumbs from '../components/Breadcrumbs';
import ItemDetail from '../components/ItemDetail';

export default function ItemDetailContainer() {
  const { itemId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getProductById(itemId)
      .then(p => { if (active) setProduct(p); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [itemId]);

  return (
    <div className="container py-4">
      <Breadcrumbs />

      {loading && <p className="mt-3">Cargando…</p>}
      {!loading && !product && <p className="mt-3">Producto no encontrado.</p>}
      {!loading && product && <ItemDetail product={product} />}
    </div>
  );
}
