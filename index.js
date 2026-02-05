const express = require("express");
require('dotenv').config();
const connectDB = require('./config/db.js');
const productRoutes = require('./routes/ProductRoute.js');
const searchRoutes = require('./routes/SearchRoute.js');
const cors = require("cors")

const app = express();
const port = process.env.PORT || 8080
app.use(express.json());
app.use(cors())
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/search", searchRoutes);

connectDB();
app.listen(port, () => {
  console.log(`server is running at port http://localhost:${port}`)
})