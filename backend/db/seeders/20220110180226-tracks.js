'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tracks', [
      {
        userId: 1,
        trackUrl: `https://drive.google.com/file/d/12JfXQRG1Ko-yBC7AQ-P9JSn0PwN-zzq2/view?usp=sharing`,
        artworkUrl: `https://i.ibb.co/yscxfqN/R-3281-1164111256-jpeg.jpg`,
        title: 'Amerika',
        duration: 349,
        fileSize: 13946060,
      },
      {
        userId: 1,
        trackUrl: `https://drive.google.com/file/d/1pIx52aqWt_k8Nl2t7PRu8kJ5o2Zz2Zpc/view?usp=sharing`,
        artworkUrl: `https://i.ibb.co/q7Pjdx3/R-4289-1228400355-jpeg.jpg`,
        title: 'January',
        duration: 359,
        fileSize: 14365491,
      },
      {
        userId: 1,
        trackUrl: `https://drive.google.com/file/d/11PL0HkiF2ILDshPR5ex87V7sN8cM9682/view?usp=sharing`,
        artworkUrl: `https://i.ibb.co/Gk4v2BJ/R-4295-1245700050-jpeg.jpg`,
        title: 'The Answering Machine',
        duration: 320,
        fileSize: 13526630,
      },
      {
        userId: 2,
        trackUrl: `https://drive.google.com/file/d/1bgk6hCVLXd2JHT-lamxHCukvo-qYvmRU/view?usp=sharing`,
        artworkUrl: `https://i.ibb.co/B4hH2tC/R-2417572-1513776972-2654-jpeg.jpg`,
        title: 'Angel',
        duration: 234,
        fileSize: 9646899,
      },
      {
        userId: 2,
        trackUrl: `https://drive.google.com/file/d/10qFLAEl5377JucLCFoNl4H6r2vOwDONT/view?usp=sharing`,
        artworkUrl: `https://i.ibb.co/B4hH2tC/R-2417572-1513776972-2654-jpeg.jpg`,
        title: 'Dreams',
        duration: 190,
        fileSize: 7864320,
      },
      {
        userId: 3,
        trackUrl: `https://drive.google.com/file/d/1fsL6turBFencyt7xG5tZOj5vijuD4xVq/view?usp=sharing`,
        artworkUrl: `https://i.ibb.co/vPPB67Z/R-6095276-1426278756-8877-jpeg.jpg`,
        title: 'That Dream We Call Reality',
        duration: 291,
        fileSize: 11639193,
      },
      {
        userId: 3,
        trackUrl: `https://drive.google.com/file/d/1pBV_X7IE1O6QYgBFZp8gByvtkFkxkUyr/view?usp=sharing`,
        artworkUrl: `https://i.ibb.co/HKHBxDw/R-9101554-1476726309-4636-jpeg.jpg`,
        title: 'City of Fear',
        duration: 392,
        fileSize: 15728640,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tracks', null, {});
  },
};
