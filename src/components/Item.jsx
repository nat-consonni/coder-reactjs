import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ product }) => {
  const { id, title, description, price, img } = product;

  return (
    <div className="card h-100">
      <img src={img} className="card-img-top" alt={title} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        {description && <p className="card-text">{description}</p>}
        <p className="h6 mt-auto">${price}</p>
        <Link to={`/item/${id}`} className="btn btn-dark mt-2">Ver detalle</Link>
      </div>
    </div>
  );
};

export default Item;
