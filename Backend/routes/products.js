const express = require("express");
const connectDB = require("../db/mongoClient");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/gold", authenticateToken, async (req, res) => {
    const db = await connectDB();
    const goldProducts = await db.collection("gold").find().toArray();
    res.json(goldProducts);
});

router.get("/silver", authenticateToken, async (req, res) => {
    const db = await connectDB();
    const silverProducts = await db.collection("silver").find().toArray();
    res.json(silverProducts);
});

module.exports = router;
