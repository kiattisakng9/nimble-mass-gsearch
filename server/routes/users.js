const express = require("express");
const router = express.Router();
const { sequelize, Users } = require("./../models");

router.get("/", async (req, res) => {
  try {
    const fetchedUsers = await Users.findAll({
      include: "results",
      required: false,
    });
    return res.json(fetchedUsers);
  } catch (error) {
    console.log("error :", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/:id", async (req, res) => {
  const userID = req.params?.id ?? false;

  if (userID) {
    try {
      const fetchedUser = await Users.findByPk(userID, {
        include: "results",
        required: false,
      });

      return res.json(fetchedUser);
    } catch (error) {
      console.log("error :", error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
});

module.exports = router;
