# Proyecto Final – E-commerce (React)

Desarrollé una **e-commerce** (rediseño de la mueblería uruguaya Divino) con **React**, **React Router**, **Context API** para el carrito, **Firebase Firestore** para productos y órdenes, **Bootstrap 5** y **SASS**.

## Funcionalidades

1. **NavBar**

   * Menú con categorías (dropdown) y navegación SPA (sin recargar).
   * **CartWidget** siempre visible; el contador se oculta cuando es **0**.
   * Buscador (UI) y acceso al carrito (offcanvas).

2. **PromoBar**

   * Barra superior para mensajes/promos.

3. **Catálogo (ItemListContainer)**

   * Lista de productos.
   * Filtrado por categoría vía ruta **`/category/:categoryId`**.
   * Renderizado con `map()` y `key={item.id}`.

4. **Detalle de producto (ItemDetail)**

   * Vista individual en **`/item/:itemId`**.
   * Muestra imagen, precio, stock, descripción y **ItemCount**.
   * **ItemCount siempre visible** (mejor UX): puedo ajustar cantidades aun después de agregar.
   * Acciones: **Finalizar compra** (primaria) y **Quitar** (secundaria).

5. **Carrito (Context API)**

   * Estado global con: **addItem**, **removeItem**, **clear**, **isInCart**, totales.
   * El **CartWidget** muestra el **total de unidades** agregadas.
   * **Offcanvas** del carrito con listado (subtotales y total), **Editar** (lleva al detalle) y **Quitar**.
   * Botones del offcanvas: **Finalizar compra** y **Seguir comprando**.

6. **Checkout**

   * Formulario validado (nombre, email, teléfono, dirección, ciudad, CP).
   * Genera **orden en Firestore** (`orders`) y muestra el **ID de la compra**.
   * Mensaje de confirmación: “te enviaremos un email con los detalles”.

7. **UX & extra**

   * **Loaders** y estados vacíos (“Cargando…”, “Carrito vacío”, “Sin descripción”).
   * **Breadcrumbs**: Inicio / Categoría / **Nombre del producto**.
   * **HeroCarousel** (solo Home, productos destacados) y **CategoryBand** sobre el footer.
   * **Footer** global.

## Rutas

* `/` (Home)
* `/category/:categoryId`
* `/item/:itemId`
* `/cart`
* `/checkout`
* `/discontinuados`
* `*` (404)

## Stack

* **React 19**, **React Router**
* **Context API**
* **Firebase Firestore**
* **Bootstrap 5** + **SASS**

## Firebase (.env y colecciones)

Colocar un archivo **`.env`** en la raíz:

```bash
REACT_APP_FIREBASE_API_KEY=xxxx
REACT_APP_FIREBASE_AUTH_DOMAIN=xxxx
REACT_APP_FIREBASE_PROJECT_ID=xxxx
REACT_APP_FIREBASE_STORAGE_BUCKET=xxxx
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=xxxx
REACT_APP_FIREBASE_APP_ID=xxxx
```

Colecciones usadas:

* **products**: `title, description, price:number, category, stock:number, img, destacado:boolean`
* **orders**: `buyer:{...}, items:[{id,title,price,quantity}], total:number, createdAt, status`

> Los productos se leen desde **Firestore** y las órdenes se crean en **orders** al confirmar el checkout.

## Scripts

```bash
npm install
npm start        # Dev server (CRA)
# o, si tengo watch de SASS configurado:
npm run dev

npm run build    # Build de producción
```

## Estructura (resumen)

```
src/
  components/ (NavBar, PromoBar, HeroCarousel, ItemList, ItemDetail, ItemCount, CartWidget, Breadcrumbs, ShoppingCart, Footer, CategoryBand)
  context/     (CartContext)
  firebase/    (config.js)
  pages/       (Cart, Checkout, ItemDetailContainer, Discontinuados, NotFound)
  services/    (productsApi - Firestore)
  styles/      (styles.scss + parciales)
  App.js / index.js
```

## Criterios del curso cubiertos

* Listado y detalle dinámicos (containers + presentación).
* Navegación SPA con **React Router**.
* **Context** para el carrito (estado, totales, widget reactivo).
* **Firestore**: lectura de productos y creación de órdenes.
* Renderizado condicional (loaders/empty states).
* **README** y convenciones de estructura.

## Decisiones UX/UI

* Mantengo **ItemCount visible** para permitir ajustar cantidades en cualquier momento.
* **CartWidget** siempre presente; solo oculto el **contador** si está en cero.
* En el detalle, priorizo **Finalizar compra** como acción principal y dejo **Quitar** como secundaria.
