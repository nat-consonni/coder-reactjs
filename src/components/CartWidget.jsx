import { useCart } from '../context/CartContext';

export default function CartWidget({ className = '' }) {
  const { calcItemsQty } = useCart();
  const qty = calcItemsQty();

  return (
    <button
      type="button"
      className={`btn btn-icon fs-lg btn-outline-secondary border-0 rounded-circle me-2 button-cart ${className}`}
      data-bs-toggle="offcanvas"
      data-bs-target="#shoppingCart"
      aria-controls="shoppingCart"
      aria-label="Tu carrito de compras"
    >
      <i className="bi bi-cart"></i>
      {qty > 0 && (
        <span
          className="cart-products-counter"
        >
          {qty}
        </span>
      )}
    </button>
  );
}