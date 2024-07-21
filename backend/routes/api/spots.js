const express = require('express');
const { Spot } = require('../../db/models');
const { Review } = require('../../db/models');

const router = express.Router();

router.get('/', async (req,res,next) => {
  const spots = await Spot.findAll({
    include: {
      model: Review,
      attributes: ['stars']
    }
  });

  res.json(spots)
})

module.exports = router;
