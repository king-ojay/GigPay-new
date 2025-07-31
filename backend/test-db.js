// backend/test-db.js - Run this to test your MongoDB connection
const mongoose = require("mongoose");
require("dotenv").config();

console.log("Testing MongoDB connection...");
console.log("MONGO_URI:", process.env.MONGO_URI ? "✅ Found" : "❌ Missing");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
})
.then(() => {
  console.log("✅ MongoDB connected successfully!");
  console.log("Database name:", mongoose.connection.name);
  console.log("Connection state:", mongoose.connection.readyState);
  process.exit(0);
})
.catch((err) => {
  console.error("❌ MongoDB connection failed:");
  console.error("Error:", err.message);
  process.exit(1);
});