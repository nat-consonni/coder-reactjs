import { PRODUCTS } from '../data/products';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export async function getProducts(categoryId) {
  await delay(600);
  return categoryId ? PRODUCTS.filter(p => p.category === categoryId) : PRODUCTS;
}

export async function getProductById(id) {
  await delay(500);
  return PRODUCTS.find(p => p.id === id);
}
