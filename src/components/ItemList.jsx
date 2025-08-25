import React from 'react';
import Item from './Item';

const ItemList = ({ items = [] }) => {
  if (!items.length) return <p className="text-center">No hay productos disponibles.</p>;

  return (
    <div className="row">
      {items.map((item) => (
        <div key={item.id} className="col-xs-12 col-sm-6 col-md-3 col-lg-3 col-xl-3 mb-4">
          <Item product={item} />
        </div>
      ))}
    </div>
  );
};

export default ItemList;
