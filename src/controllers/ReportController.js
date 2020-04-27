const { Op } = require("sequelize");
const User = require("../models/User");

module.exports = {
  async show(req, res) {
    const users = await User.findAll({
      attributes: ["name", "email"],
      where: {
        email: {
          [Op.iLike]: "%@novaandradina.org",
        },
      },
      include: [
        {
          association: "addresses",
          where: {
            street: "Rua Joaquim Gonçalves da Silva",
          },
        },
        {
          association: "techs",
          required: false,
          where: {
            name: {
              [Op.iLike]: "React Native%",
            },
          },
        },
      ],
    });

    return res.json(users);
  },
};
