"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "search_results",
      [
        {
          result_id: 1,
          keyword: "book",
          adwords_number: 5,
          links_number: 6,
          search_results_number: 7,
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          result_id: 2,
          keyword: "laptop",
          adwords_number: 5,
          links_number: 6,
          search_results_number: 7,
          user_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  //Revert seeding
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("search_results", null, {});
  },
};
