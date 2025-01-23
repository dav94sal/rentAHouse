'use strict';

const { Review } = require('../models');
const { Op } = require('sequelize');
const demoReviews = require('./data/reviewSeeds')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Reviews';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate(demoReviews, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    return demoReviews.map(review => {
      return queryInterface.bulkDelete(
        options, { review: review.review }, {})
    })
  }
};
