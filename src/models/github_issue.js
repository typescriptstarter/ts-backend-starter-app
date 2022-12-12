'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GithubIssue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.BoostPowProof.hasOne(models.GithubIssue, {
        as: 'issue',
        foreignKey: 'txid',
        sourceKey: 'content'
      })

      models.GithubIssue.hasMany(models.BoostPowProof, {
        as: 'boostpow_proofs',
        foreignKey: 'content',
        sourceKey: 'txid'
      })
    }
  }
  GithubIssue.init({
    issue_id: DataTypes.NUMBER,
    data: DataTypes.JSON,
    repo: DataTypes.STRING,
    org: DataTypes.STRING,
    txid: DataTypes.STRING,
    state: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'GithubIssue',
  });
  return GithubIssue;
};