const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
const dbName = "jewelleryShop";

async function connectDB() {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db(dbName);
}

module.exports = connectDB;
