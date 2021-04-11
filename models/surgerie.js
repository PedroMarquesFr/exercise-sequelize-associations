"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Surgerie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Patient, {
        foreignKey: "surgery_id",
        through: "Patient_surgeries",
        as: "patients",
      });
    }
  }
  Surgerie.init(
    {
      surgery_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      specialty: DataTypes.STRING,
      doctor: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Surgerie",
    }
  );
  return Surgerie;
};
