const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

/**
 * Dynamically load all routes
 * Each js files in routes folder will be loaded as a route
 * It is not production ready, but it is enough for this example
 */
const routesPath = path.join(__dirname, "routes");
fs.readdirSync(routesPath).forEach(function (file) {
  if (file.endsWith(".js")) {
    const route = require(`${routesPath}/${file}`);
    const [routeName] = file.split(".");
    app.use(`/${routeName}`, route);
  }
});

module.exports = app;
