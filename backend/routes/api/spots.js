const express = require('express');
const { Spot, User } = require('../../db/models');
const { requireAuth, restoreUser, decodeJWT } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSpot = [
  check('address')
    .exists({checkFalsy: true})
    .withMessage("Street address is required"),
  check('city')
    .exists({checkFalsy: true})
    .withMessage("City is required"),
  check('state')
    .exists({checkFalsy: true})
    .withMessage("State is required"),
  check('country')
    .exists({checkFalsy: true})
    .withMessage("Country is required"),
  check('lat')
    .exists({checkFalsy: true})
    .withMessage("Latitude must be within -90 and 90"),
  check('lng')
    .exists({checkFalsy: true})
    .withMessage("Longitude must be within -180 and 180"),
  check('name')
    .exists({checkFalsy: true})
    .withMessage("Name must be less than 50 characters"),
  check('description')
    .exists({checkFalsy: true})
    .withMessage("Description is required"),
  check('price')
    .exists({checkFalsy: true})
    .withMessage("Price per day must be a positive number"),
  handleValidationErrors
]

// get all spots owned by current user
router.get('/current', requireAuth, restoreUser, async (req,res,next) => {
  const JWT = decodeJWT(req)

  const user = await User.findByPk(JWT.data.id);

  let spots = await user.getSpots();
  const response = {};
  response.spot = [];

  for (let spot of spots) {
    const images = await spot.getImages({attributes: ['url']});
    const previewImage = images[0];
    const reviews = await spot.getReviews({attributes: ['stars']});
    const avgRating = reviews.reduce((acc, rev) => acc + rev.stars, 0) / reviews.length

    spot = spot.toJSON()
    spot.avgRating = avgRating;
    spot.previewImage = previewImage.url;
    response.spot.push(spot);
  };

  res.json(response)
})

router.get('/:id', async (req,res,next) => {
  let spot = await Spot.findByPk(req.params.id);

  if (spot) {
    const owner = await spot.getUser();
    const images = await spot.getImages({attributes: ['id', 'url']});
    const reviews = await spot.getReviews({attributes: ['stars']});
    const avgStarRating = reviews.reduce((acc, rev) => acc + rev.stars, 0) / reviews.length;

    spot = spot.toJSON();
    spot.numReviews = reviews.length;
    spot.avgStarRating = avgStarRating;
    spot.SpotImages = images;
    spot.Owner = owner;

    res.json(spot)
  } else {
    const err = new Error(`Could not find spot ${req.params.id}`);
    err.title = 'Spot not found';
    err.errors = {message: `Spot couldn't be found`};
    err.status = 404;
    next(err);
  }
})

router.get('/', async (req,res,next) => {
  const response = [];
  const spots = await Spot.findAll();

  for (let spot of spots) {
    const images = await spot.getImages({attributes: ['url']});
    let image = images[0];

    const reviews = await spot.getReviews({attributes: ['stars']});
    const avgRating = reviews.reduce(
      (acc, review) => acc + review.stars, 0
    ) / reviews.length;

    spot = spot.toJSON();
    spot.avgRating = avgRating;

    if (image) {
      image = image.toJSON();
      spot.previewImage = image.url;
    }
    response.push(spot)
  }

  res.json(response)
})

router.post('/', requireAuth, restoreUser, validateSpot, async (req,res,next) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const JWT = decodeJWT(req);
  const ownerId = JWT.data.id;

  const newSpot = await Spot.create({
    ownerId, address, city, state, country, lat, lng, name, description, price
  })

  res.json(newSpot);
})

module.exports = router;
