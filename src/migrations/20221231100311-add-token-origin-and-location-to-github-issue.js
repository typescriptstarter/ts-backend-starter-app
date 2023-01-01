'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('GithubIssues', 'run_owner', { type: Sequelize.STRING });
    await queryInterface.addColumn('GithubIssues', 'run_origin', { type: Sequelize.STRING });
    await queryInterface.addColumn('GithubIssues', 'run_location', { type: Sequelize.STRING });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('GithubIssues', 'run_owner');
    await queryInterface.removeColumn('GithubIssues', 'run_origin');
    await queryInterface.removeColumn('GithubIssues', 'run_location');
  }
};
