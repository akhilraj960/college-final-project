const express = require("express");
const fileUplaod = require("express-fileupload");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const AuthRouter = require("./router/authRoutes");


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

const { getAllUsers } = require("./routes/adminRoutes");
const connection = require("./db/connection");

const app = express();

const PORT = 5000;

// DataBase Connection
connection();

//   MiddleWares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUplaod());

app.use("/api/auth", AuthRouter);

app.post("/admin/addproduct", addProduct);
app.put("/admin/editproduct/:id", editProduct);
app.get("/admin/getallproducts", getAllProducts);
app.get("/admin/getoneproduct/:id", getOneProduct);
app.get("/admin/getallusers", getAllUsers);

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
// vmLqKe2TfSCtwXBT
