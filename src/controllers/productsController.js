const Product = require('../entities/Product.js');

class ProductsController {
  static async createProduct(req, res) {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getProducts(req, res) {
    try {
      const products = await Product.getAll();
      if (!products?.length) {
        throw new Error('No hay productos cargados');
      }
      res.status(200).json(products);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async getProduct(req, res) {
    try {
      const product = await Product.getById(req.params.id);
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
      const product = await Product.update({
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
      await Product.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = ProductsController;
