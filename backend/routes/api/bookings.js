const express = require('express');
const { Booking, Spot } = require('../../db/models');
const { requireAuth, decodeJWT } = require('../../utils/auth');

const { validateBooking, hasExistingBooking } = require('../../utils/validation');
const { unauthorized, notFound } = require('../../utils/errors');

const router = express.Router();

const getPreviewImage = async function (spot) {
  const images = await spot.getImages();
  return images[0]
}

// get current user bookings
router.get('/current', requireAuth, async (req,res,next) => {
  const userId = decodeJWT(req);
  const response = [];

  const bookings = await Booking.findAll({ where: { userId } });

  for (let booking of bookings) {
    let spot = await booking.getSpot({ attributes: { exclude: ['description', 'createdAt', 'updatedAt'] }});
    const previewImage = await getPreviewImage(spot);
    // console.log(previewImage)

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
  const ownerId = decodeJWT(req);
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
    notFound("Booking", next, title="Couldn't find a Booking with the specified id")
  }
})

// delete a booking
router.delete('/:bookingId', requireAuth, async (req,res,next) => {
  const userId = decodeJWT(req);
  const booking = await Booking.findByPk(req.params.bookingId);

  if (booking) {
    if ( booking.userId !== userId ) return unauthorized(next);
    if (new Date(booking.startDate).getTime() < Date.now()) {
      const err = new Error(`Bookings that have been started can't be deleted`);
      err.status = 403;
      next(err);
    }

    await Booking.destroy({ where: { id: req.params.bookingId }});
    res.json({ message: "Successfully deleted" })
  } else {
    notFound("Booking", next)
  }
})

module.exports = router;
