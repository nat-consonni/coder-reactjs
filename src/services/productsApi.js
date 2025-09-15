import { db } from '../firebase/config';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';

export async function getProducts(categoryId) {
  const col = collection(db, 'products');
  const snap = categoryId
    ? await getDocs(query(col, where('category', '==', categoryId)))
    : await getDocs(col);

  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getProductById(id) {
  const ref = doc(db, 'products', id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}
