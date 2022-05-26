const express = require("express");
const router = express.Router();
const { sequelize, Users } = require("./../models");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  console.log("user_attributes :", req);
  const userBody = req.body ?? false;
  console.log("userBody :", userBody);

  if (userBody) {
    try {
      // Hash password
      const passwordHash = await bcrypt
        .hash("dummypassword", 10)
        .then((hash) => {
          return hash;
        })
        .catch((err) => {
          console.log(err);
        });

      // Insert user into database
      res.json({ ...userBody, passwordHash });
    } catch (error) {
      console.log("error :", error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
});

router.post("/login", async (req, res) => {
  console.log("user_attributes :", req);
  const userBody = req.body ?? false;

  if (userBody) {
    const email = userBody?.email ?? "";
    const password = userBody?.password ?? "";

    try {
      // Fetch user by email
      // Compare password

      // Return true if user is authenticated
      res.json({ ...userBody, passwordHash });
    } catch (error) {
      console.log("error :", error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
});

module.exports = router;
