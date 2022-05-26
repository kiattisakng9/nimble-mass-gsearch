"use strict";
const { Sequelize, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ SearchResults }) {
      // define association here
      this.hasMany(SearchResults, { foreignKey: "user_id", as: "results" });
    }

    // Return JSON as result
    toJSON() {
      return { ...this.get() };
    }
  }

  // Initialize model
  Users.init(
    {
      user_id: { type: DataTypes.INTEGER, primaryKey: true },
      first_name: {
        type: DataTypes.STRING,
        notNull: true,
        validate: { isAlpha: true },
      },
      last_name: {
        type: DataTypes.STRING,
        notNull: true,
        validate: { isAlpha: true },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        notNull: true,
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING,
        notNull: true,
      },
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      sequelize,
      modelName: "Users",
      tableName: "users",
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
      scopes: {
        withPassword: { attributes: { include: ["password"] } },
      },
    }
  );

  return Users;
};
