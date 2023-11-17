'use strict';
const {
  Model
} = require('sequelize');
const Quizzes = require('./quizzes')
module.exports = (sequelize, DataTypes) => {
  class questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      questions.belongsTo(models.quizzes);
    }
  }
  questions.init({
    title: DataTypes.STRING,
    questionType: DataTypes.STRING,
    answer: DataTypes.STRING,
    optionType: DataTypes.STRING,
    options: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'questions',
  });
  return questions;
};