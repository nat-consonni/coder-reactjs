// src/components/Breadcrumbs.jsx
import React, { useMemo } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';

const CATEGORY_LABELS = {
  colchones: 'Colchones y sommiers',
  living: 'Living',
  textiles: 'Textiles del hogar',
  oficina: 'Oficina',
  comedor: 'Comedor',
  cocinas: 'Cocinas',
};

function labelForCategory(slug) {
  if (!slug) return '';
  return CATEGORY_LABELS[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
}

export default function Breadcrumbs() {
  const { categoryId, itemId } = useParams();
  const { pathname } = useLocation();

  const isHome = pathname === '/';
  const isCategory = pathname.startsWith('/category/');
  const isItem = pathname.startsWith('/item/');
  const isDiscontinued = pathname.startsWith('/discontinuados');

  // useMemo
  const crumbs = useMemo(() => {
    const base = [{ label: 'Inicio', to: '/' }];

    if (isCategory) {
      const catLabel = labelForCategory(categoryId);
      return [...base, { label: catLabel, to: null, active: true }];
    }

    if (isItem) {
      const product = PRODUCTS.find(p => String(p.id) === String(itemId));
      const catSlug = product?.category;
      const catLabel = labelForCategory(catSlug);
      const productLabel = product?.title || itemId;

      return [
        ...base,
        { label: catLabel, to: catSlug ? `/category/${catSlug}` : null },
        { label: productLabel, to: null, active: true },
      ];
    }

    if (isDiscontinued) {
      return [...base, { label: 'Discontinuados', to: null, active: true }];
    }

    return [...base, { label: 'Página', to: null, active: true }];
  }, [isCategory, isItem, isDiscontinued, categoryId, itemId]);


  if (isHome) return null;

  return (
    <nav aria-label="breadcrumb" className="container mt-3 mb-4">
      <ol className="breadcrumb mb-0">
        {crumbs.map((c, idx) => {
          const isLast = idx === crumbs.length - 1;
          if (isLast || c.active) {
            return (
              <li key={idx} className="breadcrumb-item active" aria-current="page">
                {c.label}
              </li>
            );
          }
          return (
            <li key={idx} className="breadcrumb-item">
              {c.to ? <Link to={c.to}>{c.label}</Link> : c.label}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
