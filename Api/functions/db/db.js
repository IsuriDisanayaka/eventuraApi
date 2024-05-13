const mongoose = require("mongoose");
const functions = require("firebase-functions");

const dbUrl = functions.config().eventura.db_url;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
};
mongoose.connection.on("error", (err) => {
  console.error("Database connection error:", err);
});

mongoose.connection.on("connected", () => {
  console.log("Database connected successfully");
});

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl, options);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

module.exports = connectDB;
