'use strict';
const { Validator, Op } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error('Cannot be an email.');
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 255],
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
      profilePictureUrl: {
        type: DataTypes.STRING,
      },
      bio: {
        type: DataTypes.STRING,
      },
      displayName: {
        type: DataTypes.STRING,
        defaultValue: `${this.username}`,
        validate: {
          len: [4, 30],
        },
      },
      dataSpent: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          max: [52428800],
        },
      },
    },
    {
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ['hashedPassword'] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );

  User.associate = function (models) {
    User.hasMany(models.Track, { foreignKey: 'userId' });
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  User.getSingleUserById = async function (id) {
    return await User.scope('defaultScope').findByPk(id);
  };

  User.login = async function ({ credential, password }) {
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });

    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword,
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  User.isUnique = async function (credential) {
    const user = await User.findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    return user === null;
  };

  // Instance methods
  User.prototype.toSafeObject = function () {
    const { id, username, email, profilePictureUrl, displayName } = this;
    return { id, username, email, profilePictureUrl, displayName };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.prototype.setDataSpent = async function (data, action) {
    switch (action) {
      case 'post':
        this.set({ dataSpent: this.dataSpent + data });
        break;
      case 'delete':
        this.set({ dataSpent: this.dataSpent - data });
        break;
      default:
        return this.dataSpent;
    }

    await this.save();
    return this.dataSpent;
  };

  return User;
};
