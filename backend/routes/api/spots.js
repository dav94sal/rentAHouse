const express = require('express');
const { Spot } = require('../../db/models');

const router = express.Router();

router.get('/', async (req,res,next) => {
  const response = [];
  const spots = await Spot.findAll();

  for (let spot of spots) {
    const images = await spot.getImages();
    const reviews = await spot.getReviews({attributes: ['stars']});
    const avgRating = reviews.reduce(
      (acc, review) => acc + review.stars, 0
    ) / reviews.length;

    spot = spot.toJSON();
    spot.avgRating = avgRating;
    spot.previewImage = images;
    response.push(spot)
  }

  res.json(response)
})

module.exports = router;
