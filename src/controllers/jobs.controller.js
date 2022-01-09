const Job = require("../models/job");
const { Op } = require("sequelize");

const unpaid = async (req, res) => {
  try {
    const contracts = await Job.findAll({
      where: {
        paid: null,
        "$Contract.status$": {
          [Op.eq]: "in_progress",
        },
        [Op.or]: [
          {
            "$Contract.client_id$": req.profile.id,
          },
          {
            "$Contract.contractor_id$": req.profile.id,
          },
        ],
      },
      include: ["Contract"],
    });

    res.json(contracts);
  } catch (error) {
    console.log(error);
  }
};

const pay = async (req, res) => {
  try {
    const { job_id } = req.params;
    const { profile } = req;
    const { amount } = req.body;

    /**
     * Validate request body
     *
     * TODO: create DTO to handle incoming requests
     */
    if (!!!amount) {
      res.status(400).json({ error: "Amount is missing from request body" });
    }

    const job = await Job.findOne({
      where: {
        id: job_id,
        "$Contract.client_id$": req.profile.id,
      },
      include: ["Contract"],
    });

    /**
     * Return 404 if job not found
     */
    if (!job) {
      res
        .status(404)
        .json({ error: "The job you are trying to pay does not exist" });
    }

    /**
     * Return 401 if the job is already paid
     */
    if (job.paid) {
      return res.status(400).json({
        error: "The job has already been paid",
      });
    }

    /**
     * Return 401 if the amount we are trying to pay is less than
     * users balance
     */
    if (profile.balance < amount) {
      return res.status(400).json({ error: "Insufficient funds" });
    }

    /**
     * Return 401 if the job is already paid
     */
    if (job.price !== +amount) {
      return res.status(400).json({
        error: "The amount you are trying to pay is not the correct one",
      });
    }

    /**
     * Update the job paid status
     */
    job.paid = true;
    job.payment_date = new Date();
    await job.save();

    /**
     * Update the user balance
     */
    profile.balance -= +amount;
    await profile.save();

    /**
     * Update the contractor balance
     */
    const contractor = await job.Contract.getContractor();
    contractor.balance += +amount;
    await contractor.save();

    res.json({ message: "Job paid successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  unpaid,
  pay,
};
