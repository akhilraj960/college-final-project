const mongoose = require("mongoose");

const connection = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((data) => {
      console.log("DB Connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connection;
