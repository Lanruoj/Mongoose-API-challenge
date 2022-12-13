const {
  getAllAnimals,
  createNewAnimal,
  updateAnimal,
  deleteAnimal,
  seedAnimals,
} = require("./AnimalFunctions");
const Animal = require("../../models/Animal/AnimalModel");
const express = require("express");
const router = express.Router();

// Seed Animals from AnimalSeeds.js
router.post("/seed", async (request, response) => {
  console.log("POST /seed");
  let seededAnimals = await seedAnimals();

  response.json({
    animals: seededAnimals,
  });
});

// Show all Animals
router.get("/", async (request, response) => {
  console.log("GET /animals");
  let allAnimals = [];

  allAnimals = await getAllAnimals();

  response.json({
    animals: allAnimals,
  });
});

// Create new Animal
router.post("/", async (request, response) => {
  console.log("POST /animals");
  let newAnimal = null;
  let name = request.body.name || null;
  let species = request.body.species || null;
  let age = request.body.age || null;
  let colour = request.body.colour || null;

  newAnimal = await createNewAnimal(name, species, age, colour);

  response.json({
    newAnimal: newAnimal,
  });
});

// Update Animal
router.put("/", async (request, response) => {
  console.log("PUT /animals");
  let fields = request.body;
  let updatedAnimal = await updateAnimal(fields);

  response.json({
    animal: updatedAnimal,
  });
});

// Delete Animal
router.delete("/", async (request, response) => {
  console.log("DELETE /animals");
  let animalID = request.body.id;
  await deleteAnimal(animalID);

  response.json({
    message: "Animal deleted",
  });
});

module.exports = router;
