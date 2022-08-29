'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ReviewImage.init({
    id: DataTypes.INTEGER,
    reviewId: DataTypes.INTEGER,
    url: DataTypes.STRING,
    createdAt: DataTypes.TIME,
    updatedAt: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'ReviewImage',
  });
  return ReviewImage;
};