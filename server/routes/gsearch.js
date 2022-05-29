const express = require("express");
const router = express.Router();
var request = require("request");

// Make a Google search and return the results body
router.get("/:search", async (req, res) => {
  const searchTerm = req.query?.query;

  try {
    request(
      `http://www.google.com/search?q=${searchTerm}`,
      function (error, response, body) {
        if (error)
          return res.status(500).json({ error: "Something went wrong" });

        res.send(body);
      }
    );
  } catch (error) {
    console.log("error :", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
