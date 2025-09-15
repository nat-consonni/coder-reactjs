import { createContext, useContext, useState } from 'react';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // [{ id, title, price, img, stock, quantity }]

  const isInCart = (id) => cart.some((it) => it.id === id);

  const addItem = (product, quantity = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((it) => it.id === product.id);
      const clamp = (q, s) => (s ? Math.min(q, s) : q);
      if (idx !== -1) {
        const next = [...prev];
        next[idx] = {
          ...next[idx],
          quantity: clamp(next[idx].quantity + quantity, product.stock ?? next[idx].stock ?? Infinity),
          stock: product.stock ?? next[idx].stock ?? Infinity,
        };
        return next;
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          img: product.img,
          stock: product.stock ?? Infinity,
          quantity: clamp(quantity, product.stock ?? Infinity),
        },
      ];
    });
  };

  // actualiza cantidad absoluta (reflejar cambios en vivo)
  const updateItemQty = (id, newQty) => {
    setCart((prev) => {
      const idx = prev.findIndex((it) => it.id === id);
      if (idx === -1) return prev;
      const item = prev[idx];
      const clamped = Math.max(1, Math.min(newQty, item.stock ?? Infinity));
      const next = [...prev];
      next[idx] = { ...item, quantity: clamped };
      return next;
    });
  };

  const removeItem = (id) => setCart((prev) => prev.filter((it) => it.id !== id));
  const clear = () => setCart([]);

  const getItemQuantity = (id) => cart.find((it) => it.id === id)?.quantity ?? 0;

  const calcItemsQty = () => cart.reduce((acc, it) => acc + it.quantity, 0);
  const calcTotalPrice = () => cart.reduce((acc, it) => acc + it.price * it.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        updateItemQty,   
        removeItem,
        clear,
        isInCart,
        getItemQuantity, 
        calcItemsQty,
        calcTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
