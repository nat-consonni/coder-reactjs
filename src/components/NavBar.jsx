// src/components/NavBar.js
import React from 'react';
import ShoppingCart from './ShoppingCart';

const NavBar = () => {
  return (
    <header className="navbar-sticky sticky-top container z-fixed px-2" data-sticky-element="">
      <div className="navbar navbar-expand-lg flex-nowrap bg-body rounded-pill shadow ps-0 mx-1">
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark rounded-pill z-0 d-none d-block-dark"></div>

        {/* Menu mobile (hamburguesa) */}
        <button
          type="button"
          className="navbar-toggler ms-3"
          data-bs-toggle="offcanvas"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar brand (logo) */}
        <a className="navbar-brand position-relative z-1 ms-4 ms-sm-5 ms-lg-4 me-2 me-sm-0 me-lg-3" href="/">
          Divino
        </a>

        {/* Navegación principal */}
        <nav className="offcanvas offcanvas-start" id="navbarNav" tabindex="-1" aria-labelledby="navbarNavLabel">
          <div className="offcanvas-header py-3">
            <h5 className="offcanvas-title" id="navbarNavLabel">
              ¿Qué estás buscando?
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body pt-3 pb-4 py-lg-0 mx-lg-auto">
            <ul className="navbar-nav position-relative">
              <li className="nav-item me-lg-n1 me-xl-0">
                <a className="nav-link fs-sm active" aria-current="page" href="#">
                  Inicio
                </a>
              </li>
              <li className="nav-item dropdown position-static me-lg-n1 me-xl-0">
                <a
                  className="nav-link dropdown-toggle fs-sm"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  data-bs-trigger="hover"
                  aria-expanded="false"
                >
                  Comprar
                </a>
                <div className="dropdown-menu p-4">
                  <div className="d-flex flex-column flex-lg-row gap-4">
                    <ul className="nav flex-column gap-2 mt-0"> 
                      <li>
                        <a className="nav-link d-inline fw-normal text-truncate p-0" href="#">Colchones y sommiers</a>
                      </li>
                      <li>
                        <a className="nav-link d-inline fw-normal text-truncate p-0" href="#">Living</a>
                      </li>
                      <li>
                        <a className="nav-link d-inline fw-normal text-truncate p-0" href="#">Textiles del hogar</a>
                      </li>
                      <li>
                        <a className="nav-link d-inline fw-normal text-truncate p-0" href="#">Oficina</a>
                      </li>
                      <li>
                        <a className="nav-link d-inline fw-normal text-truncate p-0" href="#">Comedor</a>
                      </li>
                      <li>
                        <a className="nav-link d-inline fw-normal text-truncate p-0" href="#">Cocinas</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="nav-item me-lg-n1 me-xl-0">
                <a className="nav-link fs-sm active" aria-current="page" href="#">
                  Discontinuados
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Button group */}
        <div className="d-flex gap-sm-1 position-relative z-1">
          {/* Carrito */}
          <button
            type="button"
            className="btn btn-icon fs-lg btn-outline-secondary border-0 rounded-circle animate-scale me-2"
            data-bs-toggle="offcanvas"
            data-bs-target="#shoppingCart"
            aria-controls="shoppingCart"
            aria-label="Shopping cart"
          >
            <i className="bi bi-cart"></i>
            <span id='cart-products-counter' className='cart-products-counter'>2</span>
          </button>

          {/* Buscador */}
          <div className="dropdown">
            <button
              type="button"
              className="btn btn-icon fs-lg btn-secondary rounded-circle animate-scale"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-label="Toggle search bar"
            >
              <i className="bi bi-search"></i>
            </button>
            <div className="dropdown-menu dropdown-menu-end p-3" style={{ minWidth: '300px' }}>
              <form className="position-relative">
                <input
                  type="search"
                  className="form-control rounded-pill"
                  placeholder="Busca por nombre de producto, categoría o código."
                  data-autofocus="dropdown"
                />
                <button type="submit" className="btn btn-icon btn-sm fs-lg btn-secondary rounded-circle position-absolute top-0 end-0 mt-1 me-1" aria-label="Search">
                  <i className="bi bi-arrow-right"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ShoppingCart />
    </header>
  );
};

export default NavBar;
