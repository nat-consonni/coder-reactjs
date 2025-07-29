# Coder ReactJS Project

Este es un proyecto de ReactJS para la creación de una tienda de muebles en línea. Incluye una serie de componentes clave como un **NavBar**, **PromoBar**, y **ItemListContainer**. El propósito de este proyecto es presentar la estructura básica de una tienda en línea con la funcionalidad de un carrito de compras.

## Funcionalidades

1. **NavBar**
   - Barra de navegación fija en la parte superior.
   - Incluye un botón de carrito y un buscador.
   - Se utiliza Bootstrap para la estructura y los estilos.

2. **PromoBar**
   - Barra promocional con información de contacto y descuentos.
   - Se renderiza encima del NavBar.

3. **ItemListContainer**
   - Lista de productos que se muestra debajo del NavBar.
   - Los productos son pasados como props desde el componente principal **App**.
   - Muestra detalles como nombre, descripción, precio e imagen de cada producto.
   - En las siguientes pre entregas, incluiré los productos desde un json.

4. **Carrito de Compras (Offcanvas)**
   - El carrito se puede abrir al hacer clic en el ícono del carrito en el NavBar.
   - Actualmente muestra un mensaje de "carrito vacío", pero está listo para ser expandido con productos.
