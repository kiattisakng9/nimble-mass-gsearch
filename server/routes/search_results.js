const express = require("express");
const router = express.Router();
const { SearchResults, Users } = require("./../models");
const { body, validationResult } = require("express-validator");

// Check if user ID exists in the database
const checkIfUserIDExists = async (id) => {
  return Users.findOne({ where: { id } }).then((user) => {
    if (!user) return Promise.reject("User does not exist");
  });
};

// Get all search results
router.get("/", async (req, res) => {
  try {
    // Fetch all search results
    const fetchedResults = await SearchResults.findAll();
    return res.json(fetchedResults);
  } catch (error) {
    console.log("error :", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// Get search result based on result ID passed
router.get("/:id", async (req, res) => {
  const resultID = req.params?.id ?? false;

  if (resultID) {
    try {
      // Fetch search result
      const fetchedResult = await SearchResults.findByPk(resultID, {
        include: "body",
        required: true,
      });

      return res.json(fetchedResult);
    } catch (error) {
      console.log("error :", error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
});

// Get search result based on user ID passed
router.get("/user/:id", async (req, res) => {
  const userID = req.params?.id;

  if (userID) {
    // Fetch search result of user ID passed
    const fetchedResults = await SearchResults.findAll({
      where: { user_id: userID },
      include: "body",
      required: true,
    });

    return res.json(fetchedResults);
  } else return res.status(500).json({ error: "Something went wrong" });
});

// Create a new search result
router.post(
  "/",
  body("keyword").not().isEmpty().trim().escape(),
  body("adwords_number").isInt().not().isEmpty().trim().escape(),
  body("links_number").isInt().not().isEmpty().trim().escape(),
  body("search_results_number").isInt().not().isEmpty().trim().escape(),
  body("user_id")
    .isInt()
    .not()
    .isEmpty()
    .trim()
    .escape()
    .custom(checkIfUserIDExists),
  async (req, res) => {
    const errors = validationResult(req);

    // Request body validation errors
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array() });

    const searchResultBody = req.body ?? false;

    if (searchResultBody) {
      // Insert user into database
      const newSearchResult = await SearchResults.create(searchResultBody);

      return res.json({
        id: newSearchResult.id,
        message: "Search Result created!",
      });
    } else return res.status(500).json({ error: "Something went wrong" });
  }
);

module.exports = router;
