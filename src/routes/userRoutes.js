const express = require("express");
const { verifyToken } = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
  getUserInfo,
  getSavedImages,
  getCreatedImages,
  updateUserInfo,
  updateAvatar,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/get-info", verifyToken, getUserInfo);
userRouter.get("/get-saved", verifyToken, getSavedImages);
userRouter.get("/get-created", verifyToken, getCreatedImages);
userRouter.put("/update-info", verifyToken, updateUserInfo);
userRouter.put(
  "/update-avatar",
  verifyToken,
  upload.single("file"),
  updateAvatar,
);

module.exports = userRouter;
