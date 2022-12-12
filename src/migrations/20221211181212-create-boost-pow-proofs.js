'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BoostPowProofs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      txid: {
        type: Sequelize.STRING
      },
      vin: {
        type: Sequelize.INTEGER
      },
      job_txid: {
        type: Sequelize.STRING
      },
      job_vout: {
        type: Sequelize.INTEGER
      },
      value: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      profitability: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      signature: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      timestamp: {
        type: Sequelize.DATE
      },
      difficulty: {
        type: Sequelize.DECIMAL
      },
      tag: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      tx_hex: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BoostPowProofs');
  }
};
