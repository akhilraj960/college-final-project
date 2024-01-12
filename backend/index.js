const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { userLogin, userRegister, AdminLogin, getStatus } = require("./routes/authRoutes");

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
app.get('/getstatus',getStatus)

app.post("/admin/login", AdminLogin);

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});
