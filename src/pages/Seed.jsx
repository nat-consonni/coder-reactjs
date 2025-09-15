import React, { useState } from 'react';
import { writeBatch, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { PRODUCTS } from '../data/products';

export default function Seed() {
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);

  const handleSeed = async () => {
    setRunning(true);
    setError(null);
    try {
      const batch = writeBatch(db);

      PRODUCTS.forEach((p) => {
        const { id, ...data } = p;
        // Tip: guardar el id como ID del doc (no es necesario tenerlo repetido dentro)
        batch.set(doc(db, 'products', String(id)), data);
      });

      await batch.commit();
      setDone(true);
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="container py-5">
      <h3>Seed de productos</h3>
      <p className="text-muted">Cargará {PRODUCTS.length} productos en la colección <code>products</code>.</p>

      {error && <div className="alert alert-danger">{error}</div>}
      {done ? (
        <div className="alert alert-success">¡Listo! Productos cargados.</div>
      ) : (
        <button className="btn btn-dark rounded-pill" onClick={handleSeed} disabled={running}>
          {running ? 'Cargando…' : 'Cargar productos en Firestore'}
        </button>
      )}
    </div>
  );
}
