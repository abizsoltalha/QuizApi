'use strict';
const {
  Model
} = require('sequelize');
const Question = require('./questions')
module.exports = (sequelize, DataTypes) => {
  class quizzes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      quizzes.hasMany(models.questions);
    }
  }
  quizzes.init({
    quizType: DataTypes.STRING,
    groupAssignment: DataTypes.BOOLEAN,
    quizPermission: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'quizzes',
  });
  return quizzes;
};