require("dotenv").config();
const cors = require("cors");

const express = require("express");
const connectDB = require("./db");
const eventRoutes = require("../routes/Event");

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(eventRoutes);
connectDB();

const server = app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});

server.on("error", (err) => {
  console.error("Server error:", err);
});
