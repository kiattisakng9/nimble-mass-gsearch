"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    // Password for John: jdoe123
    const pw1 = await bcrypt
      .hash("jdoe123", 10)
      .then((hash) => {
        return hash;
      })
      .catch((err) => {
        console.log("Error bcrypt1", err);
      });

    // Password for Mona: mann456
    const pw2 = await bcrypt
      .hash("mann456", 10)
      .then((hash) => {
        return hash;
      })
      .catch((err) => {
        console.log("Error bcrypt1", err);
      });

    // Bulk insert users
    await queryInterface.bulkInsert(
      "users",
      [
        {
          first_name: "John",
          last_name: "Doe",
          email: "johndoe@test.com",
          password: pw1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          first_name: "Mona",
          last_name: "Ann",
          email: "monaann@test.com",
          password: pw2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },
  // Revert seeding
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
