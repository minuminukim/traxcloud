'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Users' },
      },
      trackId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Comments' },
      },
      body: {
        type: DataTypes.STRING(280),
        allowNull: false,
        validate: { len: [1, 280] },
      },
      timePosted: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {}
  );
  Comment.associate = function (models) {
    Comment.belongsTo(models.User, { foreignKey: 'userId' });
    Comment.belongsTo(models.Track, { foreignKey: 'trackId' });
  };
  return Comment;
};
