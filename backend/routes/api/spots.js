const express = require('express');
const { Spot, User, Image, Review, Booking } = require('../../db/models');
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

const validateReview = [
  check('review')
    .exists({checkFalsy: true})
    .withMessage("Review text is required"),
  check('stars')
    .exists({checkFalsy: true})
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors
]

const validateBooking = [
  check('startDate')
    .exists({checkFalsy: true})
    .withMessage("startDate cannot be in the past"),
  check('endDate')
    .exists({checkFalsy: true})
    .withMessage("endDate cannot be on or before startDate"),
    handleValidationErrors
]

const hasExistingBooking = async function (spot, startDate, endDate) {
  console.log(spot)
  const bookings = await spot.getBookings({});

  for (let booking of bookings) {
    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);


    if (startDate.getTime() >= start.getTime() && startDate.getTime() <= end.getTime()) {
      return {startDate: "Start date conflicts with an existing booking"}
    }
    if (endDate.getTime() >= start.getTime() && endDate.getTime() <= end.getTime()) {
      return {endDate: "End date conflicts with an existing booking"}
    }

    return false;
  }
}

// get all spots owned by current user
router.get('/current', requireAuth, restoreUser, async (req,res,next) => {
  const JWT = decodeJWT(req)

  const user = await User.findByPk(JWT.data.id);

  let spots = await user.getSpots();
  const response = {};
  response.Spots = [];

  for (let spot of spots) {
    const images = await spot.getImages({
      attributes: ['url'],
      where: {preview:true}
    });
    let previewImage
    if (images.length > 0) previewImage = images[0].url
    else previewImage = null
    const reviews = await spot.getReviews({attributes: ['stars']});
    const avgRating = reviews.reduce((acc, rev) => acc + rev.stars, 0) / reviews.length

    spot = spot.toJSON()
    spot.avgRating = avgRating;
    spot.previewImage = previewImage;
    response.Spots.push(spot);
  };

  res.json(response)
})

// get spot by id
router.get('/:spotId', async (req,res,next) => {
  let spot = await Spot.findByPk(req.params.spotId);

  if (spot) {
    const owner = await spot.getUser({attributes: ['id', 'firstName', 'lastName']});
    const images = await spot.getImages({attributes: ['id', 'url', 'preview']});
    const reviews = await spot.getReviews({attributes: ['stars']});
    const avgStarRating = reviews.reduce((acc, rev) => acc + rev.stars, 0) / reviews.length;

    spot = spot.toJSON();
    spot.numReviews = reviews.length;
    spot.avgStarRating = avgStarRating;
    spot.SpotImages = images;
    spot.Owner = owner;

    res.json(spot)
  } else {
    const err = new Error(`Spot couldn't be found`);
    err.title = `Could not find spot ${req.params.spotId}`;
    err.errors = {message: `Spot couldn't be found`};
    err.status = 404;
    next(err);
  }
})

// Get reviews for spot id
router.get('/:spotId/reviews', async (req,res,next) => {
  const spot = await Spot.findByPk(req.params.spotId);
  let reviews;
  const response = [];

  if (spot) {
    reviews = await spot.getReviews({ include: User });
    for (let rev of reviews) {
      const images = await rev.getImages({ attributes: ['id', 'url'] });
      rev = rev.toJSON();
      rev.ReviewImages = images;
      response.push(rev)
    };

    res.status(200)
    res.json({ Reviews: response });
  } else {
    const err = new Error(`Could not find spot ${req.params.spotId}`);
    err.title = 'Spot not found';
    err.errors = {message: `Spot couldn't be found`};
    err.status = 404;
    next(err);
  }
})

// get all bookings for a spot
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId)
  if (spot) {
    const JWT = decodeJWT(req);
    const ownerId = JWT.data.id;
    let bookings

    if (spot.ownerId === ownerId) {
      bookings = await Booking.findAll({
        where: { spotId: req.params.spotId},
        include: User
      })

    } else {
      bookings = await Booking.findAll({
        where: { spotId: req.params.spotId},
        attributes: ['spotId', 'startDate', 'endDate']
      })
    }
    res.json({ Bookings: bookings });
  } else {
    const err = new Error(`Spot couldn't be found`);
    err.title = 'Spot not found';
    err.status = 404;
    next(err);
  }
})

// get all spots
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

  res.json({ spot: response })
})

