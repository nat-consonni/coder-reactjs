import React from 'react';

const ShoppingCart = () => {
  return (
    <div className="offcanvas offcanvas-end pb-sm-2 px-sm-2" id="shoppingCart" tabindex="-1" aria-labelledby="shoppingCartLabel" style={{ width: '500px' }}>
      <div className="offcanvas-header py-3 pt-lg-4">
        <h4 className="offcanvas-title" id="shoppingCartLabel">Tu carrito</h4>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body text-center">
        <h6 className="mb-2">Tu carrito esta vacío!</h6>
        <p className="fs-sm mb-4">Explora nuestra amplia variedad de productos y agrégalos a tu carrito para continuar con tu compra.</p>
        <a className="btn btn-dark rounded-pill" href="shop-catalog-furniture.html">Continuar comprando</a>
      </div>
    </div>
  );
};

export default ShoppingCart;
