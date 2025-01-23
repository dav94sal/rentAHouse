'use strict';

const { User } = require('../models');
const { Op } = require('sequelize');

const demoUsers = require('./data/demoUsers')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};
options.tableName = 'Users';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Users'
    await User.bulkCreate(demoUsers, {validate: true});
  },

  async down (queryInterface, Sequelize) {
    return demoUsers.map(user => {
      return queryInterface.bulkDelete(
        options, { username: user.username }, {});
    })
  }
};
