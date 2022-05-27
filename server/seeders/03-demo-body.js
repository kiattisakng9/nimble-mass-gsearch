"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Bulk insert body
    await queryInterface.bulkInsert(
      "result_body",
      [
        {
          result_id: 1,
          body_html: "&lt;div&gt;This is the body of result 1&lt;div&gt;",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          result_id: 2,
          body_html: "&lt;div&gt;This is the body of result 2&lt;div&gt;",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  //Revert seeding
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("result_body", null, {});
  },
};
