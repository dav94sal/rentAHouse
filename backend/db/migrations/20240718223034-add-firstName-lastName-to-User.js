'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'firstName', {
      type: Sequelize.STRING,
    })
    await queryInterface.addColumn('Users', 'lastName', {
      type: Sequelize.STRING,
    }, options)
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Users"
    await queryInterface.removeColumn('Users', 'firstName');
    await queryInterface.removeColumn('Users', 'lastName');
  }
};
