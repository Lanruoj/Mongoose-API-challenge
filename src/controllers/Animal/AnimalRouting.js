const { getAllAnimals } = require("./AnimalFunctions");
const Animal = require("../../models/Animal/AnimalModel");
const express = require("express");
const router = express.Router();

// Show all Animals
router.get("/", async (req, res) => {
  console.log("GET /animals");
  let allAnimals = [];

  allAnimals = await getAllAnimals();

  res.json({
    animals: allAnimals,
  });
});

module.exports = router;
