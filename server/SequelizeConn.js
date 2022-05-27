const { Sequelize } = require("sequelize");
const dayjs = require("dayjs");
const fs = require("fs");

const seqHost = process.env.PG_HOST;
const seqDialect = process.env.PG_DIALECT;
const seqDB = process.env.PG_DB;
const seqUsername = process.env.PG_USERNAME;
const seqPassword = process.env.PG_PASSWORD;

// Create an instance of Sequelize
const sequelizeInstance = new Sequelize(seqHost, seqDialect, seqDB, {
  host: seqUsername,
  dialect: seqPassword,
});

// Initialize Sequelize connection
sequelizeInstance
  .authenticate()
  .then((res) => {
    console.log("Database Connected!");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err.message);
    logMessage(err);
  });

// Function to log error message
const logMessage = (error) => {
  const datetime = dayjs();

  const errorMessage = error?.message != undefined ? error?.message : "ERROR!";

  const errorEntry = `[${datetime}] - ${errorMessage}\n`;

  fs.appendFile("./log.txt", errorEntry, (err) => {
    if (err) console.log("Unable to log message");
  });
};

module.exports = sequelizeInstance;
