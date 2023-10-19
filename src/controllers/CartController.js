const Carts = require("../db/models/Carts");
const { decodedToken } = require("jsonwebtoken");

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

const showCart = async (req, res) => {
  try {
    const carts = await Carts.find();

    res.status(200).send(carts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const removeCart = async (req, res) => {
  const id = req.body.id;
  try {
    const removedCart = await Carts.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "cart removed successfully", product: removedCart });
  } catch (error) {}
};

const updateCart = async (req, res) => {
  const cart_id = req.params.id;
  try {
    const Cart = await Carts.findById(cart_id);

    if (!Cart) {
      return res.status(404).send("Cart not found!");
    }
    console.log(
      Cart.cartItems.find((item) => {
        console.log(item.quantity);
      })
    );
    const { productId, quantity } = req.body;

    const updatedCart = await Carts.findByIdAndUpdate(cart_id, {
      productId: req.body.productId,
      quantity: req.body.quantity,
    });

    const result = await res
      .status(200)
      .json({ message: "Cart updated successfully", newCart: updatedCart });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { addToCart, showCart, removeCart, updateCart };
