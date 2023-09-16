const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
});

const User = new model("user", userSchema);

module.exports = User;