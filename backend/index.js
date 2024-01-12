const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
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

// authRoutes
app.post("/login", userLogin);
app.post("/register", userRegister);
app.get("/getstatus", getStatus);

app.post("/admin/login", AdminLogin);
app.post("/admin/addproduct", addProduct);

app.post("/admin/addcategory", addCategory);
app.post("/admin/addsubcategory", addSubCategory);

app.post("/admin/createbrand", createBrand);

app.get("/getbrand", getBrand);
app.get("/getcategories", getCategory);
app.get("/getsubcategories", getSubCategory);

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});
