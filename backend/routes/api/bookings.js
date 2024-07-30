const express = require('express');
const { Booking, Review, Spot, User, Image } = require('../../db/models');
const { requireAuth, decodeJWT } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const getPreviewImage = async function (spot) {
  const images = await spot.getImages();
  return images[0]
}

router.get('/current', requireAuth, async (req,res,next) => {
  const JWT = decodeJWT(req);
  const userId = JWT.data.id;
  const response = [];

  const bookings = await Booking.findAll({ where: { userId } });

  for (let booking of bookings) {
    let spot = await booking.getSpot();
    const previewImage = await getPreviewImage(spot);
    console.log(previewImage)

    booking = booking.toJSON();
    spot = spot.toJSON();

    if (previewImage) spot.previewImage = previewImage.url;

    booking.spot = spot;
    response.push(booking);
  }

  res.json({bookings: response});
})

module.exports = router;
