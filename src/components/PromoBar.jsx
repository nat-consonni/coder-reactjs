import React from 'react';

const PromoBar = () => {
  return (
    <div className="container position-relative d-flex justify-content-between z-1 py-3">
      <div className="nav animate-underline">
        <span className="text-secondary-emphasis fs-xs me-1">
          Ponte en contacto 24/7 ·
        </span>
        <a className="nav-link animate-target fs-xs fw-semibold p-0" href="tel:+59892093467">
          092 093 467
        </a>
      </div>
      <a className="text-secondary-emphasis fs-xs text-decoration-none d-none d-md-inline" href="#!">
        🔥 20% off en plan recambio de colchones
      </a>
      <ul className="nav gap-4">
        <li className="animate-underline">
          <a className="nav-link animate-target fs-xs p-0" href="#!">
            Lista de deseos
          </a>
        </li>
        <li className="animate-underline">
          <a className="nav-link animate-target fs-xs p-0" href="#!">
            <i className="bi bi-person"></i> Mi cuenta
          </a>
        </li>
      </ul>
    </div>
  );
};

export default PromoBar;
