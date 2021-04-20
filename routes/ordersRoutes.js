import express from 'express';
const router = express.Router();
import {
  createNewOrder,
  getOrdersOfUsers,
  orderByCod,
  orderByUdhaar,
  updateValue,
} from '../controllers/ordersControllers.js';
import { protect } from '../middleware/auth.js';

router.route('/createOrder').post(protect, createNewOrder);
router.route('/update/:orderid').put(protect, updateValue);
router.route('/createOrderByUdhaar').post(protect, orderByUdhaar);
router.route('/createOrderByCod').post(protect, orderByCod);
router.route('/getAllOrder').get(protect, getOrdersOfUsers);
export default router;
