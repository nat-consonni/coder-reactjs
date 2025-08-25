import ItemCount from './ItemCount';

const formatUYU = (value) =>
  new Intl.NumberFormat('es-UY', { style: 'currency', currency: 'UYU', maximumFractionDigits: 0 }).format(value);

export default function ItemDetail({ product }) {
  const { title, price, img, stock, description = '' } = product;
  const handleAdd = (qty) => console.log(`Agregado ${qty} de ${title}`);

  return (
    <main className="item-detail container">
      <div className="row g-4">
        <div className="col-12 col-sm-5">
          <div className='img-wrapper border rounded-1 p-4'>
            <img className="w-100" src={img} alt={title} />
          </div>
        </div>

        <div className="col-12 col-sm-7">
          <h4 className="mb-2">{title}</h4>
          <p className="h2 mb-1">{formatUYU(price)}</p>
          <p className="text-muted mb-3">Disponibles: {stock}</p>

          <ItemCount stock={stock} initial={1} onAdd={handleAdd} />

          <div className="description mt-4">
            <p className="mb-0">{description || 'Sin descripción.'}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
