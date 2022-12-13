const { moduleExpression } = require("@babel/types");
const mongoose = require("mongoose");

const Animal = mongoose.model("Animal", {
  name: String,
  species: String,
  age: Number,
  colour: String,
});

module.exports = { Animal };
