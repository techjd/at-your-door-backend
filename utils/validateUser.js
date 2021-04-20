import { check, validationResult } from 'express-validator';

const validateUser = [
  check('name', 'Name is required').not().isEmpty(),
  check('number', 'Number is required').isNumeric(),
  check('email', 'Please Enter a Email address').isEmail(),

  check(
    'password',
    'Please enter a password with 6 OR more characters'
  ).isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
      next();
    }
  },
];

export default validateUser;
