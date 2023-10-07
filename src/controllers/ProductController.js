const Product = require("../db/models/product");

const addProduct = async (req, res) => {
  const { name, description, price, category } = req.body;
  try {
    if (!name || !description || !price) {
      return res.status(404).send("No such product exists");
    }

    const newProduct = new Product({
      name: name,
      description: description,
      price: price,
      category: category,
    });
    await newProduct.save();

    res.status(200).send(newProduct);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getProduct = async (req, res) => {
  try {
    const allProduct = await Product.find();
    res.status(200).json({ products: allProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "No such product exists" });
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { name, description, price } = req.body;
  try {
    const toBeUpdatedProduct = await Product.findById(id);
    if (!toBeUpdatedProduct) {
      return res.status(404).send("NO such product is available at the moment");
    }
    const newProduct = await Product.findByIdAndUpdate(id, {
      name: name,
      description: description,
      price: price,
    });

    res.status(200).json({ product: newProduct });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "No such product exists" });
    }
    res.status(200).json({ message: "product deleted", deletedProduct });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
