const express = require('express');
const router = express.Router()
const mainPageController = require("../controllers/mainPageController");

//Route
router.get("/", mainPageController.getPostBoard);

module.exports = router;
