import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ItemCount from './ItemCount';
import { useCart } from '../context/CartContext';

const formatUYU = (value) =>
  new Intl.NumberFormat('es-UY', { style: 'currency', currency: 'UYU', maximumFractionDigits: 0 }).format(value);

export default function ItemDetail({ product }) {
  const { id, title, price, img, stock, description = '' } = product;
  const { addItem, removeItem, getItemQuantity, updateItemQty } = useCart();

  const inCartQty = getItemQuantity(id);
  const [qty, setQty] = useState(inCartQty || 1);

  // Si cambia desde otra parte (offcanvas / cart), sincronizo
  useEffect(() => {
    if (inCartQty > 0) setQty(inCartQty);
    if (inCartQty === 0) setQty(1);
  }, [inCartQty]);

  const handleQtyChange = (next) => {
    setQty(next);
    if (inCartQty > 0) {
      updateItemQty(id, next); // reflejar en carrito en vivo
    }
  };

  const handleAdd = () => {
    if (inCartQty === 0) addItem(product, qty);
  };

  const handleRemove = () => {
    removeItem(id);
    setQty(1);
  };

  const isInCart = inCartQty > 0;

  return (
    <main className="item-detail">
      <div className="row g-4">
        <div className="col-12 col-sm-5">
          <div className="img-wrapper border rounded-1 p-4">
            <img className="w-100" src={img} alt={title} />
          </div>
        </div>

        <div className="col-12 col-sm-7">
          <h4 className="mb-2">{title}</h4>
          <p className="h2 mb-1">{formatUYU(price)}</p>
          {stock > 0 ? (
            <p className="text-muted mb-3">Disponibles: {stock}</p>
          ) : (
            <p className="text-danger mb-3">Producto sin stock</p>
          )}

          {/* siempre visible */}
          <div className="d-flex align-items-center gap-3 mb-3">
            <ItemCount value={qty} onChange={handleQtyChange} stock={stock} />
            {!isInCart && (
              <button className="btn btn-dark rounded-pill" onClick={handleAdd} disabled={stock <= 0}>
                Agregar al carrito
              </button>
            )}
          </div>

          {/* Acciones cuando está en carrito */}
          {isInCart && (
            <div className="d-flex gap-2 mb-2">
              <Link to="/checkout" className="btn btn-dark rounded-pill">Finalizar compra</Link>
              <button className="btn btn-outline-dark rounded-pill" onClick={handleRemove}>Quitar</button>
            </div>
          )}

          <div className="description mt-4">
            <p className="mb-0">{description || 'Sin descripción.'}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
