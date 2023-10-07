const express = require("express");
const router = express.Router();
const {
  newCategory,
  getCategoryById,
  getCategory,
} = require("../controllers/CategoryController");
const { checkRole } = require("../middleware/checkRole");
const { auth } = require("../middleware/jwtVerify");
router.use(auth)
router.post("/createCategory", checkRole("seller"), newCategory);
router.get("/getCategory/:id", getCategoryById);
router.get("/getCategories", getCategory);

module.exports = router;
