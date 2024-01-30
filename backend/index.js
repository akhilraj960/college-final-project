const express = require("express");
const fileUplaod = require("express-fileupload");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const AuthRouter = require("./router/authRoutes");
const ProductRouter = require("./router/productRoutes");
const AdminRouter = require("./router/adminRoutes");
const CategoryRouter = require("./router/categoryRoutes");
const BrandRouter = require("./router/brandRoutes");

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
app.use("/api/product", ProductRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/category", CategoryRouter);
app.use("/api/brand", BrandRouter);

app.use("/public", express.static(path.resolve(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});
// vmLqKe2TfSCtwXBT
