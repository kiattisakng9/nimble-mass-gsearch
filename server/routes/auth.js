const express = require("express");
const router = express.Router();
const { Users } = require("./../models");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

// Authenticate user
router.post(
  "/login",
  body("email").isEmail().not().isEmpty().trim().escape(),
  body("password").not().isEmpty().trim().escape(),
  async (req, res) => {
    const errors = validationResult(req);

    // Request body validation errors
    if (!errors.isEmpty())
      return res.json({
        authenticated: false,
        message: "Incorrect login credentials",
      });

    const userBody = req.body ?? false;

    if (userBody) {
      const email = userBody?.email ?? "";
      const password = userBody?.password ?? "";

      try {
        // Fetch user by email
        const fetchedUser = await Users.scope("withPassword")
          .findOne({ where: { email } })
          .then((user) => {
            if (user) return user;
            else return false;
          });

        if (fetchedUser) {
          const fetchPassword = fetchedUser.password;

          // Compare password
          const passwordIsCorrect = await bcrypt
            .compare(password, fetchPassword)
            .then((result) => {
              return result;
            });

          // Return user info if user is authenticated
          const loginResult = passwordIsCorrect
            ? {
                authenticated: true,
                user: {
                  id: fetchedUser.id,
                  first_name: fetchedUser.first_name,
                  last_name: fetchedUser.last_name,
                  email: fetchedUser.email,
                },
                message: "Login Successful",
              }
            : { authenticated: false, message: "Incorrect login credentials" };

          return res.json(loginResult);
        }
        // User not found
        else
          return res.json({
            authenticated: false,
            message: "Incorrect login credentials",
          });
      } catch (error) {
        console.log("error :", error);
        return res.status(500).json({ error: "Something went wrong" });
      }
    } else return res.json({ error: "Something went wrong" });
  }
);

module.exports = router;
