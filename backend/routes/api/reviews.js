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

router.post('/:reviewId/images', requireAuth, async (req,res,next) => {
  // decode JWT and find review
  const JWT = decodeJWT(req);
  const userId = JWT.data.id;
  const review = await Review.findByPk(req.params.reviewId);

  // match id to review's userId
  if (review && review.userId === userId) {
    const imageCount = await review.countImages();

    if (imageCount < 10) {
      const { url } = req.body;
      const image = await Image.create({
        imageableId: req.params.reviewId,
        imageableType: 'Review',
        url,
        preview: false
      });

      const response = {
        id: image.id,
        url: image.url
      }

      review.addImage(image);

      res.json(response)
    } else {
      const err = new Error(`Cannot add any more images because there is a maximum of 10 images per resource`);
      err.title = 'Cannot add image';
      err.errors = {message: `Maximum number of images for this resource was reached`};
      err.status = 403;
      next(err);
    }
  } else { // send error if id's don't match
    const err = new Error(`Could not find review ${req.params.reviewId}`);
    err.title = 'Review not found';
    err.errors = {message: `Review couldn't be found`};
    err.status = 404;
    next(err);
  }
})

module.exports = router;
