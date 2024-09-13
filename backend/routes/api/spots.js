const express = require('express');
const { Op } = require('sequelize')
const { Spot, User, Image, Review, Booking } = require('../../db/models');
const { requireAuth, restoreUser, decodeJWT } = require('../../utils/auth');
const { unauthorized } = require('../../utils/errors');
const {
  validateSpot,
  validateReview,
  validateBooking,
  validateQueryParams,
  hasExistingBooking
 } = require('../../utils/validation')

const router = express.Router();

// get all spots owned by current user
router.get('/current', requireAuth, async (req,res,next) => {
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
});

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
});

// Get reviews for spot id
router.get('/:spotId/reviews', async (req,res,next) => {
  const spot = await Spot.findByPk(req.params.spotId);
  let reviews;
  const response = [];

  if (spot) {
    reviews = await spot.getReviews({
      include: {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      }
    });
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
});

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
        include: {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        }
      })

    } else {
      bookings = await Booking.findAll({
        where: { spotId: req.params.spotId},
        attributes: ['spotId', 'startDate', 'endDate']
      })
    }
    res.status(200)
    res.json({ Bookings: bookings });
  } else {
    const err = new Error(`Spot couldn't be found`);
    err.title = 'Spot not found';
    err.status = 404;
    next(err);
  }
});

// get all spots
router.get('/', validateQueryParams, async (req,res,next) => {
  const response = [];

  // add query parameters
  let { page, size, maxLat, minLat, maxLng, minLng, minPrice, maxPrice } = req.query;
  const where = {};

  // set default page and size, else convert to number
  if (!page) page = 1
  else page = Number(page)
  if (!size) size = 20
  else size = Number(size)

  // calculate offset and limit
  let offset;
  if (page === 1) offset = null;
  else offset = size * page - size;
  const limit = size;

  // add optional query params
  if (maxLat & minLat) where.lat = { [Op.between]: [minLat, maxLat] }
  else {
    if (maxLat) where.lat = { [Op.lte]: maxLat }
    if (minLat) where.lat = { [Op.gte]: minLat }
  }
  if (maxLng & minLng) where.lng = { [Op.between]: [minLng, maxLng] }
  else {
    if (maxLng) where.lng = { [Op.lte]: maxLng }
    if (minLng) where.lng = { [Op.gte]: minLng }
  }
  if (maxPrice & minPrice) where.price = { [Op.between]: [minPrice, maxPrice] }
  else {
    if (maxPrice) where.price = { [Op.lte]: maxPrice }
    if (minPrice) where.price = { [Op.gte]: minPrice }
  }

  // get spots
  const spots = await Spot.findAll({
    where,
    offset,
    limit
  });

  for (let spot of spots) {
    const images = await spot.getImages({attributes: ['url']});
    let image = images[0];

    const reviews = await spot.getReviews({attributes: ['stars']});
    const avgRating = reviews.reduce(
      (acc, review) => acc + review.stars, 0
    ) / reviews.length;

    spot = spot.toJSON();
    spot.avgRating = Math.floor(avgRating);
    console.log(spot.avgRating)

    if (image) {
      image = image.toJSON();
      spot.previewImage = image.url;
    }
    response.push(spot)
  }

  res.status(200);
  res.json({
    Spots: response,
    page,
    size
  })
});

// add image to spot
router.post('/:spotId/images', requireAuth, async (req,res,next) => {
  const { url, preview } = req.body;
  const spot = await Spot.findByPk(req.params.spotId);
  const JWT = decodeJWT(req);
  const ownerId = JWT.data.id;

  if (spot) {
    if (spot.ownerId !== ownerId) return unauthorized(next);

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
});

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

      res.status(201)
      res.json(booking)
    }
  } else {
    const err = new Error(`Spot couldn't be found`);
    err.title = "Couldn't find a Spot with the specified id";
    err.status = 404;
    next(err);
  }
});

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
});

// create a spot
router.post('/', requireAuth, validateSpot, async (req,res,next) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const JWT = decodeJWT(req);
  const ownerId = JWT.data.id;

  const newSpot = await Spot.create({
    ownerId, address, city, state, country, lat, lng, name, description, price
  })

  res.status(201);
  res.json(newSpot);
});

// edit a spot
router.put('/:spotId', requireAuth, validateSpot, async (req,res,next) => {
  const JWT = decodeJWT(req);
  const ownerId = JWT.data.id;
  const verifySpot = await Spot.findOne({where:{id: req.params.spotId}});

  if (verifySpot) {
    if (verifySpot.ownerId !== ownerId) return unauthorized(next)
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spot = await Spot.update(
      { address, city, state, country, lat, lng, name, description, price },
      { where: { id: req.params.spotId } }
    );
    // this is sending the old info
    res.json(verifySpot);
  } else {
    const err = new Error(`Spot couldn't be found`);
    err.title = "Couldn't find a Spot with the specified id";
    err.status = 404;
    next(err);
  }
});

// delete a spot
router.delete('/:spotId', requireAuth, async (req,res,next) => {
  const JWT = decodeJWT(req);
  const ownerId = JWT.data.id;
  const spot = await Spot.findByPk(req.params.spotId)

  if (spot) {
    if (spot.ownerId !== ownerId) return unauthorized(next)
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
});

module.exports = router;
