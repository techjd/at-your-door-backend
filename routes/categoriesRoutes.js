import express from 'express';
const router = express.Router();
import {
  getCategories,
  getCategoryById,
  getCategoriesOfShops,
} from '../controllers/categoriesControllers.js';

router.route('/').get(getCategories);
router.route('/:id').get(getCategoryById);
router.route('/getCategory/:shopId').get(getCategoriesOfShops);
export default router;
