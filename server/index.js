require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const logger = require("morgan");
const PORT = process.env.PORT || 7000;
const connectDB = require("./config/db");
const cors = require("cors");

// connect to database
connectDB();

//middlewares
app.use(cors())
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/table", require("./routes/table"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
