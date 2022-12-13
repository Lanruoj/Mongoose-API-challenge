const { getAllAnimals, createNewAnimal } = require("./AnimalFunctions");
const Animal = require("../../models/Animal/AnimalModel");
const express = require("express");
const router = express.Router();

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

module.exports = router;
