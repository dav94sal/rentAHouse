'use strict';

const { Booking } = require('../models');
const { Op } = require('sequelize');
const demoBookings = require('./data/bookingSeeds')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.SCHEMA = process.env.SCHEMA;
};
options.tableName = 'Bookings';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate(demoBookings, {validate :true})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {
      userId: {[Op.in]: [1, 2, 3]}
    })
  }
};
