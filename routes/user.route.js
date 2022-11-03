const express = require("express");
const UserController = require("../controllers/User.controller");
const { verifyTokenAndAthorization } = require("./verifyToken");

const router = express.Router();

router
  .route("/:userId")
  .get(verifyTokenAndAthorization, UserController.getUserById)
  .put(verifyTokenAndAthorization, UserController.updateUserById);

  
module.exports = router;
