# Coder ReactJS Project — Entrega 2 (Navega las rutas)

Proyecto de ReactJS para una tienda de muebles en línea. Incluye componentes como **NavBar**, **PromoBar**, **ItemListContainer**, y añade **navegación con rutas** (categorías y detalle de producto). Se usan **Bootstrap 5** y **SASS** para estilos, y datos mock con **Promises** (retardo breve).

## Funcionalidades

1. **NavBar**
   - Barra de navegación fija.
   - Menú con categorías (dropdown) y enlaces sin recargar la página (React Router).
   - Ícono de carrito y buscador.

2. **PromoBar**
   - Barra superior con promociones / mensajes.

3. **Catálogo (ItemListContainer)**
   - Lista de productos.
   - Filtrado por categoría mediante la ruta `/category/:categoryId`.
   - Renderizado del listado con `map()` y `key={item.id}`.

4. **Detalle de producto (ItemDetail)**
   - Vista individual en la ruta `/item/:itemId`.
   - Muestra imagen, precio, stock, descripción y **ItemCount** para seleccionar cantidad.

5. **Navegación (React Router)**
   - Rutas: `/` (home), `/category/:categoryId`, `/item/:itemId`, `/discontinuados` y `*` (404).
   - **Breadcrumbs** dinámicos (Inicio / Categoría / Producto).

6. **Carrito de Compras (Offcanvas)**
   - Panel lateral que se abre desde el ícono del carrito (estructura lista para integrar lógica).

7. **Estilos**
   - **Bootstrap 5** + **SASS** (CSS compilado).
   - Componentes auxiliares como **HeroCarousel** (solo en Home) y **CategoryBand** (banda de categorías sobre el footer).

8. **Datos (mock)**
   - Productos locales (`data/products.js`).
   - Servicios con **Promises** y retardo breve (`getProducts`, `getProductById`) para simular llamadas asíncronas.

## Cómo ejecutar (resumen)
- Instalar dependencias: `npm install`
- Dev server + SASS en watch: `npm run dev`
- Build de producción: `npm run build`
