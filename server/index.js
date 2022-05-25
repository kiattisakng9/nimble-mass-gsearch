const express = require("express");
require("dotenv").config();
const { sequelize, users } = require("./models");
const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("All good!");
});

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  await sequelize.authenticate();
  console.log("Database Connected!");
});
