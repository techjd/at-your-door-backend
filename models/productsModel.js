import mongoose from 'mongoose';

const productsSchema = mongoose.Schema({
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'shops',
  },
  mainCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Categories',
  },
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'SubCategories',
  },
  productImageURL: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: String,
    required: true,
  },
});

const Products = mongoose.model('Products', productsSchema);
export default Products;
