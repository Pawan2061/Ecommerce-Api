const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  cartItems: [
    {
      productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        type: Number,
        default: 0,
      },
    },
  ],
  User: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Cart", cartSchema);
