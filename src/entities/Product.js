// Con esta clase vamos a poder crear, leer, actualizar y eliminar productos
class Product {
  constructor({
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
    this.title = title; // string
    // Validamos que el precio sea un número y que no sea negativo
    if (price && isNaN(Number(price)))
      throw new Error('El precio debe ser un número');
    if (price < 0) throw new Error('El precio no puede ser negativo');
    this.price = Number(price); // number

    this.description = description; //opcional - string
    this.code = code; // opcional - string
    this.status = status;
    this.category = category?.toLowerCase() || 'sin_categoria'; // string

    if (thumbnails && !Array.isArray(thumbnails))
      throw new Error('Las thumbnails deben ser un array');

    this.thumbnails = thumbnails; // opcional - [string] - deberia ser una url

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
      ...this,
    };
  }
}

export default Product;
