const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const dbConnect = require("./config/db/dbConnect");
const path = require("path");
const userRoutes = require("./route/users/userRoutes");
const productRoutes = require("./route/products/productRoutes");

dotenv.config();
dbConnect();

app.use(express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.get("/", (req, res) => {
  res.send("Welcome");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running ${PORT}`));
