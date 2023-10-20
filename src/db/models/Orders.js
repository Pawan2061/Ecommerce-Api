const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  orderedItems: [
    {
      productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 0,
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

const Orders = mongoose.model("Order", orderSchema);
module.exports = Orders;
