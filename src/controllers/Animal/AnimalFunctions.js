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

async function updateAnimal(fields) {
  console.log("updateAnimal()");
  let updatedAnimal = await Animal.findOneAndUpdate(
    { _id: fields.id },
    {
      name: fields.name && fields.name,
      species: fields.species && fields.species,
      age: fields.age && fields.age,
      colour: fields.colour && fields.colour,
    },
    { returnOriginal: false }
  );

  return updatedAnimal;
}

async function deleteAnimal(id) {
  console.log("deleteAnimal()");
  let deletedAnimal = await Animal.deleteOne({
    _id: id,
  });
}

module.exports = { getAllAnimals, createNewAnimal, updateAnimal, deleteAnimal };
