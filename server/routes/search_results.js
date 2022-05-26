const express = require("express");
const router = express.Router();
const { sequelize, SearchResults } = require("./../models");

router.get("/", async (req, res) => {
  try {
    const fetchedResults = await SearchResults.findAll();
    return res.json(fetchedResults);
  } catch (error) {
    console.log("error :", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/:id", async (req, res) => {
  const resultID = req.params?.id ?? false;

  if (resultID) {
    try {
      const fetchedResult = await SearchResults.findByPk(resultID, {
        include: "body",
        required: false,
      });

      return res.json(fetchedResult);
    } catch (error) {
      console.log("error :", error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
});

module.exports = router;
