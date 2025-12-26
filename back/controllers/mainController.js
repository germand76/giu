const connection = require('../config/db');
const path = require('path');
const mainController = {
  getFirstPage: (req, res) => {
      const sql = `
      SELECT 1
      FROM Productos
      WHERE id_categoria = 6
      AND activo = 1
      LIMIT 1
    `;

    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Error al validar promos:', err);
        return res.status(500).send('Error interno');
      }

      if (results.length > 0){
        return res.render('promos', {
          // titulo_categoria: 'Promociones',
          // hay_promos: true
        });
      }
      else{
        return res.render('menu', {
          titulo_categoria: 'Nuestro Menú',
          // hay_promos: false
        });
      }

      // const hayPromos = results.length > 0;
    });
  },

  getMenuPage: (req, res) => {
    return res.render('menu', {
      titulo_categoria: 'Nuestro Menú',
    });
  },

  getPagePedido: (req, res) => {
    return res.render('pedido');
  },

  getPageCheckout: (req, res) => {
    return res.render('checkout');
  },

  getPagePostPedido: (req, res) => {
    return res.render('post-pedido');
  },

  getPageFinalizarPedido: (req, res) => {
    return res.render('finalizar-pedido');
  },

  obtenerCategorias: (req, res) => {
    const sql = `
      SELECT id, nombre
      FROM Categorias
      WHERE activo = 1
      ORDER BY orden ASC
    `;

    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Error al obtener categorías:', err);
        return res.status(500).json({ ok: false });
      }

      res.json(results);
    });
  },

  obtenerProductosPorCategoria: (req, res) => {
    const { categoria } = req.query;

    if (!categoria) {
      return res.status(400).json({ error: 'Categoría requerida' });
    }

    const sql = `
      SELECT id, nombre, descripcion, precio, id_categoria
      FROM Productos
      WHERE id_categoria = ?
        AND activo = 1
      ORDER BY nombre ASC
    `;

    connection.query(sql, [categoria], (err, results) => {
      if (err) {
        console.error('Error al obtener productos:', err);
        return res.status(500).json({ error: true });
      }

      res.json(results);
    });
  }
};

module.exports = mainController;
