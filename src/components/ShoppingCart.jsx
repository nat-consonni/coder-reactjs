import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Offcanvas } from 'bootstrap';

const ShoppingCart = () => {
  const { cart, removeItem, clear, calcTotalPrice } = useCart();
  const isEmpty = cart.length === 0;
  const navigate = useNavigate();

  const closeAndNavigate = (to) => {
    const el = document.getElementById('shoppingCart');
    if (!el) {
      navigate(to);
      return;
    }
    const inst = Offcanvas.getInstance(el) || new Offcanvas(el);

    // si está abierto, esperar a que termine de cerrarse
    if (el.classList.contains('show')) {
      el.addEventListener(
        'hidden.bs.offcanvas',
        () => {
          navigate(to);
        },
        { once: true }
      );
      inst.hide();
    } else {
      navigate(to);
    }
  };

  const goEdit = (id) => closeAndNavigate(`/item/${id}`);
  const goCheckout = () => closeAndNavigate('/checkout');
  const goHome = () => closeAndNavigate('/');

  return (
    <div
      className="offcanvas offcanvas-end pb-sm-2 px-sm-2"
      id="shoppingCart"
      tabIndex="-1"
      aria-labelledby="shoppingCartLabel"
      style={{ width: '500px' }}
    >
      <div className="offcanvas-header py-3 pt-lg-4">
        <h4 className="offcanvas-title" id="shoppingCartLabel">Tu carrito</h4>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
      </div>

      <div className="offcanvas-body">
        {isEmpty ? (
          <div className="text-center">
            <h6 className="mb-2">Tu carrito está vacío</h6>
            <p className="fs-sm mb-4">Explora nuestra variedad de productos y agrégalos para continuar.</p>
            <button className="btn btn-dark rounded-pill" onClick={goHome}>
              Seguir comprando
            </button>
          </div>
        ) : (
          <>
            <div className="list-group mb-3">
              {cart.map((it) => (
                <div key={it.id} className="list-group-item d-flex align-items-center">
                  <img
                    src={it.img}
                    alt={it.title}
                    width={56}
                    height={56}
                    className="rounded me-3 object-fit-cover"
                  />
                  <div className="me-auto">
                    <div className="fw-semibold text-truncate">{it.title}</div>
                    <div className="small text-muted">x{it.quantity} · ${it.price}</div>
                  </div>
                  <div className="me-3 fw-semibold">
                    ${(it.price * it.quantity).toLocaleString()}
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary rounded-pill"
                      onClick={() => goEdit(it.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary rounded-pill"
                      onClick={() => removeItem(it.id)}
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <button className="btn btn-outline-dark rounded-pill" onClick={clear}>
                Vaciar
              </button>
              <div className="h6 mb-0">Total: ${calcTotalPrice().toLocaleString()}</div>
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-outline-dark rounded-pill w-50" onClick={goHome}>
                Seguir comprando
              </button>
              <button className="btn btn-dark rounded-pill w-50" onClick={goCheckout}>
                Finalizar compra
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
