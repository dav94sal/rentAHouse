'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");
const { Op } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};
options.tableName = 'Users';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Users'
    await User.bulkCreate([
      {
        username: 'demo-user',
        firstName: 'demo',
        lastName: 'user',
        email: 'demo@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        username: 'FakeUser1',
        firstName: 'fake1',
        lastName: 'user1',
        email: 'user1@user.io',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        username: 'FakeUser2',
        firstName: 'fake2',
        lastName: 'user2',
        email: 'user2@user.io',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        username: 'bonJovifan1',
        firstName: 'Dean',
        lastName: 'Winchester',
        email: 'dWinchester@supernatural.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        username: 'bSinger',
        firstName: 'Bobby',
        lastName: 'Singer',
        email: 'bSinger@supernatural.io',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        username: 'sasquatch',
        firstName: 'Sam',
        lastName: 'Winchester',
        email: 'sammy@supernatural.io',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {validate: true});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete(options, {
      username: {[Op.in]: ['demo-user', 'FakeUser1', 'FakeUser2']}
    }, {});
  }
};
