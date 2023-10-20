const router = require("express").Router();
const { addToOrder } = require("../controllers/OrderController");
// const auth = require("../middleware/jwtVerify");

router.post("/addOrder", addToOrder);

module.exports = router;
