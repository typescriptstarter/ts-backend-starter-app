'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GithubAuth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GithubAuth.init({
    code: DataTypes.STRING,
    installation_id: DataTypes.STRING,
    setup_action: DataTypes.STRING,
    query: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'GithubAuth',
  });
  return GithubAuth;
};