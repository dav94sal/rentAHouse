'use strict';

const { Image } = require('../models');
const { Op } = require('sequelize');
const demoImages = require('./data/imageSeeds')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Images';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Image.bulkCreate(demoImages, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete(options, {
      imageableType: {[Op.in]: ['Review', 'Spot']}
    }, {});
  }
};
