import React from 'react';
import { Link } from 'react-router-dom';

// Mapeo de tarjetas (label visible + slug de la ruta)
const CATEGORIES = [
  { slug: 'colchones', label: 'Dormitorio',  img: '/assets/categories/dormitorio.webp' },
  { slug: 'living',    label: 'Sala de estar', img: '/assets/categories/living.webp' },
  { slug: 'textiles',  label: 'Textiles',          img: '/assets/categories/textiles.png' },
  { slug: 'comedor',   label: 'Comedor',    img: '/assets/categories/comedor.jpg' },
  { slug: 'oficina',   label: 'Oficina',       img: '/assets/categories/oficina.png' },
  { slug: 'cocinas',   label: 'Cocina',        img: '/assets/categories/cocina.webp' },
];

export default function CategoryBand() {
  return (
    <section className="container py-5 my-2 my-sm-3 mb-md-2 mt-lg-4 my-xl-5">
      <div className="row flex-nowrap flex-md-wrap justify-content-md-center g-0 gap-4 gap-md-0">
        {CATEGORIES.map((c) => (
          <div key={c.slug} className="col col-md-4 col-lg-3 col-xl-2 mb-4">
            <div className="category-card w-100 text-center px-1 px-lg-2 px-xxl-3 mx-auto">
              <div className="category-card-body">
                <Link className="d-block text-decoration-none" to={`/category/${c.slug}`}>
                  <div className="bg-body-tertiary rounded-pill mb-3 mx-auto" style={{ maxWidth: 164 }}>
                    <div className="ratio ratio-1x1">
                      <img
                        src={c.img}
                        className="rounded-pill w-100 h-100 object-fit-cover"
                        alt={c.label}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <h3 className="category-card-title h6 text-truncate">{c.label}</h3>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
