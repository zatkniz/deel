const sequelize = require("sequelize");

/**
 * Creates a date range for the payment_date
 * If nothings is passed, it will return all the data
 * @param {*} start
 * @param {*} end
 * @returns The payment date for the given start and end date or null
 */
const generatePaymentDate = (start, end) => {
  if (start && end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    return { [sequelize.Op.between]: [startDate, endDate] };
  }

  if (start) {
    const startDate = new Date(start);
    return { [sequelize.Op.gte]: startDate };
  }

  if (end) {
    const endDate = new Date(end);
    return { [sequelize.Op.lte]: endDate };
  }

  return null;
};

module.exports = generatePaymentDate;
