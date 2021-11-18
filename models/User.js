let mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
});
module.exports = mongoose.model("user", userSchema);
