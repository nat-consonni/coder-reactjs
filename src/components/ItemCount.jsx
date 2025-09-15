import { useState, useEffect } from 'react';

export default function ItemCount({ value, onChange, stock = Infinity, min = 1, className = '' }) {
  const [internal, setInternal] = useState(value ?? min);
  const qty = value ?? internal;

  useEffect(() => {
    if (value != null) setInternal(value);
  }, [value]);

  const dec = () => {
    const next = Math.max(min, qty - 1);
    onChange ? onChange(next) : setInternal(next);
  };
  const inc = () => {
    const next = Math.min(stock, qty + 1);
    onChange ? onChange(next) : setInternal(next);
  };

  return (
    <div className={`input-group w-auto ${className}`}>
      <button type="button" className="btn btn-outline-secondary rounded-pill" onClick={dec} disabled={qty <= min}>-</button>
      <input className="form-control text-center" style={{ maxWidth: 80 }} value={qty} readOnly />
      <button type="button" className="btn btn-outline-secondary rounded-pill" onClick={inc} disabled={qty >= stock}>+</button>
    </div>
  );
}
