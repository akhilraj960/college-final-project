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
  try {
    const {
      name,
      brand,
      category,
      subcategory,
      discountprice,
      description,
      price,
      stock,
    } = req.body;

    console.log(req.body);

    // Assuming you have a product model (e.g., using Mongoose)
    const newProduct = new Product({
      name: name,
      brand: brand,
      category: category,
      subCategory: subcategory,
      discountAmount: discountprice,
      discription: description,
      price: price,
      stock: stock,
      // Add other properties as needed
    });

    // Save the new product to the database
    await newProduct.save().then((data) => {
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
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const editProduct = async (req, res) => {
  try {
    const productId = req.params.productId; // Assuming you are passing the productId in the route

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
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $set: {
          name,
          brand,
          category,
          subcategory,
          discountprice,
          discription,
          price,
          stock,
          // Add other properties as needed
        },
      },
      { new: true }
    );

    if (!updatedProduct) {
      // If the product with the specified ID is not found
      return res.status(404).json({ error: "Product not found" });
    }

    // Handle image update if a new image is provided
    if (req.files && req.files.image) {
      const imagePath = `./public/product-images/${updatedProduct._id}.jpg`;

      req.files.image.mv(imagePath, (err) => {
        if (!err) {
          console.log("Product updated successfully:");
          return res
            .status(200)
            .json({ message: "Product updated successfully" });
        } else {
          // Handle the error response for image upload failure
          console.error("Error uploading image:", err);
          return res.status(500).json({ error: "Image upload failed" });
        }
      });
    } else {
      // If no new image is provided, respond with a success message
      console.log("Product updated successfully (without image change):");
      res.status(200).json({ message: "Product updated successfully" });
    }
  } catch (error) {
    console.error("Error editing product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    // Assuming you have a Product model with find method
    const products = await Product.find();

    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOneProduct = (req, res) => {
  const productId = req.params.id; // Assuming the product ID is passed in the request parameters

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        // If no product is found, send a 404 Not Found response
        return res.status(404).json({ error: "Product not found" });
      }

      // Send the product as a JSON response with a 200 status code
      res.status(200).json({ product });
    })
    .catch((error) => {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

module.exports = {
  addProduct,
  addCategory,
  addSubCategory,
  createBrand,
  getBrand,
  getCategory,
  getSubCategory,
  editProduct,
  getAllProducts,
  getOneProduct,
};
