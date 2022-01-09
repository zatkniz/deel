const express = require("express");
const router = express.Router();
const { getProfile } = require("../middleware/getProfile");
const jobsController = require("../controllers/jobs.controller");

/**
 * @api {get} /jobs Get all unpaid jobs of the auth user
 * @apiName GetJobs
 * @apiGroup Jobs
 * @apiDescription Get all unpaid jobs of the auth user
 * @apiPermission admin
 * @return {Array} 200 - An array of jobs
 */
router.get("/unpaid", getProfile, jobsController.unpaid);

/**
 * @api {post} /jobs/:id/pay Pay for a job
 * @apiName PayJob
 * @apiGroup Jobs
 * @apiDescription Pay for a job
 * @apiPermission admin
 * @apiParam {Number} id Job unique ID
 * @return {Object} 200 - A success message
 * @return {Object} 404 - Not found
 * @return {Object} 401 - Unauthorized
 * @returns {Object} 400 - Bad request
 */
router.post("/:job_id/pay", getProfile, jobsController.pay);

module.exports = router;
