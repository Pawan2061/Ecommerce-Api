const Orders = require("../db/models/Orders");

const Cart = require("../db/models/Carts");

const addToOrder = async (req, res) => {
  try {
    const { id } = req.user;
    const cart = await Cart.findOne({ User: id });

    if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
      return res.status(400).json({ message: "No items in the cart" });
    }

    let totalAmount = 0;
    const orderItems = cart.cartItems.map((item) => {
      totalAmount += item.price * item.quantity;

      return {
        product: item.productId,
        quantity: item.quantity,
        amount: totalAmount,
      };
    });

    const order = new Orders({
      user: id,
      items: orderItems,
    });

    await order.save();

    res.status(200).json({
      message: "Order processed",
      Order: order,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { addToOrder };
