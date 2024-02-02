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

const updateCategory = async (req, res) => {
  const { id } = req.params;

  console.log(id)

  const { name, description } = req.body;

  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    {
      $set: {
        name: name,
        description: description,
      },
    },
    { new: true }
  );

  if (!updatedCategory) {
    return res.status(404).json({ error: "Product not found" });
  }

  if (req.files && req.files.image) {
    const imagePath = `./public/category-images/${updatedCategory._id}.jpg`;

    req.files.image.mv(imagePath, (err) => {
      if (!err) {
        console.log("Brand updated successfully:");
        return res.status(200).json({ message: "Category updated successfully" });
      } else {
        console.error("Error uploading image:", err);
        return res.status(500).json({ error: "Image upload failed" });
      }
    });
  }
};

const activate = async (req, res) => {
  const { id } = req.params;

  await Category.findByIdAndUpdate(id, { status: true }, { new: true })
    .then((response) => {
      return res.json({ message: "Updated", success: true });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const inActive = async (req, res) => {
  const { id } = req.params;

  await Category.findByIdAndUpdate(
    id,
    { message: "Updated", status: false },
    { new: true }
  )
    .then((response) => {
      return res.json({ success: true });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const oneCategory = async (req, res) => {
  const categoryId = req.params.id;

  console.log(categoryId);

  Category.findById(categoryId)
    .then((category) => {
      console.log(category);

      if (!category) {
        return res
          .status(404)
          .json({ message: "Category Not Found", success: false });
      }
      return res
        .status(200)
        .json({ message: "Found", success: true, category });
    })
    .catch((error) => {
      console.log("Error fetching category", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const activeCategories = async (req, res) => {
  const categories = await Category.aggregate([{ $match: { status: true } }]);

  return res
    .status(200)
    .json({ message: "categories found success", categories, success: true });
};


module.exports = {
  activate,
  inActive,
  getCagetories,
  addCategory,
  updateCategory,
  oneCategory,
  activeCategories
};
