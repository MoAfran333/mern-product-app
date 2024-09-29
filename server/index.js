import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";
import productRouter from "./routes/product.route.js";

dotenv.config();

const app = express();

const __dirname = path.resolve();

const port = process.env.PORT || 5000;

app.use(express.json()); // Allows us to accept JSON data in the req.body
// Built-in Middleware to parse incoming JSON data

app.use("/api/products", productRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

app.listen(port, () => {
  connectDB();
  console.log(`Server started at http://localhost:${port}`);
});
