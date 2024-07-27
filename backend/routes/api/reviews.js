const express = require('express');
const { Review, Spot, User, Image } = require('../../db/models');
const { requireAuth, restoreUser, decodeJWT } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// get current user reviews
router.get('/current', requireAuth, async (req,res,next) => {
  const JWT = decodeJWT(req);
  const userId = JWT.data.id;
  const response = [];

  let reviews = await Review.findAll({
    where: { userId },
    include:[
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
       },
      {
        model: Spot,
        attributes: { exclude: ['description', 'createdAt', 'updatedAt'] }
      },
    ]
  });

  for (let rev of reviews) {
    // get spot preview
    const imagePreview = await rev.Spot.getImages({
      where: { preview: true },
      attributes: ['url']
    })

    // get review images
    const reviewImages = await rev.getImages({ attributes: ['id', 'url']});
    rev = rev.toJSON();

    if (imagePreview && rev.Spot) rev.Spot.previewImage = imagePreview[0].url
    else rev.Spot.previewImage = null;

    rev.ReviewImages = reviewImages;
    response.push(rev)
  }


  res.json(response);
})


module.exports = router;
