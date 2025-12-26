import { renderProductos } from './productosRenderer.js';
import { CATEGORIAS_ENTERAS } from './config.js';

export async function initCategoriasMenu(config) {
  const {
    categoriasUrl,
    categoriasContainer,
    categoriaInicial
  } = config;

  let categorias = [];

  try {
    const res = await fetch(categoriasUrl);
    categorias = await res.json();
  } catch (err) {
    console.error('Error cargando categorías', err);
    return;
  }

  categoriasContainer.innerHTML = '';

  categorias.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'categoria-btn';
    btn.textContent = cat.nombre;
    btn.dataset.id = cat.id;

    btn.addEventListener('click', () => {
      seleccionarCategoria(cat.id);
    });

    categoriasContainer.appendChild(btn);
  });

  const inicial = categoriaInicial ?? categorias[0]?.id;
  if (inicial) seleccionarCategoria(inicial);
}

/* ================================================= */

async function seleccionarCategoria(idCategoria) {
  marcarCategoriaActiva(idCategoria);

  const tipoCantidad = CATEGORIAS_ENTERAS.includes(Number(idCategoria))
  ? 'entera'
  : 'fraccionada';

  let productos = [];

  try {
    const res = await fetch(
      `/api/productos?categoria=${idCategoria}`
    );
    productos = await res.json();
  } catch (err) {
    console.error('Error cargando productos', err);
    return;
  }

  renderProductos(
    productos,
    document.getElementById('productos'),
    tipoCantidad
  );

  const btn = document.querySelector(
    `.categoria-btn[data-id="${idCategoria}"]`
  );

  if (btn) {
    document.getElementById('titulo-categoria').textContent =
      btn.textContent;
  }

  sessionStorage.setItem('categoriaActiva', idCategoria);
}

/* ================================================= */

function marcarCategoriaActiva(idCategoria) {
  document.querySelectorAll('.categoria-btn').forEach(btn => {
    btn.classList.toggle(
      'activa',
      Number(btn.dataset.id) === Number(idCategoria)
    );
  });
}
