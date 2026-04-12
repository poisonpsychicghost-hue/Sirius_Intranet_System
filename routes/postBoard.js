const express = require('express');
const router = express.Router()
const postBoardController = require("../controllers/postBoardController");

//Route
router.get("/", postBoardController.getPostBoard);

module.exports = router;
