// src/components/NavBar.jsx
import { Link, NavLink } from 'react-router-dom';
import CartWidget from './CartWidget';

const categories = [
  { id: 'sillones', label: 'Sillones' },
  { id: 'mesas',    label: 'Mesas' },
  { id: 'sillas',   label: 'Sillas' },
  { id: 'colchones',label: 'Colchones' },
];

export default function NavBar() {
  return (
    <header className="navbar">
      <Link to="/" className="logo">Divino Uruguay</Link>
      <nav className="menu">
        {categories.map(c => (
          <NavLink key={c.id} to={`/category/${c.id}`} className="link">
            {c.label}
          </NavLink>
        ))}
      </nav>
      <CartWidget />
    </header>
  );
}
