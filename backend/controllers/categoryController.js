const Category = require("../models/Category");

const activate = async (req, res) => {
  const { id } = req.params;

  await Category.findByIdAndUpdate(id, { status: true }, { new: true })
    .then((response) => {
      console.log(response);
      return res.json({ success: true });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const inActive = async (req, res) => {
  const { id } = req.params;

  await CategoryF.findByIdAndUpdate(id, { status: false }, { new: true })
    .then((response) => {
      console.log(response);
      return res.json({ success: true });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

module.exports = { activate, inActive };
