const express = require("express");
const {
  createProduct,
  getProducts,
  deleteProduct,
  getProduct,
  updateProduct
} = require("./../../controllers/products/productControllers");
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const {
  photoUpload,
  productImgResize,
} = require("../../middlewares/upload/photoUpload");

const productRoutes = express.Router();

productRoutes.post(
  "/",
  authMiddleware,
  photoUpload.single("image"),
  productImgResize,
  createProduct
);
productRoutes.get("/", authMiddleware, getProducts);
productRoutes.delete("/:id",authMiddleware, deleteProduct);
productRoutes.get("/:id",authMiddleware, getProduct);
productRoutes.put("/:id",authMiddleware, updateProduct);

module.exports = productRoutes;
