const crypto = require('crypto');
const dbService = require('../services/dbService');

const thumbnailsPlaceholder =
  'https://cardamomocatering.es/wp-content/uploads/woocommerce-placeholder.png';

// Con esta clase vamos a poder crear, leer, actualizar y eliminar productos
class Product {
  constructor({
    id,
    title,
    description,
    code,
    price,
    status,
    category,
    thumbnails,
    stock,
  }) {
    // Describimos y asignamos las propiedades de la clase
    this.id = id ?? crypto.randomUUID();
    this.title = title; // string

    // Validamos que el precio sea un número y que no sea negativo
    if (isNaN(price)) throw new Error('El precio debe ser un número');
    if (price < 0) throw new Error('El precio no puede ser negativo');
    this.price = price; // number

    this.description = description; //opcional - string
    this.code = code; // opcional - string
    this.status = status?.toLowerCase() || 'active'; // string
    this.category = category?.toLowerCase() || 'sin_categoria'; // string

    if (thumbnails && !Array.isArray(thumbnails))
      throw new Error('Las thumbnails deben ser un array');

    this.thumbnails = thumbnails || [
      thumbnailsPlaceholder,
      thumbnailsPlaceholder,
    ]; // opcional - [string] - deberia ser una url

    // Validamos que el stock sea un número y que no sea negativo
    if (isNaN(stock)) throw new Error('El stock debe ser un número');
    if (stock < 0) throw new Error('El stock no puede ser negativo');
    this.stock = Number(stock) || 0; // number

    const requiredFields = ['title', 'price'];
    requiredFields.forEach((field) => {
      if (!this[field]) {
        throw new Error(`El producto debe tener un ${field}`);
      }
    });
  }

  get() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      code: this.code,
      price: this.price,
      status: this.status,
      stock: this.stock,
      category: this.category,
      thumbnails: this.thumbnails,
    };
  }

  static async create(itemParams) {
    const product = new Product(itemParams).get();

    await dbService.createItem({ item: product, dbName: 'products' });
    return product;
  }

  static async getAll(query) {
    const products = await dbService.getItems('products');
    if (!products?.length) {
      throw new Error('No hay productos cargados');
    }

    // Si query tiene algo, filtramos los productos
    if (query && Object.keys(query).length) {
      return products.filter((product) => {
        return Object.keys(query).every((key) => {
          return product[key] === query[key];
        });
      });
    }

    return products;
  }

  static getById(id) {
    const product = dbService.getItem({ id, dbName: 'products' });

    if (!product) {
      throw new Error('No se encontró el producto');
    }

    return product;
  }

  static async update(product) {
    await dbService.updateItem({ item: product, dbName: 'products' });
    return product;
  }

  static delete(id) {
    return dbService.deleteItem({ id, dbName: 'products' });
  }
}

module.exports = Product;
