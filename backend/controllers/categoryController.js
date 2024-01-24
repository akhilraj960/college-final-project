const Category = require("../models/Category");

const addCategory = async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({
      message: "Invalid input data",
      success: false,
    });
  }

  const newCategory = new Category({
    name: name,
    description: description,
  });

  await newCategory
    .save()
    .then((response) => {
      console.log(response);
      const imagePath = `./public/category-images/${response._id}.jpg`;

      if (req.files.image) {
        req.files.image.mv(imagePath, (err) => {
          if (!err) {
            res.status(201).json({
              message: "Category Added Successfully",
              success: true,
            });
          } else {
            res.status(500).json({ error: "Image upload faild" });
          }
        });
      }
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
