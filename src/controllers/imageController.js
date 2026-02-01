const { Image, User, Comment, SaveImage } = require("../models");
const { Op } = require("sequelize");
const { responseSuccess, responseError } = require("../config/response");

const getImages = async (req, res) => {
  try {
    const data = await Image.findAll({
      include: [
        {
          model: User,
          attributes: ["nguoi_dung_id", "ho_ten", "anh_dai_dien"],
        },
      ],
      order: [["hinh_id", "DESC"]],
    });
    return responseSuccess(res, data, "Lấy danh sách ảnh thành công");
  } catch (e) {
    return responseError(res, "Lỗi Server: " + e.message, 500);
  }
};

const searchImages = async (req, res) => {
  try {
    const { name } = req.params;
    const data = await Image.findAll({
      where: { ten_hinh: { [Op.like]: `%${name}%` } },
      include: [
        {
          model: User,
          attributes: ["nguoi_dung_id", "ho_ten", "anh_dai_dien"],
        },
      ],
    });
    return responseSuccess(res, data, "Tìm kiếm thành công");
  } catch (e) {
    return responseError(res, "Lỗi Server: " + e.message, 500);
  }
};

const getImageDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Image.findOne({
      where: { hinh_id: id },
      include: [
        {
          model: User,
          attributes: ["nguoi_dung_id", "ho_ten", "anh_dai_dien"],
        },
      ],
    });

    if (!data) {
      return responseError(res, "Không tìm thấy ảnh", 404);
    }

    return responseSuccess(res, data, "Lấy thông tin ảnh thành công");
  } catch (e) {
    return responseError(res, "Lỗi Server: " + e.message, 500);
  }
};

const getComments = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Comment.findAll({
      where: { hinh_id: id },
      include: [
        {
          model: User,
          attributes: ["nguoi_dung_id", "ho_ten", "anh_dai_dien"],
        },
      ],
      order: [["ngay_binh_luan", "DESC"]],
    });
    return responseSuccess(res, data, "Lấy bình luận thành công");
  } catch (e) {
    return responseError(res, "Lỗi Server: " + e.message, 500);
  }
};

const checkSaved = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const isSaved = await SaveImage.findOne({
      where: { hinh_id: id, nguoi_dung_id: userId },
    });
    return responseSuccess(
      res,
      { saved: !!isSaved },
      "Kiểm tra lưu ảnh thành công",
    );
  } catch (e) {
    return responseError(res, "Lỗi Server: " + e.message, 500);
  }
};

const postComment = async (req, res) => {
  try {
    const { hinh_id, noi_dung } = req.body;
    const userId = req.user.id;

    if (!hinh_id || !noi_dung) {
      return responseError(res, "Thiếu thông tin bình luận", 400);
    }

    const image = await Image.findByPk(hinh_id);
    if (!image) {
      return responseError(res, "Ảnh không tồn tại", 404);
    }

    const newComment = await Comment.create({
      nguoi_dung_id: userId,
      hinh_id,
      noi_dung,
    });

    const commentWithUser = await Comment.findOne({
      where: { binh_luan_id: newComment.binh_luan_id },
      include: [
        {
          model: User,
          attributes: ["nguoi_dung_id", "ho_ten", "anh_dai_dien"],
        },
      ],
    });

    return responseSuccess(res, commentWithUser, "Bình luận thành công", 201);
  } catch (e) {
    return responseError(res, "Lỗi Server: " + e.message, 500);
  }
};

const uploadImage = async (req, res) => {
  try {
    const file = req.file;
    const { ten_hinh, mo_ta } = req.body;
    const userId = req.user.id;

    if (!file) {
      return responseError(res, "Vui lòng chọn file ảnh", 400);
    }

    const newImage = await Image.create({
      ten_hinh: ten_hinh || file.originalname,
      duong_dan: `/public/img/${file.filename}`,
      mo_ta: mo_ta || "",
      nguoi_dung_id: userId,
    });

    return responseSuccess(res, newImage, "Thêm ảnh thành công", 201);
  } catch (e) {
    return responseError(res, "Lỗi Server: " + e.message, 500);
  }
};

const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const img = await Image.findOne({
      where: { hinh_id: id, nguoi_dung_id: userId },
    });

    if (!img) {
      return responseError(
        res,
        "Không có quyền xóa hoặc ảnh không tồn tại",
        403,
      );
    }

    await Image.destroy({ where: { hinh_id: id } });
    return responseSuccess(res, null, "Đã xóa ảnh thành công");
  } catch (e) {
    return responseError(res, "Lỗi Server: " + e.message, 500);
  }
};

const saveImage = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const image = await Image.findByPk(id);
    if (!image) {
      return responseError(res, "Ảnh không tồn tại", 404);
    }

    const existingSave = await SaveImage.findOne({
      where: { hinh_id: id, nguoi_dung_id: userId },
    });

    if (existingSave) {
      return responseError(res, "Ảnh đã được lưu trước đó", 400);
    }

    await SaveImage.create({
      nguoi_dung_id: userId,
      hinh_id: id,
    });

    return responseSuccess(res, null, "Lưu ảnh thành công", 201);
  } catch (e) {
    return responseError(res, "Lỗi Server: " + e.message, 500);
  }
};

const unsaveImage = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const savedImage = await SaveImage.findOne({
      where: { hinh_id: id, nguoi_dung_id: userId },
    });

    if (!savedImage) {
      return responseError(res, "Ảnh chưa được lưu", 400);
    }

    await SaveImage.destroy({
      where: { hinh_id: id, nguoi_dung_id: userId },
    });

    return responseSuccess(res, null, "Hủy lưu ảnh thành công");
  } catch (e) {
    return responseError(res, "Lỗi Server: " + e.message, 500);
  }
};

module.exports = {
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
};
