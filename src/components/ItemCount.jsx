import { useState } from 'react';
export default function ItemCount({ stock = 0, initial = 1, onAdd }) {
  const [count, setCount] = useState(initial);
  const dec = () => setCount(c => Math.max(1, c - 1));
  const inc = () => setCount(c => Math.min(stock, c + 1));
  return (
    <div className="count">
      <div className="stepper">
        <button onClick={dec} disabled={count <= 1}>-</button>
        <span>{count}</span>
        <button onClick={inc} disabled={count >= stock}>+</button>
      </div>
      <button className="btn primary" disabled={!stock} onClick={() => onAdd?.(count)}>
        Agregar al carrito
      </button>
    </div>
  );
}
