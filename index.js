const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

const productsRoute = require("./routes/products");

dotenv.config();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("DataBase is connected"))
  .catch((err) => console.log(err));

const PORT = 5500;

app.use("/api/product", productsRoute);
app.listen(PORT, () => {
  console.log("App is running on Port Number :: " + PORT);
});
