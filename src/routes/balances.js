const express = require("express");
const router = express.Router();
const balancesController = require("../controllers/balances.controller");

/**
 * @api {post} //deposit/:userId Deposit money to a user
 * @apiName Deposit
 * @apiGroup Users
 * @apiDescription Deposit money to a user
 * @apiPermission admin
 * @apiParam {Number} userId User unique ID
 * @apiParam {Number} amount Amount to deposit
 * @return {Object} 200 - A success message
 * @return {Object} 404 - Not found
 * @return {Object} 401 - Unauthorized
 * @returns {Object} 400 - Bad request
 */
router.post("/deposit/:userId", balancesController.deposit);

module.exports = router;
