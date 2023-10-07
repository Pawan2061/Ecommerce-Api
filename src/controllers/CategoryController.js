const Category = require("../db/models/Category");
const Product = require("../db/models/product");
const checkRole = require("../middleware/checkRole");

const newCategory = async (req, res) => {
  const { name, productType } = req.body;
  if (!name) {
    res.status(404).send("No such category");
  }
  try {
    const newCategory = new Category({
      name: name,
      productType: productType,
    });

    await newCategory.save();

    return res.status(200).send(newCategory);
  } catch (error) {
    res.status(403).send(error.message);
  }
};

const getCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories: categories });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(400).send("No such category");
    }
    return res.status(200).send(category);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  newCategory,
  getCategoryById,
  getCategory,
};