// create a spot
router.post('/', requireAuth, restoreUser, validateSpot, async (req,res,next) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const JWT = decodeJWT(req);
  const ownerId = JWT.data.id;

  const newSpot = await Spot.create({
    ownerId, address, city, state, country, lat, lng, name, description, price
  })

  res.status(201);
  res.json(newSpot);
})

// add image to spot
router.post('/:spotId/images', requireAuth, restoreUser, async (req,res,next) => {
  const { url, preview } = req.body;
  const spot = await Spot.findByPk(req.params.spotId);
  const JWT = decodeJWT(req);
  const ownerId = JWT.data.id;

  if (spot && spot.ownerId === ownerId) {
    const image = await Image.create({
      imageableId: req.params.spotId,
      imageableType: "Spot",
      url,
      preview
    });

    const response = {
      id: image.id,
      url: image.url,
      preview: image.preview
    }
    res.status(201)
    res.json(response);
  } else {
    const err = new Error(`Spot couldn't be found`);
    err.title = "Couldn't find a Spot with the specified id";
    err.status = 404;
    next(err);
  }
})

// create a booking
router.post('/:spotId/bookings', requireAuth, validateBooking, async (req,res,next) => {
  const JWT = decodeJWT(req);
  const ownerId = JWT.data.id;
  const spot = await Spot.findByPk(req.params.spotId);

  if (spot) {
    const { startDate, endDate } = req.body;
    const bookingExists = await hasExistingBooking(spot, new Date(startDate), new Date(endDate))

    if (ownerId === spot.ownerId) {
      const err = new Error(`Cannot book owned spot`);
      err.title = "Cannot book owned spot";
      err.status = 403;
      next(err);
    } else if (bookingExists) {
      const err = new Error(`Sorry, this spot is already booked for the specified dates`);
      err.title = "Booking conflict";
      err.errors = bookingExists;
      err.status = 403;
      next(err);
    } else {
      const booking = await Booking.create({
        spotId: req.params.spotId,
        userId: ownerId,
        startDate,
        endDate
      })

      res.json(booking)
    }

  } else {
    const err = new Error(`Spot couldn't be found`);
    err.title = "Couldn't find a Spot with the specified id";
    err.status = 404;
    next(err);
  }

})

// edit a spot
router.put('/:spotId', requireAuth, restoreUser, validateSpot, async (req,res,next) => {
  const JWT = decodeJWT(req);
  const ownerId = JWT.data.id;
  const verifySpot = await Spot.findOne({where:{id: req.params.spotId}});

  if (verifySpot && verifySpot.ownerId === ownerId) {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spot = await Spot.update(
      { address, city, state, country, lat, lng, name, description, price },
      { where: { id: req.params.spotId } }
    );
    res.json(verifySpot);
  } else {
    const err = new Error(`Spot couldn't be found`);
    err.title = "Couldn't find a Spot with the specified id";
    err.status = 404;
    next(err);
  }
})

// delete a spot
router.delete('/:spotId', requireAuth, restoreUser, async (req,res,next) => {
  const JWT = decodeJWT(req);
  const ownerId = JWT.data.id;
  const spot = await Spot.findByPk(req.params.spotId)

  if (spot && spot.ownerId === ownerId) {
    await Spot.destroy({
      where: {
        id: req.params.spotId,
        ownerId
      }
    });

    res.json({ message: "Successfully deleted" });

  } else {
    const err = new Error(`Spot ${req.params.spotId} couldn't be found`);
    err.title = 'Spot not found';
    err.errors = {message: `Spot couldn't be found`};
    err.status = 404;
    next(err);
  }
})

// create a review for a spot
router.post('/:spotId/reviews', requireAuth, validateReview, async (req,res,next) => {
  const { review, stars } = req.body;
  const JWT = decodeJWT(req);
  const userId = JWT.data.id;
  const spot = await Spot.findOne({
    where: {
      id: req.params.spotId
    },
    include: Review
  });

  if (spot) {
    for (let rev of spot.Reviews) {
      console.log(rev)
      if (rev.userId === userId) {
        const err = new Error("User already has a review for this spot");
        err.title = "User already has a review for this spot";
        err.errors = {message: "User already has a review for this spot"};
        err.status = 500;
        next(err);
      }
    }

    const newReview = await Review.create({
      userId,
      spotId: req.params.spotId,
      review,
      stars
    })

    res.status(201)
    res.json(newReview)

  } else {
    const err = new Error(`Spot couldn't be found`);
    err.title = 'Spot not found';
    err.status = 404;
    next(err);
  }
})


module.exports = router;
