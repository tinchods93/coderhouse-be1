const crypto = require('crypto');
const dbService = require('../services/dbService');

class Cart {
  constructor({ id, products }) {
    this.id = id ?? crypto.randomUUID();
    this.products =
      products?.map((p) => ({ id: p.id, quantity: p.quantity || 1 })) ?? [];
  }

  get() {
    return {
      id: this.id,
      products: this.products,
    };
  }

  // manejo de carritos
  static async create(itemParams) {
    const cart = new Cart(itemParams).get();

    await dbService.createItem({ item: cart, dbName: 'carts' });
    return cart;
  }

  static async get({ id }) {
    return dbService.getItem({ id, dbName: 'carts' });
  }

  static async update(cart) {
    await dbService.updateItem({ item: cart, dbName: 'carts' });
    return cart;
  }

  static async delete({ id }) {
    await dbService.deleteItem({ id, dbName: 'carts' });
  }

  // manejo de productos en el carrito
  static async addProduct({ id, product }) {
    const cart = await Cart.get({ id });

    // si el producto ya está en el carrito, aumentamos la cantidad
    const existingProduct = cart.products.find((p) => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += product.quantity || 1;
    } else {
      cart.products.push({
        id: product.id,
        quantity: product.quantity || 1,
      });
    }

    await Cart.update(cart);
    return cart;
  }

  static async removeProductFromCart({ id, product }) {
    const cart = await Cart.get({ id });
    const productIndex = cart.products.findIndex((p) => p.id === product.id);

    if (productIndex === -1) {
      return cart;
    }

    cart.products[productIndex].quantity -= product.quantity || 1;

    if (cart.products[productIndex].quantity < 1) {
      cart.products.splice(productIndex, 1);
    }

    await Cart.update(cart);
    return cart;
  }
}

module.exports = Cart;
