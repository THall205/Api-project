'use strict';

const { Model, Validator } = require('sequelize');

const bcrypt = require('bcryptjs');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     toSafeObject() {
      const { id, firstName,lastName,username, email } = this; // context will be the User instance
      return { id,firstName,lastName,username, email };
    }

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }


    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    static async signup({ username, email,firstName,lastName, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword,
        firstName,
        lastName
      });
      return await User.scope('signup').findByPk(user.id);
    }
    static associate(models) {
      // define association here
      User.hasMany(models.Booking,{foreignKey:'userId'})
      User.hasMany(models.Spot,{foreignKey:'ownerId'})
      User.hasMany(models.Review,{foreignKey:'userId'})
      // User.hasMany(models.ReviewImage,{through:models.Review})

    }

  }
  User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }

      },
      firstName:{
        type: DataTypes.STRING,
        allowNull:false
      },
      lastName:{
        type: DataTypes.STRING,
        allowNull:false
      },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true
      }

    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [60, 60]
      }


    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ["hashedPassword"] }
      },
      loginUser: {
        attributes: {}
      },
      signup:{
        attributes:{exclude:["hashedPassword","createdAt", "updatedAt"]}
      }
    }

  });
  return User;
};
