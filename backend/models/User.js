const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "voter"], // Accept only these two roles
      required: true,
    },
    email: {
      type: String,
      unique: true, // Ensure no duplicate emails
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Path or filename of uploaded image
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // Automatically manage createdAt and updatedAt

module.exports = mongoose.model("User", UserSchema);
