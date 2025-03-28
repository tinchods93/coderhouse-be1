import { Router } from 'express';
import ProductsController from '../controllers/productsController.js';

const productsRouter = Router();

productsRouter.post('/', ProductsController.createProduct);
productsRouter.get('/', ProductsController.getProducts);
productsRouter.get('/:id', ProductsController.getProduct);
productsRouter.put('/:id', ProductsController.updateProduct);
productsRouter.delete('/:id', ProductsController.deleteProduct);

productsRouter.post('/restock', async (req, res) => {
  await ProductsController.restockAll(req, res);
});

export default productsRouter;
