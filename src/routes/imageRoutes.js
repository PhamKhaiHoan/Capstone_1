const express = require("express");
const { verifyToken } = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
  getImages,
  searchImages,
  getImageDetail,
  getComments,
  checkSaved,
  postComment,
  uploadImage,
  deleteImage,
  saveImage,
  unsaveImage,
} = require("../controllers/imageController");

const imageRouter = express.Router();

// ===== Public routes (không cần Token) =====
// Trang chủ: Lấy danh sách ảnh
imageRouter.get("/get-list", getImages);

// Trang chủ: Tìm kiếm ảnh theo tên
imageRouter.get("/search/:name", searchImages);

// Trang chi tiết: Lấy thông tin ảnh và người tạo
imageRouter.get("/detail/:id", getImageDetail);

// Trang chi tiết: Lấy bình luận theo id ảnh
imageRouter.get("/comments/:id", getComments);

// ===== Protected routes (cần Token) =====
// Trang chi tiết: Kiểm tra đã lưu ảnh chưa
imageRouter.get("/check-saved/:id", verifyToken, checkSaved);

// Trang chi tiết: Đăng bình luận
imageRouter.post("/comment", verifyToken, postComment);

// Trang chi tiết: Lưu ảnh
imageRouter.post("/save/:id", verifyToken, saveImage);

// Trang chi tiết: Hủy lưu ảnh
imageRouter.delete("/unsave/:id", verifyToken, unsaveImage);

// Trang thêm ảnh: Upload ảnh mới
imageRouter.post("/upload", verifyToken, upload.single("file"), uploadImage);

// Trang quản lý ảnh: Xóa ảnh đã tạo
imageRouter.delete("/:id", verifyToken, deleteImage);

module.exports = imageRouter;
