const Category = require("../models/Category");
const Product = require("../models/Product");

const addProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      brand,
      description,
      price,
      stock,
      discountAmount,
      status,
    } = req.body;

    console.log(req.body);

    const newProduct = new Product({
      name,
      brand,
      category,
      discountAmount,
      description,
      price,
      stock,
    });

    await newProduct.save().then((data) => {
      const imagePath = `./public/product-images/${data._id}.jpg`;

      if (req.files.image) {
        req.files.image.mv(imagePath, (err) => {
          if (!err) {
            res.status(201).json({ message: "Product saved", success: true });
          } else {
            res.status(500).json({ error: "Image upload faild" });
          }
        });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  console.log(req.files.image);

  const { name, category, brand, description, price, stock, discountAmount } =
    req.body;

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      $set: {
        name: name,
        brand: brand,
        category: category,
        description: description,
        price: price,
        discountAmount: discountAmount,
        stock: stock,
      },
    },
    { new: true }
  );

  if (!updatedProduct) {
    return res.status(404).json({ error: "Product not found" });
  }

  if (req.files && req.files.image) {
    const imagePath = `./public/product-images/${updatedProduct._id}.jpg`;

    req.files.image.mv(imagePath, (err) => {
      if (!err) {
        console.log("Product updated successfully:");
        return res
          .status(200)
          .json({ message: "Product updated successfully" });
      } else {
        console.error("Error uploading image:", err);
        return res.status(500).json({ error: "Image upload failed" });
      }
    });
  }
};

const activate = async (req, res) => {
  const { id } = req.params;

  await Product.findByIdAndUpdate(id, { status: true }, { new: true })
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

  await Product.findByIdAndUpdate(id, { status: false }, { new: true })
    .then((response) => {
      console.log(response);
      return res.json({ success: true });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const products = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const oneProduct = async (req, res) => {
  const productId = req.params.id;

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json({ product });
    })
    .catch((error) => {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

module.exports = {
  addProduct,
  updateProduct,
  activate,
  inActive,
  products,
  oneProduct,
};
