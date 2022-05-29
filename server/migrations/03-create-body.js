"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("result_body", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      result_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "search_results",
          key: "id",
        },
      },
      body_html: {
        type: Sequelize.TEXT,
        allowNull: false,
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
    await queryInterface.dropTable("result_body");
  },
};
