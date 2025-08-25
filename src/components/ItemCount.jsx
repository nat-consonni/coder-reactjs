import { useState } from 'react';
export default function ItemCount({ stock = 0, initial = 1, onAdd }) {
  const [count, setCount] = useState(initial);
  const dec = () => setCount(c => Math.max(1, c - 1));
  const inc = () => setCount(c => Math.min(stock, c + 1));
  return (
    <div className="count">
      <div className="stepper">
        <button className='btn btn-outline-primary me-3' onClick={dec} disabled={count <= 1}>-</button>
        <span className='d-inline-block counter border py-2 rounded-1 bg-gray'>{count}</span>
        <button className='btn btn-outline-primary ms-3' onClick={inc} disabled={count >= stock}>+</button>
      </div>
      <div className='col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 footer mt-3 d-flex align-items-center gap-2'>
        <button className="btn btn-dark rounded-pill flex-grow-1" disabled={!stock} onClick={() => onAdd?.(count)}>
        Agregar al carrito
        </button>
        <button className="btn btn-secondary rounded-circle p-2 d-inline-flex align-items-center justify-content-center flex-shrink-0 btn-agregar-a-favoritos" aria-label="Agregar a favoritos">
          <i className="bi bi-heart"></i>
        </button>
      </div>
    </div>
  );
}
