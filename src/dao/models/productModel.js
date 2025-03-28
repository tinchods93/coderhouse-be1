import mongoose from 'mongoose';
import paginatePlugin from 'mongoose-paginate-v2';

const productCollection = 'products';
const thumbnailsPlaceholder =
  'https://cardamomocatering.es/wp-content/uploads/woocommerce-placeholder.png';

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  code: {
    type: String,
    required: false,
  },
  status: {
    type: Boolean,
    default: true,
    required: false,
  },
  category: {
    type: String,
    default: 'sin_categoria',
    required: false,
  },
  thumbnails: {
    type: Array,
    default: [thumbnailsPlaceholder, thumbnailsPlaceholder],
    required: false,
  },
  stock: {
    type: Number,
    default: 0,
    required: false,
  },
});

productSchema.plugin(paginatePlugin);

const ProductModel = mongoose.model(productCollection, productSchema);

export default ProductModel;
