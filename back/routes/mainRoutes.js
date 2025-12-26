const express = require('express');
const mainController = require('../controllers/mainController');
const path = require('path');
const router = express.Router();

// router.get('/', mainController.getFirstPage);
router.get('/menu', mainController.getMenuPage);
router.get('/', mainController.getMenuPage);
router.get('/pedido', mainController.getPagePedido);
router.get('/checkout', mainController.getPageCheckout);
router.get('/post-pedido', mainController.getPagePostPedido);
router.get('/finalizar-pedido', mainController.getPageFinalizarPedido);
router.get('/api/categorias', mainController.obtenerCategorias);
router.get('/api/productos',mainController.obtenerProductosPorCategoria);
module.exports = router;
