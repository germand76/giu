import { generarOpcionesCantidadHTML } from './cantidades.js';
import { obtenerPedido } from './pedidoStore.js';
import { formatearPrecio } from './config.js';

export function renderProductos(productos, contenedor, tipoCantidad) {
  contenedor.innerHTML = '';

  if (!productos.length) {
    contenedor.innerHTML = '<p class="sin-productos">No hay productos disponibles.</p>';
    return;
  }

  const pedido = obtenerPedido(); // para restaurar cantidades
  const fragment = document.createDocumentFragment();

  productos.forEach(producto => {
    fragment.appendChild(crearCardProducto(producto, tipoCantidad, pedido));
  });

  contenedor.appendChild(fragment);
}

function crearCardProducto(producto, tipoCantidad, pedido) {
  const div = document.createElement('div');
  div.classList.add('producto');

  div.dataset.id = producto.id;
  div.dataset.categoria = producto.id_categoria;
  div.dataset.tipoCantidad = tipoCantidad;

  const enPedido = pedido[String(producto.id)];
  const cantidadInicial = enPedido ? Number(enPedido.cantidad) : 0;

  let selectorCantidad = '';

  if (tipoCantidad === 'entera') {
    selectorCantidad = `
      <div class="contador">
        <button class="btn-menos" type="button">-</button>
        <span class="cantidad">${cantidadInicial}</span>
        <button class="btn-mas" type="button">+</button>
      </div>
    `;
  } else {
    selectorCantidad = `
      <label class="label-cantidad">
        Cantidad
        <select class="select-cantidad">
          <option value="0">0</option>
          ${generarOpcionesCantidadHTML()}
        </select>
      </label>
    `;
  }

  div.innerHTML = `
    <h6>${producto.nombre}</h6>
    ${producto.descripcion ? `<p class="descripcion">${producto.descripcion}</p>` : ''}
    <p class="precio">${formatearPrecio(producto.precio)}</p>
    ${selectorCantidad}
  `;

  // setear select si aplica
  if (tipoCantidad !== 'entera') {
    const select = div.querySelector('.select-cantidad');
    select.value = String(cantidadInicial);
  }

  return div;
}
