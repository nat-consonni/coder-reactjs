import React from 'react';

const ItemListContainer = ({ items }) => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Nuestros Productos</h2>

      <div className="row">
        {items.length === 0 ? (
          <p className="text-center">No hay productos disponibles.</p>
        ) : (
          items.map((item, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                <img src={item.image} className="card-img-top" alt={item.name} />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="h6">${item.price}</p>
                  <a href="#" className="btn btn-dark">Agregar al carrito</a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ItemListContainer;
