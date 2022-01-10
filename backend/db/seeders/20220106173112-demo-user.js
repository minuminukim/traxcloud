'use strict';
const bcrypt = require('bcryptjs');
const { passwords } = require('../../config');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'moodymann@traxcloud.com',
          username: 'moodymann',
          displayName: 'Moodymann',
          hashedPassword: bcrypt.hashSync(passwords.demo),
          profilePictureUrl: `https://i.ibb.co/Q6BXsT1/moodymann.jpg`
        },
        {
          email: 'chuckperson@traxcloud.com',
          username: 'chuck-person',
          displayName: 'Chuck Person',
          hashedPassword: bcrypt.hashSync(passwords.seed),
          profilePictureUrl: `https://i.ibb.co/19WtL2h/chuckperson.jpg`
        },
        {
          email: 'sons@traxcloud.com',
          username: 'sons',
          displayName: 'S.O.N.S',
          hashedPassword: bcrypt.hashSync(passwords.seed),
          profilePictureUrl: `https://i.ibb.co/Wnc5SQf/SONS.jpg`
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      'Users',
      {
        username: { [Op.in]: ['howdy_world', 'FakeUser1', 'FakeUser2'] },
      },
      {}
    );
  },
};
