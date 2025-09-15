import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getProductById } from '../services/productsApi'; // 👈 ahora leemos de Firestore

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

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  // Si estamos en /item/:itemId, traemos el producto desde Firestore
  useEffect(() => {
    let mounted = true;
    if (isItem && itemId) {
      setLoading(true);
      getProductById(itemId)
        .then((p) => { if (mounted) setProduct(p || null); })
        .finally(() => { if (mounted) setLoading(false); });
    } else {
      setProduct(null);
    }
    return () => { mounted = false; };
  }, [isItem, itemId]);

  const crumbs = useMemo(() => {
    const base = [{ label: 'Inicio', to: '/' }];

    if (isCategory) {
      const catLabel = labelForCategory(categoryId);
      return [...base, { label: catLabel, to: null, active: true }];
    }

    if (isItem) {
      const catSlug = product?.category;
      const catLabel = labelForCategory(catSlug);
      const productLabel = loading ? 'Cargando…' : (product?.title || itemId);

      const arr = [...base];
      if (catSlug) arr.push({ label: catLabel, to: `/category/${catSlug}` });
      return [...arr, { label: productLabel, to: null, active: true }];
    }

    if (isDiscontinued) {
      return [...base, { label: 'Discontinuados', to: null, active: true }];
    }

    return base;
  }, [isCategory, isItem, isDiscontinued, categoryId, itemId, product, loading]);

  if (isHome) return null;

  return (
    <nav aria-label="breadcrumb" className="container mt-3 mb-4">
      <ol className="breadcrumb mb-0">
        {crumbs.map((c, idx) => {
          const isLast = idx === crumbs.length - 1;
          const active = isLast || c.active;
          return (
            <li
              key={idx}
              className={`breadcrumb-item ${active ? 'active' : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              {!active && c.to ? <Link to={c.to}>{c.label}</Link> : c.label}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
