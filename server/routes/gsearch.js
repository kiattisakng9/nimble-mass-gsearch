const express = require("express");
const router = express.Router();
var request = require("request");

// Make a Google search and return the results body
router.get("/:search", async (req, res) => {
  const searchTerm = req.query?.query;

  try {
    request(
      {
        headers: { "Content-Type": "text/html; charset=UTF-8" },
        uri: `https://google.com/search?q=${searchTerm}&hl=en`,
        method: "GET",
      },
      function (error, response, body) {
        if (error)
          return res.status(500).json({ error: "Something went wrong" });

        res.json({ keyword: searchTerm, body, response });
      }
    );
  } catch (error) {
    console.log("error :", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
