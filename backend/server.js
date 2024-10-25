import express from "express";
import dotenv from "dotenv";
import { connectiDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

const app = express();
const PORT = process.env.PORT || 5555;

dotenv.config();

app.use(express.json()); // allow us to accept JSON data in the req.body
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  connectiDB();
  console.log("Server started at http://localhost:5555");
});
