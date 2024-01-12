const Brand = require("../models/Brand");
const Category = require("../models/Category");

const SubCategory = require("../models/SubCategory");

const addCategory = (req, res) => {
  console.log(req.body);

  const newCategory = new Category({
    name: req.body.category,
  });

  newCategory
    .save()
    .then((data) => {
      console.log("Category saved successfully:", data);
      res.status(201).json({ message: "Category added successfully", data });
    })
    .catch((error) => {
      console.error("Error saving category:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const addSubCategory = (req, res) => {
  console.log(req.body);

  const newSubCategory = new SubCategory({
    name: req.body.subCategory,
  });

  newSubCategory
    .save()
    .then((data) => {
      console.log("Subcategory saved successfully:", data);
      res.status(201).json({ message: "Subcategory added successfully", data });
    })
    .catch((error) => {
      console.error("Error saving subcategory:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const createBrand = (req, res) => {
  const brandData = req.body.brand;

  const newBrand = new Brand({
    name: brandData,
  });

  newBrand
    .save()
    .then((data) => {
      console.log("Brand saved successfully:", data);
      res.status(201).json({ message: "Brand created successfully", data });
    })
    .catch((error) => {
      console.error("Error saving brand:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const getBrand = (req, res) => {
  Brand.find()
    .then((brands) => {
      res.status(200).json({ brands });
    })
    .catch((error) => {
      console.error("Error fetching brands:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const getCategory = (req, res) => {
  Category.find()
    .then((categories) => {
      res.status(200).json({ categories });
    })
    .catch((error) => {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const getSubCategory = (req, res) => {
  SubCategory.find()
    .then((subcategories) => {
      res.status(200).json({ subcategories });
    })
    .catch((error) => {
      console.error("Error fetching subcategories:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const addProduct = async (req, res) => {
  try {
    const image = req.files.image;
    console.log(req.body);
  } catch (error) {}
};

module.exports = {
  addProduct,
  addCategory,
  addSubCategory,
  createBrand,
  getBrand,
  getCategory,
  getSubCategory,
};
