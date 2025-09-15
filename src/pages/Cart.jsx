import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, removeItem, clear, calcItemsQty, calcTotalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container py-5">
        <h3 className="mb-3">Tu carrito está vacío</h3>
        <Link to="/" className="btn btn-dark rounded-pill">Volver a comprar</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h3 className="mb-4">Carrito ({calcItemsQty()} ítems)</h3>

      <div className="list-group mb-3">
        {cart.map((it) => (
          <div key={it.id} className="list-group-item d-flex align-items-center">
            <img
              src={it.img}
              alt={it.title}
              width={64}
              height={64}
              className="rounded me-3 object-fit-cover"
            />
            <div className="me-auto">
              <div className="fw-semibold">{it.title}</div>
              <div className="small text-muted">
                x{it.quantity} · ${it.price}
              </div>
            </div>
            <div className="me-3 fw-semibold">
              ${ (it.price * it.quantity).toLocaleString() }
            </div>
            <button
              className="btn btn-sm btn-outline-secondary rounded-pill"
              onClick={() => removeItem(it.id)}
            >
              Quitar
            </button>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <button className="btn btn-outline-dark rounded-pill" onClick={clear}>
          Vaciar carrito
        </button>
        <div className="h5 mb-0">Total: ${ calcTotalPrice().toLocaleString() }</div>
      </div>

      <div className="text-end mt-3">
        <Link to="/checkout" className="btn btn-dark rounded-pill">
          Terminar mi compra
        </Link>
      </div>
    </div>
  );
}
