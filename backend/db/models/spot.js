'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {foreignKey:'ownerId'})
      Spot.hasMany(models.Booking,{foreignKey:'spotId'})
      Spot.hasMany(models.Review, {foreignKey:'spotId'})
      Spot.hasMany(models.SpotImage, {foreignKey:'spotId'})
      Spot.hasMany(models.ReviewImage,{through:models.Review})
    }
  }
  Spot.init({
    id: DataTypes.INTEGER,
    ownerId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    county: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    createdAt: DataTypes.TIME,
    updatedAt: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
