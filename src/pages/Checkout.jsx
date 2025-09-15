import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { db } from '../firebase/config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const emailOk = (v) => /\S+@\S+\.\S+/.test(v);
const phoneOk = (v) => v.replace(/\D/g, '').length >= 7;

export default function Checkout() {
  const { cart, calcTotalPrice, clear } = useCart();
  const [sending, setSending] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
  });
  const [touched, setTouched] = useState({});

  const errors = useMemo(() => {
    const e = {};
    if (!form.name.trim()) e.name = 'Ingresá tu nombre';
    if (!emailOk(form.email)) e.email = 'Email inválido';
    if (!phoneOk(form.phone)) e.phone = 'Teléfono inválido';
    if (!form.address.trim()) e.address = 'Ingresá tu dirección';
    if (!form.city.trim()) e.city = 'Ingresá tu ciudad';
    if (!form.zip.trim()) e.zip = 'Ingresá tu código postal';
    return e;
  }, [form]);

  const invalid = (k) => touched[k] && errors[k];

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  if (cart.length === 0 && !orderId) {
    return (
      <div className="container py-5">
        <h3>Checkout</h3>
        <p className="text-muted">No hay productos en el carrito.</p>
        <Link to="/" className="btn btn-dark rounded-pill">Volver</Link>
      </div>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, address: true, city: true, zip: true });
    if (Object.keys(errors).length) return;

    try {
      setSending(true);

      const items = cart.map(({ id, title, price, quantity }) => ({
        id, title, price, quantity,
      }));

      const order = {
        buyer: { ...form },
        items,
        total: calcTotalPrice(),
        createdAt: serverTimestamp(),
        status: 'pending',
      };

      const ref = await addDoc(collection(db, 'orders'), order);
      setOrderId(ref.id);
      clear();
    } catch (err) {
      console.error('Error creando orden:', err);
      alert('Hubo un problema creando la orden. Intentá nuevamente.');
    } finally {
      setSending(false);
    }
  };

  // mensaje de éxito
  if (orderId) {
    return (
      <div className="container py-5 text-center">
        <h3 className="mb-3">¡Gracias por tu compra!</h3>
        <p className="mb-2">Número de orden:</p>
        <p className="h5"><code>{orderId}</code></p>
        <p className="text-muted mt-3">
          Te enviaremos un email a <strong>{form.email}</strong> con los detalles de tu compra.
        </p>
        <Link to="/" className="btn btn-dark rounded-pill mt-2">Volver a la tienda</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h3 className="mb-4">Checkout</h3>

      <div className="row g-4">
        <div className="col-md-7">
          <form onSubmit={submit} noValidate>
            <div className="mb-3">
              <label className="form-label">Nombre y apellido</label>
              <input
                type="text"
                name="name"
                className={`form-control ${invalid('name') ? 'is-invalid' : ''}`}
                value={form.name}
                onChange={onChange}
                onBlur={onBlur}
              />
              {invalid('name') && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className={`form-control ${invalid('email') ? 'is-invalid' : ''}`}
                value={form.email}
                onChange={onChange}
                onBlur={onBlur}
              />
              {invalid('email') && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input
                type="tel"
                name="phone"
                className={`form-control ${invalid('phone') ? 'is-invalid' : ''}`}
                value={form.phone}
                onChange={onChange}
                onBlur={onBlur}
              />
              {invalid('phone') && <div className="invalid-feedback">{errors.phone}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Dirección</label>
              <input
                type="text"
                name="address"
                className={`form-control ${invalid('address') ? 'is-invalid' : ''}`}
                value={form.address}
                onChange={onChange}
                onBlur={onBlur}
              />
              {invalid('address') && <div className="invalid-feedback">{errors.address}</div>}
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Ciudad</label>
                <input
                  type="text"
                  name="city"
                  className={`form-control ${invalid('city') ? 'is-invalid' : ''}`}
                  value={form.city}
                  onChange={onChange}
                  onBlur={onBlur}
                />
                {invalid('city') && <div className="invalid-feedback">{errors.city}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Código Postal</label>
                <input
                  type="text"
                  name="zip"
                  className={`form-control ${invalid('zip') ? 'is-invalid' : ''}`}
                  value={form.zip}
                  onChange={onChange}
                  onBlur={onBlur}
                />
                {invalid('zip') && <div className="invalid-feedback">{errors.zip}</div>}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-dark rounded-pill mt-4"
              disabled={sending}
            >
              {sending ? 'Procesando…' : 'Confirmar compra'}
            </button>
          </form>
        </div>

        <div className="col-md-5">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title mb-3">Resumen</h6>
              <div className="d-flex justify-content-between">
                <span>Total</span>
                <strong>${calcTotalPrice().toLocaleString()}</strong>
              </div>
              <p className="text-muted small mt-3 mb-0">
                Al confirmar, crearás la orden en nuestro sistema. Recibirás un correo con el detalle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
