'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Comments',
      [
        {
          trackId: 1,
          userId: 2,
          body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ae',
          timePosted: 0,
        },
        {
          trackId: 1,
          userId: 3,
          body: 'Lorem ipsum dolor sit amet, co',
          timePosted: 60,
        },
        {
          trackId: 1,
          userId: 4,
          body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum soci',
          timePosted: 122,
        },
        {
          trackId: 2,
          userId: 4,
          body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat mas',
          timePosted: 40,
        },
        {
          trackId: 4,
          userId: 1,
          body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula.',
          timePosted: 42,
        },
        {
          trackId: 4,
          userId: 2,
          body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor..',
          timePosted: 90,
        },
        {
          trackId: 4,
          userId: 3,
          body: 'Lorem ipsum dolor sit amet, consectetuer adipisc',
          timePosted: 300,
        },
        {
          trackId: 4,
          userId: 4,
          body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis nat',
          timePosted: 12,
        },
        {
          trackId: 5,
          userId: 1,
          body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula.',
          timePosted: 200,
        },
        {
          trackId: 5,
          userId: 2,
          body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ae',
          timePosted: 112,
        },
        {
          trackId: 8,
          userId: 1,
          body: 'Lorem ipsum dolor sit amet',
          timePosted: 12,
        },
        {
          trackId: 8,
          userId: 2,
          body: 'Lorem ipsum dolor sit amet, co',
          timePosted: 130,
        },
        {
          trackId: 8,
          userId: 3,
          body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat mas',
          timePosted: 110,
        },
        {
          trackId: 9,
          userId: 2,
          body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum soci',
          timePosted: 42,
        },
        {
          trackId: 9,
          userId: 3,
          body: 'Lorem ipsum dolor sit amet',
          timePosted: 260,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});
  },
};
