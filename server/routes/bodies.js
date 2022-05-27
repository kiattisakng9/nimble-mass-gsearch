const express = require("express");
const router = express.Router();
const { ResultBody, SearchResults } = require("./../models");
const { body, validationResult } = require("express-validator");

// Check if search result ID exists in the database
const checkIfResultExists = (id) => {
  return SearchResults.findOne({ where: { id } }).then((result) => {
    if (!result) return Promise.reject("Search result does not exist");
  });
};

// Check if search result already have a result body in the database
const checkIfResultHaveABody = (id) => {
  return ResultBody.findAll({ where: { result_id: id } }).then((result) => {
    console.log("result :", result);
    if (result && result.length >= 1)
      return Promise.reject("Search result already have a body");
  });
};

// Get all bodies
router.get("/", async (req, res) => {
  try {
    // Fetch all result bodies
    const fetchedBodies = await ResultBody.findAll();
    return res.json(fetchedBodies);
  } catch (error) {
    console.log("error :", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// Get result body based on body ID passed
router.get("/:id", async (req, res) => {
  const bodyID = req.params?.id ?? false;

  if (bodyID) {
    try {
      // Fetch search result
      const fetchedBody = await ResultBody.findByPk(bodyID);

      return res.json(fetchedBody);
    } catch (error) {
      console.log("error :", error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
});

// Create a new result body
router.post(
  "/",
  body("result_id")
    .isInt()
    .not()
    .isEmpty()
    .trim()
    .escape()
    .custom(checkIfResultExists)
    .custom(checkIfResultHaveABody),
  body("body_html").not().isEmpty().trim().escape(),
  async (req, res) => {
    const errors = validationResult(req);

    // Request body validation errors
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array() });

    const inputBody = req.body ?? false;

    if (inputBody) {
      // Insert user into database
      const newResultBody = await ResultBody.create(inputBody);

      return res.json({
        id: newResultBody.id,
        message: "Result body created!",
      });
    } else return res.status(500).json({ error: "Something went wrong" });
  }
);
module.exports = router;
