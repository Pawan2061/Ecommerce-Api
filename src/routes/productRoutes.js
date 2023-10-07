const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/ProductController");
const { checkRole } = require("../middleware/checkRole");
const { auth } = require("../middleware/jwtVerify");

router.use(auth);

router.post("/addProduct", checkRole("seller"), addProduct);
router.get("/getProduct", getProduct);
router.get("/getProductById/:id", getProductById);
router.put("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

module.exports = router;
