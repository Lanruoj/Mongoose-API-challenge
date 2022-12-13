const { response } = require("express");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");

const devRouter = require("./controllers/Developer/DeveloperRouting");
app.use("/developers", devRouter);
const animalRouter = require("./controllers/Animal/AnimalRouting");
app.use("/animals", animalRouter);

async function dbConnect() {
  let databaseURL = "mongodb://localhost:27017/ExpressMongoStorage";
  try {
    switch (process.env.NODE_ENV.toLowerCase()) {
      case "prod":
      case "production":
        databaseURL =
          "some cloud database URL generated by the could DB provider";
        break;

      case "test":
        databaseURL += "Test";
        break;

      case "dev":
      case "development":
      default:
        databaseURL = databaseURL;
        break;
    }
    await mongoose.connect(databaseURL);
    console.log("Database connected");
  } catch (error) {
    console.log(`dbConnect failed! Error:\n${JSON.stringify(error)}`);
  }
}
dbConnect();

app.get("/", (req, res) => {
  res.json({
    message: "Hello world!",
  });
});

async function dbWipe() {
  console.log("Emptying out the database...");
  await mongoose.connection.db.dropDatabase();
  console.log("Database is now empty!");
}

// WIPE DATABASE
app.delete("/wipe", async (req, res) => {
  await dbWipe();
  res.json({
    message: "Database wiped",
  });
});

app.get("/databaseHealth", (request, response) => {
  let databaseState = mongoose.connection.readyState;
  let databaseName = mongoose.connection.name;
  let databaseModels = mongoose.connection.modelNames();
  let databaseHost = mongoose.connection.host;

  response.json({
    readyState: databaseState,
    dbName: databaseName,
    dbModels: databaseModels,
    dbHost: databaseHost,
  });
});

app.listen(3000, () => {
  console.log(
    "Express server with a database connection is listening on port 3000!"
  );
});
