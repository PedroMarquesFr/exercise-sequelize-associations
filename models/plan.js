"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Patient, { foreignKey: "patient_id", as:"plan" });
    }
  }
  Plan.init(
    {
      plan_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      coverage: DataTypes.STRING,
      price: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Plan",
    }
  );
  return Plan;
};
