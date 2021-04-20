import express from 'express';
const router = express.Router();
import {
  registerUser,
  loginUser,
  getCurrentLoggedIn,
  addPrimaryAddress,
  addSecondaryAddress,
} from '../controllers/userControllers.js';
import { protect } from '../middleware/auth.js';
router.route('/registerUser').post(registerUser);
router.route('/login').post(loginUser);
router.route('/me').get(protect, getCurrentLoggedIn);
router.route('/addPrimaryAddress').put(protect, addPrimaryAddress);
router.route('/addSecondaryAddress').put(protect, addSecondaryAddress);

export default router;
