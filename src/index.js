const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const { connectDB } = require("./config/db_connect");
const rootRoutes = require("./routes");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api", rootRoutes);

app.get("/api-info", (req, res) => {
  res.json({ message: "Welcome to Capstone API!" });
});

app.get("*", (req, res) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  }
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📱 Frontend: http://localhost:${PORT}`);
    console.log(`🔌 API: http://localhost:${PORT}/api`);
  });
};

startServer();
