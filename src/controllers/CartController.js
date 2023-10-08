const Carts = require("../db/models/Carts");
const Product = require("../db/models/product");

const addToCart = async (req, res) => {
  const id = req.body.id;
  const { productId, price } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("No such product found");
    }
    const cart = await Carts.findById(id);
    let newCart;

    if (!cart) {
      newCart = new Carts({
        user: id,
        cartItems: [{ product: productId, price: price }],
      });
      await newCart.save();
    }
    res.status(200).json({
      status: "success",
      message: "Product added to cart successfully",

      data: newCart,
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
const removeCart = async (req, res) => {};

module.exports = { addToCart };
