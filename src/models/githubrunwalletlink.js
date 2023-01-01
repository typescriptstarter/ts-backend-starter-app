'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GithubRunWalletLink extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GithubRunWalletLink.init({
    github_email: DataTypes.STRING,
    github_account_id: DataTypes.STRING,
    run_paymail: DataTypes.STRING,
    run_owner_address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'GithubRunWalletLink',
  });
  return GithubRunWalletLink;
};