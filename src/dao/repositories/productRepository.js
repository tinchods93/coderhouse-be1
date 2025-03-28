import Product from '../../entities/Product.js';
import DbService from '../../services/dbService.js';
import ProductModel from '../models/productModel.js';
import ProductDTO from '../../dto/productDto.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

class ProductRepository {
  static async create(itemParams) {
    const product = new Product(itemParams).get();

    console.log('MARTIN_LOG=> ProductRepository => create => product', product);

    await DbService.createItem(product, ProductModel);
    return product;
  }

  // el input deberia recibir query y una flag "raw", que por defecto sea false.
  // Si es false debe pasar el cada item devuelto por el DTO
  // Si es true, debe devolver los items sin pasar por el DTO
  /**
   *
   * @param {Object} input
   * @param {Object} input.query
   * @param {Boolean} input.raw
   * @returns
   */
  static async getAll(input = {}) {
    const { query, raw } = input;

    const items = await DbService.getItems(ProductModel, query);

    if (!raw) {
      items.payload =
        items.payload?.map((item) => new ProductDTO(item).get()) || [];
    }
    console.log(
      'MARTIN_LOG=> ProductRepository => getAll => items',
      JSON.stringify(items)
    );
    return items;
  }

  /**
   *
   * @param {Object} input
   * @param {String} input.id
   * @param {Boolean} input.raw
   * @returns
   */
  static async getById(input = {}) {
    const { id, raw } = input;
    const item = await DbService.getItem(id, ProductModel);
    return raw ? item : new ProductDTO(item).get();
  }

  static async update(id, updateData) {
    await DbService.updateItem(id, updateData, ProductModel);
    return updateData;
  }

  static async delete(id) {
    return DbService.deleteItem(id, ProductModel);
  }

  static async restockAll() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.resolve(
      __dirname,
      '../../../resources/db/products-back.json'
    );
    const data = await fs.readFile(filePath, 'utf-8');
    const productsJson = JSON.parse(data);

    const promises = productsJson.map((product) => {
      const productInstance = new Product(product).get();
      return DbService.createItem(productInstance, ProductModel);
    });
    await Promise.all(promises);
  }
}

export default ProductRepository;
