import React from 'react';

const CartWidget = () => {
  return (
    <button type="button" className="btn btn-icon fs-lg btn-outline-secondary border-0 rounded-circle animate-scale me-2" data-bs-toggle="offcanvas" data-bs-target="#shoppingCart" aria-controls="shoppingCart" aria-label="Shopping cart">
      <i className="bi bi-cart"></i>
    </button>
  );
};

export default CartWidget;
