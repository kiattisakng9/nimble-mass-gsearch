"use strict";
const { Sequelize, Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ResultBody extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ SearchResults }) {
      // define association here
      this.belongsTo(SearchResults, { foreignKey: "result_id", as: "body" });
    }

    // Return JSON as result
    toJSON() {
      return { ...this.get() };
    }
  }

  // Initialize model
  ResultBody.init(
    {
      body_id: { type: DataTypes.INTEGER, primaryKey: true },
      result_id: { type: DataTypes.INTEGER, notNull: true },
      body_html: { type: DataTypes.STRING, notNull: true },
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      sequelize,
      modelName: "ResultBody",
      tableName: "result_body",
      timestamps: false,
    }
  );
  return ResultBody;
};
