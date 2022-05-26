"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Passwords are encoded with SHA-256 algorithm
    // John: jdoe123
    // Mona: mann456
    await queryInterface.bulkInsert(
      "users",
      [
        {
          user_id: 1,
          first_name: "John",
          last_name: "Doe",
          email: "johndoe@test.com",
          password:
            "f70ac8759070f800b9d1ccf6f51417fb0690c60a2801b8a5ea08f2ecedab1723",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          first_name: "Mona",
          last_name: "Ann",
          email: "monaann@test.com",
          password:
            "996993526a032933baee8a0bf6421d0f3f849a47ad046bd1dfd121b9d0a2bcfc",
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
