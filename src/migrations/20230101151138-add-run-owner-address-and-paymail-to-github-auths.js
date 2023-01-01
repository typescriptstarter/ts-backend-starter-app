'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn('GithubAuths', 'run_owner_address', { type: Sequelize.STRING });
    await queryInterface.addColumn('GithubAuths', 'run_paymail', { type: Sequelize.STRING });
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeColumn('GithubAuths', 'run_owner_address');
    await queryInterface.removeColumn('GithubAuths', 'run_paymail');
  }
};
