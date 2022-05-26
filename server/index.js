const express = require("express");
require("dotenv").config();
const { sequelize, Users, SearchResults, ResultBody } = require("./models");
const app = express();

bodyParser = require("body-parser");
const usersRoute = require("./routes/users");
const searchResultsRoute = require("./routes/search_results");
const bodiesRoute = require("./routes/bodies");
const authRoute = require("./routes/auth");

const port = process.env.PORT;
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("All good!");
});

app.use("/users", usersRoute);
app.use("/search_results", searchResultsRoute);
app.use("/bodies", bodiesRoute);
app.use("/auth", authRoute);

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  await sequelize.authenticate();
  console.log("Database Connected!");
});
