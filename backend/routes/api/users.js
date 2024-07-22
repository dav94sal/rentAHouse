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
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
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
    .withMessage('Please provide a first name'),
  check('lastName')
    .exists({checkFalsy: true})
    .withMessage('Please provide a last name'),
  handleValidationErrors
];

// get all spots owned by current user
router.get('/spots', requireAuth, restoreUser, async (req,res,next) => {
  const JWT = decodeJWT(req)

  const user = await User.findByPk(JWT.data.id);

  let spots = await user.getSpots();
  const response = user.toJSON();
  response.spot = [];

  for (let spot of spots) {
    const previewImage = await spot.getImages({attributes: ['url']});
    const reviews = await spot.getReviews({attributes: ['stars']});
    const avgRating = reviews.reduce((acc, rev) => acc + rev.stars, 0) / reviews.length

    spot = spot.toJSON()
    spot.previewImage = previewImage[0];
    spot.avgRating = avgRating;
    response.spot.push(spot);
  };

  res.json(response)
})

// sign up
router.post('/', validateSignup, async (req,res,next) => {
  const { username, email, password, firstName, lastName } = req.body;
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

  await setTokenCookie(res, safeUser);

  return res.json({user: safeUser})
})

module.exports = router;
