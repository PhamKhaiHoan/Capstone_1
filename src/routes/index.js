const express = require("express");
const authRoutes = require("./authRoutes");
const imageRoutes = require("./imageRoutes");
const userRoutes = require("./userRoutes");

const rootRoutes = express.Router();

rootRoutes.use("/auth", authRoutes);
rootRoutes.use("/images", imageRoutes);
rootRoutes.use("/users", userRoutes);

module.exports = rootRoutes;
