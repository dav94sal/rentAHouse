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
    url: 'https://i.ibb.co/jhtYvy2/cabin-1406376.jpg',
    preview: true
  },
  {
    imageableId: 2,
    imageableType: 'Spot',
    url: 'https://i.ibb.co/w6rnbWC/prison-walls-1460144.jpg',
    preview: true
  },
  {
    imageableId: 3,
    imageableType: 'Spot',
    url: 'https://i.ibb.co/QKQFdRW/chairs-2-1489343.jpg',
    preview: true
  },
  {
    imageableId: 4,
    imageableType: 'Spot',
    url: 'https://i.ibb.co/mBdvGHp/cemetary-1-1442451.jpg',
    preview: true
  },
  {
    imageableId: 1,
    imageableType: 'Review',
    url: 'https://i.ibb.co/NxgL179/childhood-1241405.jpg',
    preview: false
  },
  {
    imageableId: 2,
    imageableType: 'Review',
    url: 'https://i.ibb.co/SnQzr1h/old-vacant-room-1539752.jpg',
    preview: false
  },
  {
    imageableId: 3,
    imageableType: 'Review',
    url: 'https://i.ibb.co/ZTp0pYJ/father-and-children-on-a-walk-1429203.jpg',
    preview: false
  },
  {
    imageableId: 4,
    imageableType: 'Review',
    url: 'https://i.ibb.co/th5SZRP/lonely-bouquet-1385870.jpg',
    preview: false
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
