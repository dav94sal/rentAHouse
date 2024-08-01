const express = require('express');
const { Review, Spot, User, Image } = require('../../db/models');
const { requireAuth, decodeJWT } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { unauthorized } = require('../../utils/errors');

const validateReview = [
  check('review')
    .exists({checkFalsy: true})
    .withMessage("Review text is required"),
  check('stars')
    .exists({checkFalsy: true})
    .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
]

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
    const images = await rev.Spot.getImages({
      where: { preview: true },
      attributes: ['url']
    })

    const imagePreview = images[0]
    // get review images
    const reviewImages = await rev.getImages({ attributes: ['id', 'url']});
    rev = rev.toJSON();

    if (imagePreview && rev.Spot) rev.Spot.previewImage = imagePreview.url
    else rev.Spot.previewImage = null;

    rev.ReviewImages = reviewImages;
    response.push(rev)
  }


  res.json(response);
})

// add image to review
router.post('/:reviewId/images', requireAuth, async (req,res,next) => {
  // decode JWT and find review
  const JWT = decodeJWT(req);
  const userId = JWT.data.id;
  const review = await Review.findByPk(req.params.reviewId);

  // match id to review's userId
  if (review) {
    if (review.userId === userId) return unauthorized(next);

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

      res.status(201)
      res.json(response)
    } else {
      const err = new Error(`Cannot add any more images because there is a maximum of 10 images per resource`);
      err.title = 'Cannot add image';
      err.errors = {message: `Maximum number of images for this resource was reached`};
      err.status = 403;
      next(err);
    }
  } else { // send error if id's don't match
    const err = new Error(`Review couldn't be found`);
    err.title = 'Review not found';
    err.status = 404;
    next(err);
  }
})

// edit review by id
router.put('/:reviewId', requireAuth, validateReview, async (req,res,next) => {
  const JWT = decodeJWT(req);
  const userId = JWT.data.id;
  const { review, stars } = req.body;
  const userReview = await Review.findByPk(req.params.reviewId);

  if (userReview) {
    if (userReview.userId !== userId) return unauthorized(next);
    await Review.update(
      { review, stars },
      {where: { id: req.params.reviewId }}
    )
    res.json(userReview)
  } else {
    const err = new Error(`Could not find review ${req.params.reviewId}`);
    err.title = 'Review not found';
    err.errors = {message: `Review couldn't be found`};
    err.status = 404;
    next(err);
  }
})

// delete review
router.delete('/:reviewId', requireAuth, async (req,res,next) => {
  const JWT = decodeJWT(req);
  const userId = JWT.data.id;
  const review = await Review.findByPk(req.params.reviewId);

  if (review) {
    if ( review.userId !== userId ) return unauthorized(next);
    
    await Review.destroy({ where: { id: req.params.reviewId }});
    res.json({ message: "Successfully deleted" })
  } else {
    const err = new Error(`Review couldn't be found`);
    err.title = 'Review not found';
    err.status = 404;
    next(err);
  }
})

module.exports = router;
