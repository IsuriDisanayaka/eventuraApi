const express = require("express");
const router = express.Router();
const userController = require("../controllers/User");

router.post("/google-login", userController.handleGoogleLogin);

module.exports = router;
