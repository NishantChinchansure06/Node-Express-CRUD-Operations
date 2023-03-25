const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter the username"],
    },
    password: {
      type: String,
      required: [true, "Please enter the password"],
    },
    email: {
      type: String,
      required: [true, "Please enter the email address"],
      unique: [true, "Email alredy taken"],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("User", userSchema);
