const Sequelize = require("sequelize");

/**
 * We never store connection string in files,
 * so we can use environment variables.
 * PLEASE USE .env :)
 */
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite3",
});

module.exports = {
  sequelize,
};
