const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const adminProductRoutes = require("./APP/routes/admin/ProductRouter");
const webProductRoutes = require("./APP/routes/web/ProductRouter");
const userRoutes = require("./APP/routes/admin/UserRouter");
const authRoutes = require("./APP/routes/web/AuthRouter");

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

//Routes
app.use("/api/wudzique/user", authRoutes);
app.use("/api/wudzique/admin/user", userRoutes);
app.use("/api/wudzique/admin/products", adminProductRoutes);
app.use("/api/wudzique/products", webProductRoutes);
app.get("/", (req, res) => {
  res.send("Wudzique Server is Running ✅");
});

//Connect to MongoDB
mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server is running on port : " + (process.env.PORT || 3000));
    });
  })
  .catch((err) => {
    console.log(err);
  });
