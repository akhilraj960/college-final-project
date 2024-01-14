const express = require("express");
const fileUplaod = require("express-fileupload");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const path = require('path')
require("dotenv").config();
const {
  userLogin,
  userRegister,
  AdminLogin,
  getStatus,
} = require("./routes/authRoutes");
const {
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
} = require("./routes/productRoues");

const app = express();

const PORT = 5000;

// DataBase Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then((data) => {
    console.log("DB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

//   MiddleWares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUplaod());

// authRoutes
app.post("/login", userLogin);
app.post("/register", userRegister);
app.get("/getstatus", getStatus);

app.post("/admin/login", AdminLogin);
app.post("/admin/addproduct", addProduct);
app.put("/admin/editproduct/:id", editProduct);
app.get("/admin/getallproducts", getAllProducts);
app.get("/admin/getoneproduct/:id",getOneProduct)

app.post("/admin/addcategory", addCategory);
app.post("/admin/addsubcategory", addSubCategory);

app.post("/admin/createbrand", createBrand);

app.get("/getbrand", getBrand);
app.get("/getcategories", getCategory);
app.get("/getsubcategories", getSubCategory);

app.use("/public", express.static(path.resolve(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});
