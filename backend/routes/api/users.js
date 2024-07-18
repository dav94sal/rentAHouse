const express = require('express');
const bcrypt = require('bcryptjs')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

router.post('/', async (req,res,next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({
    username,
    email,
    hashedPassword
  });

  const safeUser = {
    id: user.id,
    email,
    username
  };

  await setTokenCookie(res, safeUser);

  return res.json({user: safeUser})
})

module.exports = router;
