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

imageRouter.get("/get-list", getImages);
imageRouter.get("/search/:name", searchImages);
imageRouter.get("/detail/:id", getImageDetail);
imageRouter.get("/comments/:id", getComments);

imageRouter.get("/check-saved/:id", verifyToken, checkSaved);
imageRouter.post("/comment", verifyToken, postComment);
imageRouter.post("/save/:id", verifyToken, saveImage);
imageRouter.delete("/unsave/:id", verifyToken, unsaveImage);
imageRouter.post("/upload", verifyToken, upload.single("file"), uploadImage);
imageRouter.delete("/:id", verifyToken, deleteImage);

module.exports = imageRouter;
