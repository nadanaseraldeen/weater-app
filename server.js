// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Create the server instance
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Project Data Endpoint
let projectData = {};

// GET Route to send data
app.get("/all", (req, res) => {
  res.send(projectData);
});

// POST Route to add data
app.post("/add", (req, res) => {
  projectData = {
    date: req.body.date,
    temp: req.body.temp,
    feel: req.body.feel,
  };
  res.send({ message: "Data added successfully", projectData });
});

// Start server
const port = 8000;
app.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
});
