const Job = require("../models/Job");
const sequelize = require("sequelize");
const Profile = require("../models/Profile");

const deposit = async (req, res) => {
  const { amount } = req.body;

  /**
   * Validate request body
   *
   * TODO: create DTO to handle incoming requests
   */
  if (!!!amount) {
    res.status(400).json({ error: "Amount is missing from request body" });
  }

  try {
    const { userId } = req.params;

    /**
     * First retrieve the user profile
     */
    const user = await Profile.findOne({
      where: {
        id: userId,
      },
    });

    /**
     * Return 404 if user not found
     */
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    /**
     * Get the summary of the user's jobs that
     * are in_progress
     */
    const [userSummary] = await Job.findAll({
      attributes: [
        [sequelize.fn("sum", sequelize.col("price")), "total_amount"],
      ],
      where: {
        "$Contract.client_id$": userId,
        "$Contract.status$": "in_progress",
      },
      include: ["Contract"],
    });

    /**
     * Get the percentage value of 25% of the total amount
     * of the user
     */
    const percentageResult = userSummary.getDataValue("total_amount") * 0.25;

    /**
     * Return 400 if the amount we are trying to deposit is higher
     * users 25% of the total amount of jobs
     */
    if (percentageResult < +amount) {
      return res.status(400).json({
        error: "You cant deposit more than 25% of the users jobs to pay",
      });
    }

    user.balance += +amount;
    await user.save();

    res.json({
      message: "Amount deposit successfully to user",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  deposit,
};
