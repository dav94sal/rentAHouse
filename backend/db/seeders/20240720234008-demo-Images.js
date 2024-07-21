'use strict';

const { Image } = require('../models');
const { Op } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Images';

const demoImages = [
  {
    imageableId: 1,
    imageableType: 'Spot',
    url: 'file:///home/david/aa-projects/portfolio-projects/rentAHouse/images/cabin-1406376.jpg'
  },
  {
    imageableId: 2,
    imageableType: 'Spot',
    url: 'file:///home/david/aa-projects/portfolio-projects/rentAHouse/images/prison-walls-1460144.jpg'
  },
  {
    imageableId: 3,
    imageableType: 'Spot',
    url: 'file:///home/david/aa-projects/portfolio-projects/rentAHouse/images/chairs-2-1489343.jpg'
  },
  {
    imageableId: 4,
    imageableType: 'Spot',
    url: 'file:///home/david/aa-projects/portfolio-projects/rentAHouse/images/cemetary-1-1442451.jpg'
  },
  {
    imageableId: 1,
    imageableType: 'Review',
    url: 'file:///home/david/aa-projects/portfolio-projects/rentAHouse//home/david/aa-projects/portfolio-projects/rentAHouse/images/childhood-1241405.jpg'
  },
  {
    imageableId: 2,
    imageableType: 'Review',
    url: 'file:///home/david/aa-projects/portfolio-projects/rentAHouse/images/old-vacant-room-1539752.jpg'
  },
  {
    imageableId: 3,
    imageableType: 'Review',
    url: 'file:///home/david/aa-projects/portfolio-projects/rentAHouse/images/father-and-children-on-a-walk-1429203.jpg'
  },
  {
    imageableId: 4,
    imageableType: 'Review',
    url: 'file:///home/david/aa-projects/portfolio-projects/rentAHouse/images/lonely-bouquet-1385870.jpg'
  },
]

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
