const express = require("express");
const router = express.Router();
const { sequelize, ResultBody } = require("./../models");

router.get("/", async (req, res) => {
  try {
    const fetchedBodies = await ResultBody.findAll();
    return res.json(fetchedBodies);
  } catch (error) {
    console.log("error :", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/:id", async (req, res) => {
  const bodyID = req.params?.id ?? false;

  if (bodyID) {
    try {
      const fetchedBody = await Body.findByPk(bodyID);

      return res.json(fetchedBody);
    } catch (error) {
      console.log("error :", error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
});

module.exports = router;
