"use strict";
const { Sequelize, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SearchResults extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Users, ResultBody }) {
      // define association here
      this.belongsTo(Users, { foreignKey: "user_id" });
      this.hasOne(ResultBody, { foreignKey: "result_id", as: "body" });
    }

    // Return JSON as result
    toJSON() {
      return { ...this.get() };
    }
  }

  // Initialize model
  SearchResults.init(
    {
      result_id: { type: DataTypes.INTEGER, primaryKey: true },
      keyword: { type: DataTypes.STRING, notNull: true },
      adwords_number: { type: DataTypes.INTEGER, validate: { isInt: true } },
      links_number: { type: DataTypes.INTEGER, validate: { isInt: true } },
      search_results_number: {
        type: DataTypes.INTEGER,
        validate: { isInt: true },
      },
      user_id: { type: DataTypes.INTEGER, notNull: true },
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      sequelize,
      modelName: "SearchResults",
      tableName: "search_results",
      timestamps: false,
    }
  );

  return SearchResults;
};
