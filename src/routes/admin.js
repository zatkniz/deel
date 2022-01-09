var express = require("express");
var router = express.Router();
const adminController = require("../controllers/admin.controller");

/**
 * @api {get} /best-profession Returns the profession with the highest balance
 * @apiName BestProfession
 * @apiGroup Professions
 * @apiDescription Returns the profession with the highest balance
 * @apiPermission admin
 * @apiSuccess {Object} 200 - A success message
 * @apiQuery {Date} start the start date
 * @apiQuery {Date} end the end date
 */
router.get("/best-profession", adminController.bestProfession);

/**
 * @api {get} /best-client Returns the client that paid the most jobs
 * @apiName BestClient
 * @apiGroup Clients
 * @apiDescription Returns the client that paid the most jobs
 * @apiPermission admin
 * @apiSuccess {Array} 200 - A success message
 * @apiQuery {Date} start the start date
 * @apiQuery {Date} end the end date
 * @apiQuery {Number} limit the limit of the result
 */
router.get("/best-clients", adminController.bestClients);

module.exports = router;
