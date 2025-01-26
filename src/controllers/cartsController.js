const Carts = require('../entities/Carts');

const createCart = async (req, res) => {
  try {
    const cart = await Carts.create(req.body);
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Carts.get(req.params);
    if (!cart) {
      throw new Error('No se encontró el carrito');
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const cart = await Carts.update(req.body);
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    await Carts.delete(req.params);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const cart = await Carts.addProduct({
      id: req.params.id,
      product: req.body,
    });
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProductFromCart = async (req, res) => {
  try {
    // obtener el id del producto desde un query param
    const cart = await Carts.removeProductFromCart({
      id: req.params.id,
      product: {
        id: req.params.productId,
        quantity: req.query.quantity,
      },
    });
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCart,
  getCart,
  updateCart,
  deleteCart,
  addProductToCart,
  deleteProductFromCart,
};
