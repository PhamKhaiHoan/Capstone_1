// Entry point
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const { connectDB } = require("./config/db_connect");
const rootRoutes = require("./routes");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use("/public", express.static(path.join(__dirname, "../public")));

// Routes
app.use("/api", rootRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Capstone API!" });
});

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
};

startServer();
