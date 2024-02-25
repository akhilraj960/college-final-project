const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: String,
    },
    phone: {
      type: String,
      default: "Phone",
    },
    address: [
      {
        city: {
          type: String,
          default: "",
        },
        address1: {
          type: String,
          default: "",
        },
        address2: {
          type: String,
          default: "",
        },
        zipcode: {
          type: String,
          default: "",
        },
      },
    ],
    role: {
      type: String,
      enum: ["user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
