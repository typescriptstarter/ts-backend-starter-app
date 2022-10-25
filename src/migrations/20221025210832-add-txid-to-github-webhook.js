'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('GithubWebhooks', 'tx_id', { type: Sequelize.STRING });
    await queryInterface.addColumn('GithubWebhooks', 'tx_output_index', { type: Sequelize.INTEGER });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('GithubWebhooks', 'tx_id');
    await queryInterface.removeColumn('GithubWebhooks', 'tx_output_index');
  }
};
