const { Model, TEXT, BOOLEAN, DATE, DECIMAL, INTEGER } = require("sequelize");
const Contract = require("./Contract");
const { sequelize } = require("../database/connection");

class Job extends Model {}
Job.init(
  {
    description: {
      type: TEXT,
      allowNull: false,
    },
    price: {
      type: DECIMAL(12, 2),
      allowNull: false,
    },
    paid: {
      type: BOOLEAN,
      default: false,
    },
    payment_date: {
      type: DATE,
    },
    contract_id: {
      type: INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Job",
  }
);

Job.belongsTo(Contract, {
  as: "Contract",
  foreignKey: "contract_id",
});

module.exports = Job;
