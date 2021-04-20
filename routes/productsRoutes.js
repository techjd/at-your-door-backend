import express from 'express';
const router = express.Router();
import {
  getAllProducts,
  getProductsBySubCategories,
  getOnlyShopSubCategoryProducts,
  getAllProductsBySearch,
  getASingleProduct,
  getAllProductsOfDB,
} from '../controllers/productsControllers.js';

router.route('/:id').get(getAllProducts);
router.route('/subCategory/:subCategoryId').get(getProductsBySubCategories);
router.route('/:shopId/:subCategoryId').get(getOnlyShopSubCategoryProducts);
//Dont Use the below Route
router.route('/search/:shopId/:query').get(getAllProductsBySearch);
router.route('/get/a/single/product/:productId').get(getASingleProduct);
router.route('/get/all/products/of/db').get(getAllProductsOfDB);
export default router;
