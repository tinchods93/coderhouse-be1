const { Router } = require('express');
const CartsController = require('../controllers/cartsController.js');

const cartsRouter = Router();

// manejo de carritos
cartsRouter.post('/', CartsController.createCart);
cartsRouter.get('/:id', CartsController.getCart);
cartsRouter.delete('/:id', CartsController.deleteCart);

// manejo de productos en el carrito
cartsRouter.post('/:id/products', CartsController.addProductToCart);
cartsRouter.post(
  '/:id/products/:productId',
  CartsController.deleteProductFromCart
);

module.exports = cartsRouter;
