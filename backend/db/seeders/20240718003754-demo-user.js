'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        username: 'demo-user',
        email: 'demo@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        username: 'FakeUser1',
        email: 'user1@user.io',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        username: 'FakeUser2',
        email: 'user2@user.io',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {validate: true});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: {[Op.in]: ['demo-user', 'FakeUser1', 'FakeUser2']}
    }, {});
  }
};
