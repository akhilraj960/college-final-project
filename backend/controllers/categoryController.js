const Category = require("../models/Category");

const addCategory = async (req, res) => {
  const { name, description } = req.body;
  const { image } = await req.files;

  console.log(image.data);

  if (!name || !description || !image.data) {
    return res.status(400).json({
      message: "Invalid input data",
      success: false,
    });
  }

  const newCategory = new Category({
    name: name,
    description: description,
    image: image.data,
  });

  newCategory
    .save()
    .then((response) => {
      res.status(201).json({
        message: "Category Added Successfully",
        response,
        success: true,
      });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false, error });
    });
};

const getCagetories = async (req, res) => {
  const category = await Category.find();

  res.json({ success: true, category });
};

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

module.exports = { activate, inActive, getCagetories, addCategory };
