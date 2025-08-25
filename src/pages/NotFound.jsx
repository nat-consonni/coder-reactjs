import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <main style={{padding:16}}>
      <h2>404 · Página no encontrada</h2>
      <p>Revisá la URL o volvé al <Link to="/">inicio</Link>.</p>
    </main>
  );
}
