const express = require('express');
const { Review, Image } = require('../../db/models');
const { requireAuth, decodeJWT } = require('../../utils/auth');
const { unauthorized, notFound } = require('../../utils/errors');

const router = express.Router();

// delete review image
router.delete('/:imageId', requireAuth, async (req,res,next) => {
  const userId = decodeJWT(req);
  const image = await Image.findOne({
    where: { id: req.params.imageId },
    include: Review
  })

  if (image) {
    const review = image.Review;
    if (review.userId !== userId) return unauthorized(next);

    await Image.destroy({ where: { id: req.params.imageId } });

    res.json({ message: "Successfully deleted" });

  } else {
    notFound("Review Image", next)
    // const err = new Error(`Review Image couldn't be found`);
    // err.title = 'Review Image not found';
    // err.errors = {message: `Review Image couldn't be found`};
    // err.status = 404;
    // next(err);
  }
})


module.exports = router;
