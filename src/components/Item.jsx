import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ product }) => {
  const { id, title, description, price, img } = product;

  return (
    <div className="product-card border rounded-1 h-100 p-4">
      <a className='text-decoration-none text-color-primary' href={`/item/${id}`}>
        <div className='img-wrapper round-1'>
          <img src={img} className="card-img-top" alt={title} />
        </div>
        <div className='product-info'>
          <p className="card-title"><strong>{title}</strong></p>
          <p className='text-truncate'>{description}</p>
          <p className="h5 mt-auto">$ {price}</p>
        </div>
      </a>
      <div className='footer mt-3 d-flex align-items-center gap-2'>
        <Link to={`/item/${id}`} className="btn btn-dark rounded-pill flex-grow-1">Agregar al carrito</Link>
        <Link to={`/item/${id}`} className="btn btn-secondary rounded-circle p-2 d-inline-flex align-items-center justify-content-center flex-shrink-0 btn-agregar-a-favoritos" aria-label="Agregar a favoritos"><i class="bi bi-heart"></i></Link>
      </div>
    </div>
  );
};

export default Item;