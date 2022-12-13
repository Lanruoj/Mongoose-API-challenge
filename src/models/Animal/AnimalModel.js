const { moduleExpression } = require("@babel/types");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const animalSchema = new Schema({
  name: String,
  species: String,
  age: Number,
  colour: String,
});

const Animal = mongoose.model("Animal", animalSchema);

module.exports = { Animal };
