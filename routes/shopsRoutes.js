import express from 'express';
import multer from 'multer';
const router = express.Router();
const upload = multer();
import {
  registerShop,
  getShops,
  getShopById,
  getShopAccordingToLocation,
} from '../controllers/shopsControllers.js';
import { protectAdmin } from '../middleware/admin.js';

router
  .route('/registerShop')
  .post(protectAdmin, upload.single('shopImage'), registerShop);
router.route('/getShops').get(getShops);
router.route('/getShops/:shopId').get(getShopById);
router.route('/getShops/:latitude/:longitude').get(getShopAccordingToLocation);
export default router;
