const express = require("express");

const router = express.Router();
const {
  addToCart,
  showCart,
  removeCart,
  updateCart,
} = require("../controllers/CartController");
const { auth } = require("../middleware/jwtVerify");

router.post("/addToCart", auth, addToCart);
router.get("/showCart", showCart);
router.delete("/removeCart/:id", removeCart);
router.put("/updateCart/:id", updateCart);

module.exports = router;
