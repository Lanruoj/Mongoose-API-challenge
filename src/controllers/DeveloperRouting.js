const express = require("express");
const router = express.Router();

const {
  createDev,
  getAllDevs,
  updateDevById,
  deleteDevById,
} = require("./DeveloperFunctions");

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
  let name = request.body.name === "" ? "New Developer" : request.body.name;
  newDev = await createDev(name, request.body.skills);

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
