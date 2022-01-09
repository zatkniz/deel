const generatePaymentDate = require("../helpers/generatePaymentDate");
const sequelize = require("sequelize");
const Contract = require("../models/Contract");
const Job = require("../models/Job");

const bestProfession = async (req, res) => {
  const { start, end } = req.query;

  /**
   * Generate the payment date
   * there is no validation happening here! I know that is not good
   * but i need to start creating testing!
   * In real life scenarios, the date should be validated
   * AND I WOULD SPEND AS MUCH TIME NEEDED TO FIX THAT
   */
  const payment_date = generatePaymentDate(start, end);

  try {
    const query = {
      attributes: [
        "Contract.contractor_id",
        [sequelize.fn("count", sequelize.col("*")), "count"],
        [sequelize.fn("sum", sequelize.col("price")), "total_amount"],
      ],
      where: {
        paid: true,
        payment_date: payment_date || { [sequelize.Op.ne]: null },
      },
      group: ["Contract.contractor_id"],
      include: [
        {
          model: Contract,
          as: "Contract",
          include: ["Contractor"],
        },
      ],
      order: [[sequelize.col("total_amount"), "DESC"]],
    };

    const result = await Job.findOne(query);

    res.send({
      profession: result.Contract.Contractor.profession,
      count: result.getDataValue("count"),
      total_amount: result.getDataValue("total_amount"),
    });
  } catch (error) {
    console.log(error);
  }
};

const bestClients = async (req, res) => {
  const { start, end } = req.query;
  const limit = req.query.limit || 2;
  /**
   * Generate the payment date
   * there is no validation happening here! I know that is not good
   * but i need to start creating testing!
   * In real life scenarios, the date should be validated
   * AND I WOULD SPEND AS MUCH TIME NEEDED TO FIX THAT
   */
  const payment_date = generatePaymentDate(start, end);

  try {
    const query = {
      attributes: ["id", [sequelize.fn("sum", sequelize.col("price")), "paid"]],
      where: {
        paid: true,
        payment_date: payment_date || { [sequelize.Op.ne]: null },
      },
      group: ["Contract.client_id"],
      limit,
      include: [
        {
          model: Contract,
          as: "Contract",
          include: ["Client"],
        },
      ],
      order: [[sequelize.col("paid"), "DESC"]],
    };

    /**
     * Get the best clients
     */
    const result = await Job.findAll(query);

    /**
     * There must be a better way to do this
     * straight into the query. This is not the best way
     * but it is working for now. I apologize for this but couldn't find
     * how i can archive that from Sequelize
     */
    res.send(
      result.map(({ id, paid, Contract }) => ({
        id,
        paid,
        fullName: `${Contract.Client.firstName} ${Contract.Client.lastName}`,
      }))
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  bestClients,
  bestProfession,
};
