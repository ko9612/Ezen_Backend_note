const express = require("express");
const router = express.Router();

// api/users/
router.get("/", (req, res) => {
  res.send(`<h1>USER</h1>`);
});

module.exports = router;
