const { Model, ENUM, INTEGER, TEXT } = require("sequelize");
// const Job = require("./Job");
const Profile = require("./Profile");

const { sequelize } = require("../database/connection");

class Contract extends Model {}
Contract.init(
  {
    terms: {
      type: TEXT,
      allowNull: false,
    },
    status: {
      type: ENUM("new", "in_progress", "terminated"),
    },
    client_id: {
      type: INTEGER,
      allowNull: true,
    },
    contractor_id: {
      type: INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Contract",
  }
);

Contract.belongsTo(Profile, {
  as: "Contractor",
  foreignKey: "contractor_id",
});
Contract.belongsTo(Profile, {
  as: "Client",
  foreignKey: "client_id",
});

module.exports = Contract;
