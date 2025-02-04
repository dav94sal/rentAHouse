const express = require('express');
const { Spot, Image } = require('../../db/models');
const { requireAuth, decodeJWT } = require('../../utils/auth');
const { unauthorized } = require('../../utils/errors');

const router = express.Router();

// delete review for a spot
router.delete('/:imageId', requireAuth, async (req,res,next) => {
  const ownerId = decodeJWT(req);
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
    notFound("Spot Image", next)
  }
})


module.exports = router;
