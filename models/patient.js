"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Plan, {
        foreignKey: "plan_id",
        as: "plan",
      });
      this.belongsToMany(models.Surgerie, {
        foreignKey: "patient_id",
        through: "Patient_surgeries",
        as: "surgery",
      });
    }
  }
  Patient.init(
    {
      patient_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      fullname: DataTypes.STRING,
      plan_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Patient",
    }
  );
  return Patient;
};
