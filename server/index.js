require("dotenv").config();
const express = require("express");
var cors = require("cors");
const { sequelize } = require("./models");
const app = express();

bodyParser = require("body-parser");
const usersRoute = require("./routes/users");
const searchResultsRoute = require("./routes/search_results");
const bodiesRoute = require("./routes/bodies");
const authRoute = require("./routes/auth");
const gSearchRoute = require("./routes/gsearch");

const port = process.env.PORT;
app.use(bodyParser.json({ limit: "2mb" }));
app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("All good!");
});

app.use("/users", usersRoute);
app.use("/search_results", searchResultsRoute);
app.use("/bodies", bodiesRoute);
app.use("/auth", authRoute);
app.use("/gsearch", gSearchRoute);

app.listen(port, async () => {
  console.log(`App listening on port ${port}`);
  await sequelize
    .authenticate()
    .then(() => {
      console.log("Database Connected!");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err.message);
      logMessage(err);
    });
});
