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
    let alive = true;
    setLoading(true);
    getProductById(itemId)
      .then((p) => { if (alive) setProduct(p); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [itemId]);

  return (
    <div className="item-detail-container container py-4">
      {/* Breadcrumbs funcionales */}
      <Breadcrumbs />
      {loading && <p>Cargando…</p>}
      {!loading && !product && <p>Producto no encontrado.</p>}
      {!loading && product && <ItemDetail product={product} />}
    </div>
  );
}
