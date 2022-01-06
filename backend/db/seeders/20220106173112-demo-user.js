'use strict';
const bcrypt = require('bcryptjs');
const { passwords } = require('../../config');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'demo@user.io',
          username: 'howdy_world',
          hashedPassword: bcrypt.hashSync(passwords.demo),
        },
        {
          email: 'plankton@user.io',
          username: 'sheldon_plankton',
          hashedPassword: bcrypt.hashSync(passwords.seed),
        },
        {
          email: 'squidward@user.io',
          username: 'squidward_tentacles',
          hashedPassword: bcrypt.hashSync(passwords.seed),
        },
        {
          email: 'bubblebass@user.io',
          username: 'bubblebass',
          hashedPassword: bcrypt.hashSync(passwords.seed),
        },
        {
          email: 'patrick@user.io',
          username: 'patrick_star',
          hashedPassword: bcrypt.hashSync(passwords.seed),
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
