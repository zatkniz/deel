const Contract = require("../models/contract");
const { Op } = require("sequelize");

const getAll = async (req, res) => {
  try {
    const contracts = await Contract.findAll({
      where: {
        status: {
          [Op.ne]: "terminated",
        },
      },
      where: {
        [Op.or]: [
          {
            client_id: req.profile.id,
          },
          {
            contractor_id: req.profile.id,
          },
        ],
      },
      include: ["Contractor"],
    });

    res.json(contracts);
  } catch (error) {
    console.log(error);
  }
};

const getOne = async (req, res) => {
  try {
    const authUser = req.profile.id;
    const { id } = req.params;
    const contract = await Contract.findOne({ where: { id } });

    /**
     * Return 404 if contract not found
     */
    if (!contract) {
      return res.status(404).end();
    }

    /**
     * Return 401 if user is not the client or the contractor of the contract
     */
    if (
      authUser !== contract.client_id &&
      authUser !== contract.contractor_id
    ) {
      return res.status(401).end();
    }

    res.json(contract);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAll,
  getOne,
};
