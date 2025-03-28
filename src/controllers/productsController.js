import ProductRepository from '../dao/repositories/productRepository.js';

class ProductsController {
  static async createProduct(req, res) {
    try {
      const product = await ProductRepository.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getProducts(req, res) {
    try {
      const products = await ProductRepository.getAll({ query: req.query });

      res.status(200).json(products);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async getProduct(req, res) {
    try {
      const product = await ProductRepository.getById(req.params.id);
      if (!product) {
        throw new Error('No se encontró el producto');
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateProduct(req, res) {
    try {
      const product = await ProductRepository.update({
        ...req.body,
        id: req.params.id,
      });
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteProduct(req, res) {
    try {
      await ProductRepository.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async restockAll(req, res) {
    try {
      await ProductRepository.restockAll();
      res.redirect('/realtimeproducts');
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  }
}

export default ProductsController;
