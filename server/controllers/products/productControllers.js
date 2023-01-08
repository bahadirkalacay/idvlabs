const Product = require("../../model/product/Product");
const expressAsyncHandler = require("express-async-handler");


//Create Product

const createProduct = expressAsyncHandler(async (req, res) => {
  const product = req.body;
  const { _id } = req.user;

  const newProduct = new Product({
    ...product,
    user: _id,
    image: req.file.filename,
  });
  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

// All Products

const getProducts = expressAsyncHandler(async (req, res) => {
  const hasCode = req.query.code;
  try {
    if (hasCode) {
      const products = await Product.find({ code: hasCode }).sort("-createdAt");
      res.json(products);
    } else {
      const products = await Product.find({}).sort("-createdAt");
      res.json(products);
    }
  } catch (error) {
    res.json(error);
  }
});

//Delete Product

const deleteProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  await Product.findByIdAndRemove(id);

  res.json({ message: "post deleted successfully" });
});

const getProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    await Product.findByIdAndUpdate(id, {
      new: true,
    });
    res.json(product);
  } catch (error) {
    res.json(error);
  }
});

//Update Product

const updateProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      {
        ...req.body,
        user: req.user?._id,
      },
      {
        new: true,
      }
    );
    res.json(product);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  getProduct,
};
