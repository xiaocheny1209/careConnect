const express = require("express");
const { findCenter } = require("../controller/search/search");
const router = express.Router();

router.get("/search", findCenter);

module.exports = router;
