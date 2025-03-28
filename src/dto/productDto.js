class ProductDTO {
  constructor(product) {
    this.id = product._id;
    this.title = product.title;
    this.price = product.price;
    this.description = product.description;
    this.code = product.code;
    this.status = product.status;
    this.category = product.category;
    this.thumbnails = product.thumbnails;
    this.stock = product.stock;
  }

  get() {
    return { ...this };
  }
}

export default ProductDTO;
