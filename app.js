const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Bringing Routes
const userRoutes = require("./routes/users");
const parentTaskRoutes = require("./routes/parenttasks");

const app = express();
const port = 3000;

// Middleware of Express
app.use(cors());
app.use(bodyParser.json());
app.use("/users", userRoutes);
app.use("/parenttasks", parentTaskRoutes);

// Connecting MongoDB
const db = "mongodb://localhost:27017/project-manager";
mongoose.connect(db, { useNewUrlParser: true, useFindAndModify: false });

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error", () => {
  console.log("Cannot connect to MongoDB");
});

app.listen(port, () => {
  console.log(`Server Started at Port ${port}`);
});
