'use strict';

const { Booking } = require('../models');
const { Op } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.SCHEMA = process.env.SCHEMA;
};
options.tableName = 'Bookings';

const demoBookings = [
  {
    spotId: 1,
    userId: 2,
    startDate: new Date('September 13, 2024 15:00:00'),
    endDate: new Date('September 16, 2024 11:00:00')
  },
  {
    spotId: 2,
    userId: 3,
    startDate: new Date('August 05, 2024 9:00:00'),
    endDate: new Date('August 16, 2024 12:00:00')
  },
  {
    spotId: 3,
    userId: 1,
    startDate: new Date('September 29, 2024 14:00:00'),
    endDate: new Date('October 07, 2024 12:00:00')
  },
  {
    spotId: 4,
    userId: 2,
    startDate: new Date('December 24, 2024 15:00:00'),
    endDate: new Date('January 02, 2025 13:00:00')
  },
]

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
