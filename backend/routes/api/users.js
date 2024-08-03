const express = require('express');
const bcrypt = require('bcryptjs')

const { setTokenCookie, requireAuth, restoreUser, decodeJWT } = require('../../utils/auth');
const { User } = require('../../db/models');

const { validateSignup, userExists } = require('../../utils/validation')

const router = express.Router();

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
  return res.json({ user: safeUser })
})

module.exports = router;
