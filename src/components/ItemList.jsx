import React from 'react';
import { Link } from 'react-router-dom';

export default function ItemList({ items = [] }) {
  if (!items.length) {
    return <p className="text-center">No hay productos en esta categoría.</p>;
  }

  return (
    <div className="row g-4">
      {items.map((item) => (
        <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="card h-100">
            <Link to={`/item/${item.id}`} className="ratio ratio-4x3">
              <img
                src={item.img}
                alt={item.title}
                className="object-fit-cover rounded-top"
              />
            </Link>

            <div className="card-body d-flex flex-column">
              <h6 className="card-title mb-1 text-truncate">{item.title}</h6>
              <p className="card-text text-muted small mb-2 text-truncate">
                {item.description}
              </p>

              <div className="mt-auto d-flex align-items-center gap-2">
                <Link
                  to={`/item/${item.id}`}
                  className="btn btn-dark rounded-pill flex-grow-1"
                >
                  Ver detalle
                </Link>

                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-circle p-0 d-inline-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ width: 40, height: 40 }}
                  aria-label="Agregar a favoritos"
                >
                  <i className="bi bi-heart" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
