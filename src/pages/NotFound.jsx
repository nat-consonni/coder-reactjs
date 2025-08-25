import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <main className='container text-center py-5'>
      <h2 className='pt-5'>404 · Página no encontrada</h2>
      <p>Revisá la URL o vuelve al <Link to="/">inicio</Link>.</p>
    </main>
  );
}
