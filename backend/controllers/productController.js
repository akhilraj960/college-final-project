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

const updateProduct = (req, res) => {
  const { id } = req.params;
};

module.exports = { addProduct ,updateProduct};
