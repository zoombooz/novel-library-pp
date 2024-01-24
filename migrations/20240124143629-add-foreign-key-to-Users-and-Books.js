'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn('Users', 'ProfileId', {
      type: Sequelize.DataTypes.INTEGER,
        references : {
          model : 'Profiles',
          key : 'id'
        }
    })

    await queryInterface.addColumn('Books', 'AuthorId', {
      type: Sequelize.DataTypes.INTEGER,
        references : {
          model : 'Authors',
          key : 'id'
        }
    })

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeColumn('Users', 'ProfileId')
    await queryInterface.removeColumn('Books', 'AuthorId')
  }
};
