import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productsApi';
import ItemDetail from '../components/ItemDetail';

export default function ItemDetailContainer() {
  const { itemId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProductById(itemId).then(setProduct).finally(() => setLoading(false));
  }, [itemId]);

  if (loading) return <p style={{padding:16}}>Cargando…</p>;
  if (!product) return <p style={{padding:16}}>Producto no encontrado.</p>;
  return <ItemDetail product={product} />;
}
