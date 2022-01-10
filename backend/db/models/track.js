'use strict';

const { Sequelize } = require('.');

module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define(
    'Track',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Users' },
      },
      url: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          len: [1, 255],
          isUrl: true,
        },
      },
      artworkUrl: {
        type: DataTypes.STRING(255),
        validate: {
          len: [1, 255],
          isUrl: true,
        },
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          len: [1, 100],
        },
      },
      description: {
        type: DataTypes.STRING(4000),
        validate: {
          max: 4000,
        },
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      commentCount: {
        type: DataTypes.INTEGER,
      },
      playCount: {
        type: DataTypes.INTEGER,
      },
    },
    {}
  );
  Track.associate = function (models) {
    Track.belongsTo(models.User, { foreignKey: 'userId' });
  };

  Track.getTrackById = async function(id) {
    return await Track.findByPk(id);
  }

  return Track;
};
