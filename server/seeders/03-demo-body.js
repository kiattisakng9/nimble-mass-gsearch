"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "result_body",
      [
        {
          body_id: 1,
          result_id: 1,
          body_html: "<h1>This is the body of result 1</h1>",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          body_id: 2,
          result_id: 2,
          body_html: "<h1>This is the body of result 2</h1>",
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
