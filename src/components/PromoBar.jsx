import React from 'react';

const PromoBar = () => {
  return (
    <div className="promo-bar container position-relative d-flex justify-content-between z-1 pt-3 small">
      <p className="contacto">
        <span className="fs-xs me-1">
          Ponte en contacto 24/7 ·
        </span>
        <a href="tel:+59892093467">
          092 093 467
        </a>
      </p>
      <a className="fs-xs text-decoration-none d-none d-md-inline" href="#!">
        🔥 20% off en plan recambio de colchones
      </a>
      <ul className="list-unstyled list-inline">
        <li className="list-inline-item mx-3">
          <a className="text-decoration-none fs-xs p-0" href="#!">
            <i className="bi bi-heart"></i> Favoritos
          </a>
        </li>
        <li className="list-inline-item">
          <a className="text-decoration-none fs-xs p-0" href="#!">
            <i className="bi bi-person"></i> Mi cuenta
          </a>
        </li>
      </ul>
    </div>
  );
};

export default PromoBar;
