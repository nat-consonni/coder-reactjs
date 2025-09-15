import { db } from '../firebase/config';
import {
  collection, addDoc, serverTimestamp,
  writeBatch, doc, getDoc
} from 'firebase/firestore';

// manejar el stock
export async function createOrderAndUpdateStock({ buyer, cart }) {
  // 1) Validar y preparar batch de stock
  const batch = writeBatch(db);
  const outOfStock = [];

  for (const item of cart) {
    const ref = doc(db, 'products', item.id);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      outOfStock.push({ id: item.id, title: item.title, reason: 'no-exists' });
      continue;
    }
    const data = snap.data();
    const currentStock = data.stock ?? 0;
    if (currentStock >= item.quantity) {
      batch.update(ref, { stock: currentStock - item.quantity });
    } else {
      outOfStock.push({ id: item.id, title: item.title, reason: 'no-stock' });
    }
  }

  if (outOfStock.length) {
    const names = outOfStock.map(i => i.title).join(', ');
    throw new Error(`Sin stock suficiente para: ${names}`);
  }

  // 2) Crear doc de orden
  const ordersRef = collection(db, 'orders');
  const total = cart.reduce((acc, it) => acc + it.price * it.quantity, 0);

  const order = {
    buyer, // { name, email, phone }
    items: cart.map(({ id, title, price, quantity }) => ({ id, title, price, quantity })),
    total,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(ordersRef, order);

  // 3) Aplicar cambios de stock
  await batch.commit();

  return docRef.id; // id de la orden
}
