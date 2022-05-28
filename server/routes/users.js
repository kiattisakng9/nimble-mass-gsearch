const express = require("express");
const router = express.Router();
const { Users } = require("./../models");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

// Check if passed email exists in the database
const checkExistingEmail = async (email) => {
  return Users.findOne({ where: { email } }).then((user) => {
    if (user) return Promise.reject("E-mail already in use");
  });
};

// Get all users
router.get("/", async (req, res) => {
  try {
    // Fetch all users
    const fetchedUsers = await Users.findAll();
    return res.json(fetchedUsers);
  } catch (error) {
    console.log("error :", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// Get user based on user ID passed
router.get("/:id", async (req, res) => {
  const userID = req.params?.id ?? false;

  if (userID) {
    try {
      // Fetch user
      const fetchedUser = await Users.findByPk(userID, {
        include: "results",
        required: false,
      });

      return res.json(fetchedUser);
    } catch (error) {
      console.log("error :", error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  } else return res.status(500).json({ error: "Something went wrong" });
});

// Register a new user
router.post(
  "/",
  body("first_name").not().isEmpty().trim().escape(),
  body("last_name").not().isEmpty().trim().escape(),
  body("email").isEmail().normalizeEmail().custom(checkExistingEmail),
  body("password").not().isEmpty().trim().escape(),
  async (req, res) => {
    const errors = validationResult(req);

    // Request body validation errors
    if (!errors.isEmpty()) return res.json({ error: errors.array() });

    const userBody = req.body ?? false;

    if (userBody) {
      const first_name = userBody?.first_name;
      const last_name = userBody?.last_name;
      const email = userBody?.email;
      const inputPassword = userBody?.password;

      try {
        // Hash password
        const passwordHash = await bcrypt
          .hash(inputPassword, 10)
          .then((hash) => {
            return hash;
          })
          .catch((err) => {
            console.log(err);
          });

        // Insert user into database
        const newUser = await Users.create({
          first_name,
          last_name,
          email,
          password: passwordHash,
        });

        return res.json({ id: newUser.id, message: "User created!" });
      } catch (error) {
        console.log("error :", error);
        return res.status(500).json({ error: "Something went wrong" });
      }
    } else return res.json({ error: "Something went wrong" });
  }
);

module.exports = router;
