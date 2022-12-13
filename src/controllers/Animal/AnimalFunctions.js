const { Animal } = require("../../models/Animal/AnimalModel");

async function getAllAnimals() {
  console.log("getAllAnimals()");
  let allAnimals = await Animal.find({})
    .exec()
    .catch((error) => {
      console.log("Error" + error);
    });

  return allAnimals;
}

module.exports = { getAllAnimals };
