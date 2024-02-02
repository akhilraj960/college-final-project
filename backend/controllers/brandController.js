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
              message: "brand Added Successfully",
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

const updateBrand = async (req, res) => {
  const { id } = req.params;

  const { name, description } = req.body;

  const updateBrand = await Brand.findByIdAndUpdate(
    id,
    {
      $set: {
        name: name,
        description: description,
      },
    },
    { new: true }
  );

  if (!updateBrand) {
    return res.status(404).json({ error: "Product not found" });
  }

  if (req.files && req.files.image) {
    const imagePath = `./public/brand-images/${updateBrand._id}.jpg`;

    req.files.image.mv(imagePath, (err) => {
      if (!err) {
        console.log("Brand updated successfully:");
        return res.status(200).json({ message: "Brand updated successfully" });
      } else {
        console.error("Error uploading image:", err);
        return res.status(500).json({ error: "Image upload failed" });
      }
    });
  }
};

const activate = async (req, res) => {
  const { id } = req.params;

  await Brand.findByIdAndUpdate(id, { status: true }, { new: true })
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

  await Brand.findByIdAndUpdate(
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

const oneBrand = async (req, res) => {
  const brandId = req.params.id;

  Brand.findById(brandId)
    .then((brand) => {
      if (!brand) {
        return res
          .status(404)
          .json({ message: "Brand Not Found", success: false });
      }

      res.status(200).json({ message: "Brand found", brand, success: true });
    })
    .catch((error) => {
      console.log("Error fetching brand:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const activeBrands = async (req, res) => {
  const brands = await Brand.aggregate([{ $match: { status: true } }]);

  return res
    .status(200)
    .json({ message: "brands found success", brands, success: true });
};


module.exports = {
  newBrand,
  allBrands,
  activate,
  inActive,
  updateBrand,
  oneBrand,
  activeBrands
};
