const express = require("express");
const router = express.Router();
const { signUp, login, getUsers } = require("../controllers/UserController");

router.post("/signUp", signUp);

router.post("/login", login);
router.get("/getUsers", getUsers);

module.exports = router;
