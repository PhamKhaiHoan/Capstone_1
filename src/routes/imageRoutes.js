// Image Routes
const express = require("express");
const router = express.Router();
const {
  getImages,
  getImageById,
  uploadImage,
  deleteImage,
} = require("../controllers/imageController");
const { verifyToken } = require("../middleware/auth");
const { upload } = require("../middleware/upload");

router.get("/", getImages);
router.get("/:id", getImageById);
router.post("/upload", verifyToken, upload.single("image"), uploadImage);
router.delete("/:id", verifyToken, deleteImage);

module.exports = router;
