import asyncHandler from '../middleware/async.js';
import Admin from '../models/adminModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// @desc Get Details of Current LoggedInAdmin
// @route GET /api/admin/me
// @access PRIVATE
const getCurrentLoggedInAdmin = asyncHandler(async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    console.log(admin.id);
    res.json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @desc Register A New User
// @route POST /api/admin/register
// @access Public
const registerAdmin = asyncHandler(async (req, res, next) => {
  const { ownerName, ownerNumber, ownerPassword } = req.body;

  try {
    let admin = await Admin.findOne({ ownerNumber });

    if (admin) {
      return res.status(400).json({ errors: 'Account Already Exists' });
    }

    admin = new Admin({
      ownerName,
      ownerNumber,
      ownerPassword,
    });

    const salt = await bcrypt.genSalt(10);

    admin.ownerPassword = await bcrypt.hash(ownerPassword, salt);

    await admin.save();

    const payload = {
      admin: {
        id: admin.id,
      },
    };

    console.log('Getting JWT');

    jwt.sign(
      payload,
      process.env.JWTSECRET,
      { expiresIn: 3600000 },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error.. Please Try Again Later' });
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { ownerNumber, ownerPassword } = req.body;

  try {
    let admin = await Admin.findOne({ ownerNumber });

    if (!admin) {
      return res.status(400).json({ errors: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(ownerPassword, admin.ownerPassword);

    if (!isMatch) {
      return res.status(400).json({ errors: 'Invalid Credentials' });
    }

    const payload = {
      admin: {
        id: admin.id,
      },
    };

    console.log('Getting JWT');

    jwt.sign(
      payload,
      process.env.JWTSECRET,
      { expiresIn: 3600000 },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error.. Please Try Again Later' });
  }
});

export { registerAdmin, loginAdmin, getCurrentLoggedInAdmin };
