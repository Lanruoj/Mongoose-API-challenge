const express = require("express");
const { Developer } = require("../models/DeveloperModel");
const router = express.Router();

const {
  createDev,
  getAllDevs,
  updateDevById,
  deleteDevById,
  seedDevs,
} = require("./DeveloperFunctions");

// Seed developers
router.post("/seed", async (request, response) => {
  let dev1 = new Developer({
    name: "Tane",
    skills: ["HTML", "CSS", "JavaScript", "React", "Python"],
  });
  let dev2 = new Developer({
    name: "Archie",
    skills: ["HTML", "CSS", "JavaScript", "React", "Python"],
  });
  let dev3 = new Developer({
    name: "Bobo",
    skills: ["HTML", "CSS", "JavaScript", "React", "Python"],
  });

  seedArray = await seedDevs([dev1, dev2, dev3]);

  response.send({
    seeds: seedArray,
  });
});

// Get all devs
router.get("/", async (request, response) => {
  let listOfDevs = [];

  listOfDevs = await getAllDevs();

  response.send({
    developers: listOfDevs,
  });
});

// Create a new dev
router.post("/", async (request, response) => {
  let newDev = null;
  // Read data from the request body, assuming that was a JSON object
  let devName = request.body.name || "New Developer";
  let devSkills = request.body.skills || "Problem solving";
  newDev = await createDev(devName, devSkills);

  response.json({
    developer: newDev,
  });
});

// Update an existing dev
router.put("/", async (request, response) => {
  let targetDev = null;

  // If we receive a falsey value, explicitly change that to null
  // since we have logic inside updateDevById to reuse old data when null is found
  let receivedName = request.body.name || null;
  let receivedSkills = request.body.skills || null;

  targetDev = await updateDevById(
    request.body.id,
    receivedName,
    receivedSkills
  );

  response.json({
    updatedDeveloper: targetDev,
  });
});

// Delete a dev
router.delete("/", async (request, response) => {
  let deletedDev = null;

  // This returns the document that was deleted,
  // in case we want to do any nice farewell-type stuff with the data.
  deletedDev = await deleteDevById(request.body.id);

  response.json({
    deletedDeveloper: deletedDev,
  });
});

module.exports = router;
