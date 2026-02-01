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

// ===== Protected routes (Tất cả đều cần Token) =====
// Trang quản lý ảnh: Lấy thông tin user
userRouter.get("/get-info", verifyToken, getUserInfo);

// Trang quản lý ảnh: Lấy danh sách ảnh đã lưu theo user id
userRouter.get("/get-saved", verifyToken, getSavedImages);

// Trang quản lý ảnh: Lấy danh sách ảnh đã tạo theo user id
userRouter.get("/get-created", verifyToken, getCreatedImages);

// Trang chỉnh sửa thông tin cá nhân: Cập nhật thông tin
userRouter.put("/update-info", verifyToken, updateUserInfo);

// Trang chỉnh sửa thông tin cá nhân: Cập nhật ảnh đại diện
userRouter.put(
  "/update-avatar",
  verifyToken,
  upload.single("file"),
  updateAvatar,
);

module.exports = userRouter;
