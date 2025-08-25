import ItemCount from './ItemCount';

export default function ItemDetail({ product }) {
  const { title, price, img, stock } = product;
  const handleAdd = (qty) => console.log(`Agregado ${qty} de ${title}`);
  return (
    <main className="detail">
      <img src={img} alt={title} />
      <div className="panel">
        <h2>{title}</h2>
        <p>USD {price}</p>
        <p>Stock: {stock}</p>
        <ItemCount stock={stock} initial={1} onAdd={handleAdd} />
      </div>
    </main>
  );
}
