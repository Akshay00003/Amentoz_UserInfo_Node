const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "user name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  address: {
    type: String,
    required: [true, "address is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  image: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});
module.exports = mongoose.model("User", userSchema);
