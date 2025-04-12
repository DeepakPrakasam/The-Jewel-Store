const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const connectDB = require("../db/mongoClient");

dotenv.config();

const router = express.Router();

router.post("/signup", async (req, res) => {
    const { name, email, mobile, password } = req.body;
    console.log("Signup data received:", req.body); 

    const db = await connectDB();
    const users = db.collection("users");

    const userExists = await users.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await users.insertOne({ name, email, mobile, password: hashedPassword });

    console.log("User inserted into DB");
    res.json({ message: "Signup successful" });
});


router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const db = await connectDB();
    const users = db.collection("users");

    const user = await users.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
});

module.exports = router;
