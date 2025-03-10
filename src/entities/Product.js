const { randomUUID } = require('crypto');
const {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
  readDb,
  writeDb,
} = require('../services/dbService.js');

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
    this.id = id ?? randomUUID();
    this.title = title; // string

    // Validamos que el precio sea un número y que no sea negativo
    if (price && isNaN(Number(price)))
      throw new Error('El precio debe ser un número');
    if (price < 0) throw new Error('El precio no puede ser negativo');
    this.price = Number(price); // number

    this.description = description; //opcional - string
    this.code = code; // opcional - string
    this.status = status || true;
    this.category = category?.toLowerCase() || 'sin_categoria'; // string

    if (thumbnails && !Array.isArray(thumbnails))
      throw new Error('Las thumbnails deben ser un array');

    this.thumbnails = thumbnails || [
      thumbnailsPlaceholder,
      thumbnailsPlaceholder,
    ]; // opcional - [string] - deberia ser una url

    // Validamos que el stock sea un número y que no sea negativo
    if (stock && isNaN(Number(stock)))
      throw new Error('El stock debe ser un número');
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

    await createItem({ item: product, dbName: 'products' });
    return product;
  }

  static getAll() {
    return getItems('products');
  }

  static getById(id) {
    return getItem({ id, dbName: 'products' });
  }

  static async update(product) {
    await updateItem({ item: product, dbName: 'products' });
    return product;
  }

  static delete(id) {
    return deleteItem({ id, dbName: 'products' });
  }

  static async restockAll() {
    const productsBackUp = readDb('products-back');
    writeDb('products', productsBackUp);
  }
}

module.exports = Product;
