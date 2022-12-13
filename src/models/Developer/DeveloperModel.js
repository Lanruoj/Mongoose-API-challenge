const mongoose = require("mongoose");

const Developer = mongoose.model("Developer", {
  name: String,
  skills: [String],
});

module.exports = { Developer };
