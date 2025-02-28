const { Router } = require('express');
const ProductsController = require('../controllers/productsController.js');
const Product = require('../entities/Product.js');

const productsRouter = Router();

productsRouter.post('/', ProductsController.createProduct);
productsRouter.get('/', ProductsController.getProducts);
productsRouter.get('/:id', ProductsController.getProduct);
productsRouter.put('/:id', ProductsController.updateProduct);
productsRouter.delete('/:id', ProductsController.deleteProduct);

productsRouter.post('/restock', async (req, res) => {
  await Product.restockAll();
  res.redirect('/realtimeproducts');
});

module.exports = productsRouter;
