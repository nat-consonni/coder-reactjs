import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function BackdropFix() {
  const { pathname } = useLocation();

  useEffect(() => {
    // sacar overlay/backdrop de offcanvas
    document.querySelectorAll('.offcanvas-backdrop').forEach((el) => el.remove());
    // restaura el scroll si quedó bloqueado
    document.body.style.removeProperty('overflow');
  }, [pathname]);

  return null;
}
