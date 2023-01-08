const express = require("express");
const userRoutes = express.Router();
const {
 userRegister,
 userLogin
} = require("../../controllers/users/userControllers");

userRoutes.post("/register", userRegister);
userRoutes.post("/login", userLogin);

module.exports = userRoutes;
