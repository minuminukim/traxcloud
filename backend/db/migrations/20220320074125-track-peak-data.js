'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Tracks', 'peakData', Sequelize.JSON);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Tracks', 'peakData', Sequelize.JSON);
  },
};
