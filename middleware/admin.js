import jwt from 'jsonwebtoken';
import asyncHandler from '../middleware/async.js';

const protectAdmin = asyncHandler(async (req, res, next) => {
  // Get Token from header
  const token = req.header('token');

  // Check if No Token

  if (!token) {
    return res.status(401).json({ msg: 'You are not authorized' });
  }

  // Verify Token

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);

    req.admin = decoded.admin;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
});

export { protectAdmin };
