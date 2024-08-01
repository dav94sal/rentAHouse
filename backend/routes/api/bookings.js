const express = require('express');
const { Booking, Review, Spot, User, Image } = require('../../db/models');
const { requireAuth, decodeJWT } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { unauthorized } = require('../../utils/errors');

const router = express.Router();

const getPreviewImage = async function (spot) {
  const images = await spot.getImages();
  return images[0]
}

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
  const bookings = await spot.getBookings();

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

router.get('/current', requireAuth, async (req,res,next) => {
  const JWT = decodeJWT(req);
  const userId = JWT.data.id;
  const response = [];

  const bookings = await Booking.findAll({ where: { userId } });

  for (let booking of bookings) {
    let spot = await booking.getSpot({ attributes: { exclude: ['description'] }});
    const previewImage = await getPreviewImage(spot);
    console.log(previewImage)

    booking = booking.toJSON();
    spot = spot.toJSON();

    if (previewImage) spot.previewImage = previewImage.url;

    booking.spot = spot;
    response.push(booking);
  }

  res.status(200)
  res.json({bookings: response});
})

// edit booking
router.put('/:bookingId', requireAuth, validateBooking, async (req,res,next) => {
  const JWT = decodeJWT(req);
  const ownerId = JWT.data.id;
  let booking = await Booking.findByPk(req.params.bookingId);
  const today = Date.now();

  if (booking) {
    const { startDate, endDate } = req.body;
    const spot = await Spot.findByPk(booking.spotId)
    const bookingExists = await hasExistingBooking(spot, new Date(startDate), new Date(endDate))

    if (today > new Date(endDate).getTime()) {
      const err = new Error("Past bookings can't be modified");
      err.title = "Can't edit a booking that's past the end date";
      err.status = 403;
      next(err);
    }
    if (ownerId !== booking.userId) return unauthorized(next);
    else if (bookingExists) {
      const err = new Error(`Sorry, this spot is already booked for the specified dates`);
      err.title = "Booking conflict";
      err.errors = bookingExists;
      err.status = 403;
      next(err);
    } else {
      await Booking.update({
        spotId: spot.id,
        userId: ownerId,
        startDate,
        endDate
      },
      {where: { id: req.params.bookingId }}
    )

      res.json(booking)
    }

  } else {
    const err = new Error(`Booking couldn't be found`);
    err.title = "Couldn't find a Booking with the specified id";
    err.status = 404;
    next(err);
  }
})

router.delete('/:bookingId', requireAuth, async (req,res,next) => {
  const JWT = decodeJWT(req);
  const userId = JWT.data.id;
  const booking = await Booking.findByPk(req.params.bookingId);

  if (booking) {
    if ( booking.userId !== userId ) return unauthorized(next);
    if (new Date(booking.startDate).getTime() < Date.now()) {
      const err = new Error(`Bookings that have been started can't be deleted`);
      err.status = 400;
      next(err);
    }

    await Booking.destroy({ where: { id: req.params.bookingId }});
    res.json({ message: "Successfully deleted" })
  } else {
    const err = new Error(`Review couldn't be found`);
    err.title = 'Review not found';
    err.status = 404;
    next(err);
  }
})

module.exports = router;
