import express from 'express';
const router = express.Router();
import {
  getSubCategoriesById,
  getSubCategoriesOfShops,
  getSubCatgeoryfromCategoryId,
} from '../controllers/subCategoriesControllers.js';

router.route('/:categoryId').get(getSubCategoriesById);
router.route('/getSubCategories/:shopId').get(getSubCategoriesOfShops);
router
  .route('/getSubCategoryfromCategoryId/:categoryId/:shopId')
  .get(getSubCatgeoryfromCategoryId);
export default router;
