'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GithubWebhook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  GithubWebhook.init({
    payload: DataTypes.JSON,
    tx_id: DataTypes.STRING,
    tx_output_index: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GithubWebhook',
  });
  return GithubWebhook;
};
