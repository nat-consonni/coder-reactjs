import React from 'react';
import { Link } from 'react-router-dom';

export default function Discontinuados() {
  return (
    <main className="container py-5 text-center">
      <h2 className="mb-3 mt-5">Productos discontinuados</h2>
      <p className="text-body-secondary">
        Estamos reorganizando el catálogo. Pronto vas a encontrar acá la lista de productos discontinuados.
      </p>
      <Link to="/" className="btn btn-dark mt-3">Volver al inicio</Link>
    </main>
  );
}
