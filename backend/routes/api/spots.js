const express = require('express');
const { Spot } = require('../../db/models');

const router = express.Router();

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
    err.errors = {message: `Could not find spot ${req.params.id}`};
    err.status = 404;
    next(err);
  }
})

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
