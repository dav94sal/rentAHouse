const express = require('express');
const bcrypt = require('bcryptjs')

const { setTokenCookie, requireAuth, restoreUser, decodeJWT } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Username is required'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .exists({checkFalsy: true})
    .withMessage('First Name is required'),
  check('lastName')
    .exists({checkFalsy: true})
    .withMessage('Last Name is required'),
  handleValidationErrors
];

const userExists = async function(username, email) {
  const usernameExists = await User.findAll({ where: { username } });
  const emailExists = await User.findAll({ where: { email } });

  if (usernameExists.length > 0) {
    return {"username": "User with that username already exists"}
  }
  else if (emailExists.length > 0) {
    return {"email": "User with that email already exists"}
  } else return false;
}

// sign up
router.post('/', validateSignup, async (req,res,next) => {
  const { username, email, password, firstName, lastName } = req.body;
  const existingUser = await userExists(username, email);
  if (existingUser){
    const err = new Error(`User already exists`);
    err.title = 'User already exists';
    err.errors = existingUser;
    err.status = 500;
    next(err);
  }

  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({
    username,
    firstName,
    lastName,
    email,
    hashedPassword
  });

  const safeUser = {
    id: user.id,
    firstName,
    lastName,
    email,
    username
  };

  res.status(201);
  await setTokenCookie(res, safeUser);
  return res.json({user: safeUser})
})

module.exports = router;
