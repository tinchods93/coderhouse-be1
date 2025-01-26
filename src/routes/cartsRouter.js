const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/cartsController');

// manejo de carritos
router.post('/', cartsController.createCart);
router.get('/:id', cartsController.getCart);
router.delete('/:id', cartsController.deleteCart);

// manejo de productos en el carrito
router.post('/:id/products', cartsController.addProductToCart);
router.post('/:id/products/:productId', cartsController.deleteProductFromCart);

module.exports = router;
