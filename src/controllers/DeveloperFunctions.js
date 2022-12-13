const { Developer } = require("../models/DeveloperModel");

async function createDev(newName, newSkills) {
  let createResult = await Developer.create({
    name: newName,
    skills: newSkills,
  }).catch((error) => {
    console.log("Some error occurred saving data!:\n" + error);
  });
  // Return either the new document or the error object
  return createResult;
}

async function getAllDevs() {
  let devs = await Developer.find().exec();
  // Return the array of documents
  return devs;
}

async function updateDevById(id, newName, newSkills) {
  // Find the document by ID
  let targetDev = await Developer.findById(id).exec();
  // Replace old data with new data but only if the new data is NOT falsey
  targetDev.name = newName || targetDev.name;
  targetDev.skills = newSkills || targetDev.skills;
  // Save the modified document to the database
  let updatedTargetDev = await targetDev.save();
  // Return the modified document OR error object triggered by a faulty save.
  return updatedTargetDev;
}

async function deleteDevById(id) {
  let deleteResult = await Developer.findByIdAndDelete(id).exec();
  // Return the deleted document on success, or error object on failure.
  return deleteResult;
}

module.exports = {
  createDev,
  getAllDevs,
  updateDevById,
  deleteDevById,
};
