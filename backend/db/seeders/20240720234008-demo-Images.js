'use strict';

const { Image } = require('../models');
const { Op } = require('sequelize');
const ImageCreator = require('./data/imageSeeds')

const Img = new ImageCreator();
const images = Img.images

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Images';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Image.bulkCreate(images, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    return images.map(img => {
      return queryInterface.bulkDelete(
        options, { url: img.url }, {});
    })
  }
};
