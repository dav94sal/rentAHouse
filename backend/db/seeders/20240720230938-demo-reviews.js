'use strict';

const { Review } = require('../models');
const { Op } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Reviews';

const demoReviews = [
  {
    userId: 2,
    spotId: 1,
    review: 'Very cold, but beautiful. Please provide more heat!',
    stars: 4
  },
  {
    userId: 3,
    spotId: 2,
    review: 'Horrible! They made us drink the blood of their enemies!!!',
    stars: 1
  },
  {
    userId: 1,
    spotId: 3,
    review: "So peaceful. It's far from the city. Just how I like it.",
    stars: 5
  },
  {
    userId: 5,
    spotId: 1,
    review: "Ya idgits can't get a better heater?",
    stars: 3
  },
  {
    userId: 4,
    spotId: 7,
    review: "Bitch...",
    stars: 4
  },
  {
    userId: 6,
    spotId: 5,
    review: "Jerk..",
    stars: 3
  },
  {
    userId: 1,
    spotId: 7,
    review: "So amazing!",
    stars: 5
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate(demoReviews, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {
      stars: {[Op.in]: [1, 2, 3, 4, 5]}
    })
  }
};
