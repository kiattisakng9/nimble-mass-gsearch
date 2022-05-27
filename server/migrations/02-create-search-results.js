"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("search_results", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      keyword: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      adwords_number: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      links_number: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      search_results_number: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("search_results");
  },
};
