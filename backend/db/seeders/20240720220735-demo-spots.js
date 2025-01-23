'use strict';

const { Spot } = require('../models');
const { Op } = require('sequelize');
const demoSpots = require("./data/spotSeeds")

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};
options.tableName = 'Spots';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate(demoSpots, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    return demoSpots.map(spot => {
      return queryInterface.bulkDelete(
        options, { name: spot.name }, {});
    })
  }
};
