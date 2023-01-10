const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please Author is required"],
    },
    count: {
      type: Number,
      required: [true,"Product count is required"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    code:{
    type:Number,
    required:[true,"Product code is required"]
    },
    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2020/10/25/09/23/seagull-5683637_960_720.jpg",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }  
); 

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
