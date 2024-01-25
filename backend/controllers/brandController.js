const Brand = require("../models/Brand");

const newBrand = (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  }

  const newBrand = new Brand({
    name: name,
    description: description,
  });

  newBrand
    .save()
    .then((response) => {
      console.log(response);

      const imagePath = `./public/brand-images/${response._id}.jpg`;

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
        .json({ message: "Invalid Server Error", success: false, error });
    });
};

const allBrands = async (req, res) => {
  const brands = await Brand.find();

  if (!brands) {
    return res.status().json({ message: "brand not found", success: false });
  }

  res.status(200).json({ success: true, brands });
};

module.exports = { newBrand, allBrands };
