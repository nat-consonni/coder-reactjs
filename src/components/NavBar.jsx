import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import ShoppingCart from './ShoppingCart';

const NavBar = () => {
  return (
    <header className="navbar-sticky sticky-top container z-fixed px-2" data-sticky-element="">
      <div className="navbar navbar-expand-lg flex-nowrap bg-body rounded-pill shadow px-3 mx-1">
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
        <Link className="navbar-brand position-relative z-1 ms-4 ms-sm-5 ms-lg-4 me-2 me-sm-0 me-lg-3" to="/">
          Divino
        </Link>

        {/* Navegación principal */}
        <nav
          className="offcanvas offcanvas-start"
          id="navbarNav"
          tabIndex={-1}
          aria-labelledby="navbarNavLabel"
        >
          <div className="offcanvas-header py-3">
            <h5 className="offcanvas-title" id="navbarNavLabel">
              ¿Qué estás buscando?
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body pt-3 pb-4 py-lg-0 mx-lg-auto">
            <ul className="navbar-nav position-relative">
              <li className="nav-item me-lg-n1 px-2">
                <NavLink className="nav-link fs-sm" to="/" end>
                  Inicio
                </NavLink>
              </li>
              <li className="nav-item dropdown position-static me-lg-n1 px-2">
                <button
                  className="nav-link dropdown-toggle fs-sm btn btn-link p-0 h-100"
                  type="button"
                  id="comprarDropdown"
                  data-bs-toggle="dropdown"
                  data-bs-trigger="hover"
                  aria-expanded="false"
                >
                  Comprar
                </button>
                <div className="dropdown-menu p-4" aria-labelledby="comprarDropdown">
                  <div className="d-flex flex-column flex-lg-row gap-4">
                    <ul className="nav flex-column gap-2 mt-0"> 
                      <li>
                        <NavLink className="nav-link d-inline fw-normal text-truncate p-0" to="/category/colchones">Colchones y sommiers</NavLink>
                      </li>
                      <li>
                        <NavLink className="nav-link d-inline fw-normal text-truncate p-0" to="/category/living">Living</NavLink>
                      </li>
                      <li>
                        <NavLink className="nav-link d-inline fw-normal text-truncate p-0" to="/category/textiles">Textiles del hogar</NavLink>
                      </li>
                      <li>
                        <NavLink className="nav-link d-inline fw-normal text-truncate p-0" to="/category/oficina">Oficina</NavLink>
                      </li>
                      <li>
                        <NavLink className="nav-link d-inline fw-normal text-truncate p-0" to="/category/comedor">Comedor</NavLink>
                      </li>
                      <li>
                        <NavLink className="nav-link d-inline fw-normal text-truncate p-0" to="/category/cocinas">Cocinas</NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="nav-item me-lg-n1 px-2">
                <NavLink className="nav-link fs-sm" to="/discontinuados">
                  Discontinuados
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>

        {/* Button group */}
        <div className="d-flex gap-sm-1 position-relative z-1">
          {/* Carrito */}
          <button
            type="button"
            className="btn btn-icon fs-lg btn-outline-secondary border-0 rounded-circle me-2 button-cart"
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
              className="btn btn-icon fs-lg btn-secondary rounded-circle button-cart"
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
