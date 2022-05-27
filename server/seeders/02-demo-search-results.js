"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Bulk insert search results
    await queryInterface.bulkInsert(
      "search_results",
      [
        {
          keyword: "book",
          adwords_number: 5,
          links_number: 6,
          search_results_number: 7,
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
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
