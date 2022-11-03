require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8000;
const DATABASE_URI = process.env.DATA_BASE;

const productRouter = require("./routes/product.route");
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
const cartRouter = require("./routes/cart.route");
const orderRouter = require("./routes/order.route");

app.use(express.json());
app.use(cors());

app.use("/api/products", productRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

mongoose
  .connect(DATABASE_URI)
  .then(() => {
    console.log("database connected");
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
