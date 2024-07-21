'use strict';

const { Spot } = require('../models');
const { Op } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};
options.tableName = 'Spots';

const demoSpots = [
  {
    ownerId: 1,
    address: '629307',
    city: 'Nostrovya',
    state: 'Okrug',
    country: 'Russia',
    lat: 66.11877,
    lng: 76.68264,
    name: 'demo-spot',
    description: 'This is a demo spot in Russia',
    price: 175
  },
  {
    ownerId: 1,
    address: '2QP5+3G5',
    city: 'Pyongyang',
    state: 'Pyongyang',
    country: 'North Korea',
    lat: 39.04164,
    lng: 125.76408,
    name: 'The Camp',
    description: 'This is another demo spot but in North Korea',
    price: 300
  },
  {
    ownerId: 2,
    address: '111 7th St',
    city: 'Knowhere',
    state: 'TX',
    country: 'USA',
    lat: 29.22664,
    lng: -96.74718,
    name: "Ya'lls place",
    description: 'This is a Texan demo spot',
    price: 115
  },
  {
    ownerId: 3,
    address: '234 5th St',
    city: 'Deadpan',
    state: 'Ohio',
    country: 'USA',
    lat: 40.84411,
    lng: -82.59188,
    name: "Cemetary Gates",
    description: 'This is a dead spot',
    price: 115
  },
  {
    ownerId: 4,
    address: '678 12th St',
    city: 'Lewisville',
    state: 'Texas',
    country: 'USA',
    lat: 30.33399,
    lng: -97.8765,
    name: "Dean Cave",
    description: 'Greatest burgers in the world for breakfast!',
    price: 115
  },
  {
    ownerId: 5,
    address: '234 5th St',
    city: 'Singer',
    state: 'Georgia',
    country: 'USA',
    lat: 49.84411,
    lng: -82.59068,
    name: "Idgit Inn",
    description: 'For all the idgits that plan ahead',
    price: 200
  },
  {
    ownerId: 6,
    address: '43219 Stairway Rd',
    city: 'Lawrence',
    state: 'Kansas',
    country: 'USA',
    lat: 46.85411,
    lng: -90.59188,
    name: "Mary's Bed and Breakfast",
    description: 'In honor of Mary Winchester',
    price: 100
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate(demoSpots, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete(options, {
      name: {[Op.in]: ['demo-spot', 'The Camp', "Ya'lls place", "Cemetary Gates"]}
    }, {});
  }
};
