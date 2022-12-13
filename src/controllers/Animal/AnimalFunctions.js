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

async function createNewAnimal(name, species, age, colour) {
  console.log("createNewAnimal()");
  let newAnimal = await Animal.create({
    name: name,
    species: species,
    age: age,
    colour: colour,
  });

  return newAnimal;
}

module.exports = { getAllAnimals, createNewAnimal };
