import express from 'express';
const router = express.Router();
import {
  registerAdmin,
  loginAdmin,
  getCurrentLoggedInAdmin,
} from '../controllers/adminControllers.js';
import { protectAdmin } from '../middleware/admin.js';

router.route('/registerAdmin').post(registerAdmin);
router.route('/loginAdmin').post(loginAdmin);
router.route('/currentAdmin').get(protectAdmin, getCurrentLoggedInAdmin);
export default router;
