const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./db/mongoClient"); 
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Serve static assets
app.use("/public", express.static(path.join(__dirname, "../frontend/public")));
app.use(express.static(path.join(__dirname, "../frontend")));

// Connect to MongoDB ()
connectDB().catch(err => {
  console.error("Failed to connect to MongoDB", err);
  process.exit(1); // Exit if DB connection fails
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Default route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
