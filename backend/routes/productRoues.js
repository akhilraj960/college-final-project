const Brand = require("../models/Brand");
const Category = require("../models/Category");
const Product = require("../models/Product");

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
  const image = req.body.image;

  try {
    const {
      name,
      brand,
      category,
      subcategory,
      discountprice,
      discription,
      price,
      stock,
    } = req.body;

    // Assuming you have a product model (e.g., using Mongoose)
    const newProduct = new Product({
      name,
      brand,
      category,
      subcategory,
      discountprice,
      discription,
      price,
      stock,
      // Add other properties as needed
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save().then((data) => {
      const imagePath = `./public/product-images/${data._id}.jpg`;

      if (req.files.image) {
        req.files.image.mv(imagePath, (err) => {
          if (!err) {
            console.log("Product added successfully:");
            res.status(201).json({ message: "product saved" });
          } else {
            // Handle the error response for image upload failure
            console.error("Error uploading image:", err);
            res.status(500).json({ error: "Image upload failed" });
          }
        });
      }
    });

    // const imagePath = `./public/product-images/${savedProduct._id}.jpg`;
    // image.mv(imagePath, (err) => {
    //   if (err) {
    //     // Handle the error response for image upload failure
    //     console.error("Error uploading image:", err);
    //     res.status(500).json({ error: "Image upload failed" });
    //     return; // Add a return statement to avoid executing the next block
    //   }

    //   // Handle further processing, such as additional image file handling if needed
    //   // For example, you might want to process the image (resize, optimize, etc.)

    //   // Send a response to the client
    //   console.log("Product added successfully:", savedProduct);
    //   res.status(201).json({ data: savedProduct });
    // });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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
