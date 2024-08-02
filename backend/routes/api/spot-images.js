const express = require('express');
const { Spot, Image } = require('../../db/models');
const { requireAuth, decodeJWT } = require('../../utils/auth');
const { unauthorized } = require('../../utils/errors');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req,res,next) => {
  const JWT = decodeJWT(req);
  const ownerId = JWT.data.id;
  const image = await Image.findOne({
    where: { id: req.params.imageId },
    include: Spot
  })

  if (image) {
    const spot = image.Spot;
    if (spot.ownerId !== ownerId) return unauthorized(next)
    await Image.destroy({
      where: {
        id: req.params.imageId
      }
    });

    res.json({ message: "Successfully deleted" });

  } else {
    const err = new Error(`Spot Image couldn't be found`);
    err.title = 'Spot Image not found';
    err.errors = {message: `Spot Image couldn't be found`};
    err.status = 404;
    next(err);
  }
})


module.exports = router;
