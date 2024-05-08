require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected");
  } catch (err) {
    console.log(`DB_URL: ${process.env.DB_URL}`);
    console.error("DB connection error", err);
  }
};

module.exports = connectDB;
