const express = require("express");
const router = express.Router();
const { getProfile } = require("../middleware/getProfile");
const contractsController = require("../controllers/contracts.controller");

/**
 * @api {get} /contracts Get all contracts
 * @apiName GetContracts
 * @apiGroup Contracts
 * @apiDescription Get all non terminated contracts of the auth user
 * @apiPermission none
 * @return {Array} 200 - An array of contracts
 */
router.get("/", getProfile, contractsController.getAll);

/**
 * @api {get} /contracts/:id Get a contract
 * @apiName GetContract
 * @apiGroup Contracts
 * @apiDescription Get a contract of the auth user
 * @apiPermission admin
 * @apiParam {Number} id Contract unique ID
 * @return {Object} 200 - A contract
 * @return {Object} 404 - Not found
 * @return {Object} 401 - Unauthorized
 */
router.get("/:id", getProfile, contractsController.getOne);

module.exports = router;
