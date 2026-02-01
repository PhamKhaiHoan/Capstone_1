const { User, Image, SaveImage } = require("../models");
const { responseSuccess, responseError } = require("../config/response");

// GET /api/users/get-info - Lấy thông tin user từ token (cần token)
const getUserInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["mat_khau"] },
    });

    if (!user) {
      return responseError(res, "Không tìm thấy người dùng", 404);
    }

    return responseSuccess(res, user, "Lấy thông tin user thành công");
  } catch (e) {
    return responseError(res, "Lỗi Server: " + e.message, 500);
  }
};

// GET /api/users/get-saved - Lấy danh sách ảnh đã lưu (cần token)
const getSavedImages = async (req, res) => {
  try {
    const userId = req.user.id;

    const savedImages = await SaveImage.findAll({
      where: { nguoi_dung_id: userId },
      include: [
        {
          model: Image,
          include: [
            {
              model: User,
              attributes: ["nguoi_dung_id", "ho_ten", "anh_dai_dien"],
            },
          ],
        },
      ],
      order: [["ngay_luu", "DESC"]],
    });

    // Map để lấy danh sách ảnh với thông tin ngày lưu
    const images = savedImages.map((item) => ({
      ...item.Image.dataValues,
      ngay_luu: item.ngay_luu,
    }));

    return responseSuccess(res, images, "Lấy danh sách ảnh đã lưu thành công");
  } catch (e) {
    return responseError(res, "Lỗi Server: " + e.message, 500);
  }
};

// GET /api/users/get-created - Lấy danh sách ảnh đã tạo (cần token)
const getCreatedImages = async (req, res) => {
  try {
    const userId = req.user.id;
    const images = await Image.findAll({
      where: { nguoi_dung_id: userId },
      include: [
        {
          model: User,
          attributes: ["nguoi_dung_id", "ho_ten", "anh_dai_dien"],
        },
      ],
      order: [["hinh_id", "DESC"]],
    });
    return responseSuccess(res, images, "Lấy danh sách ảnh đã tạo thành công");
  } catch (e) {
    return responseError(res, "Lỗi Server: " + e.message, 500);
  }
};

// PUT /api/users/update-info - Cập nhật thông tin cá nhân (cần token)
const updateUserInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    const { ho_ten, tuoi, anh_dai_dien } = req.body;

    // Tạo object chỉ chứa các field được gửi lên
    const updateData = {};
    if (ho_ten !== undefined) updateData.ho_ten = ho_ten;
    if (tuoi !== undefined) updateData.tuoi = tuoi;
    if (anh_dai_dien !== undefined) updateData.anh_dai_dien = anh_dai_dien;

    await User.update(updateData, { where: { nguoi_dung_id: userId } });

    // Lấy thông tin user sau khi cập nhật
    const updatedUser = await User.findByPk(userId, {
      attributes: { exclude: ["mat_khau"] },
    });

    return responseSuccess(res, updatedUser, "Cập nhật thông tin thành công");
  } catch (e) {
    return responseError(res, "Lỗi Server: " + e.message, 500);
  }
};

// PUT /api/users/update-avatar - Cập nhật ảnh đại diện (cần token + upload)
const updateAvatar = async (req, res) => {
  try {
    const userId = req.user.id;
    const file = req.file;

    if (!file) {
      return responseError(res, "Vui lòng chọn file ảnh", 400);
    }

    const anh_dai_dien = `/public/img/${file.filename}`;
    await User.update({ anh_dai_dien }, { where: { nguoi_dung_id: userId } });

    // Lấy thông tin user sau khi cập nhật
    const updatedUser = await User.findByPk(userId, {
      attributes: { exclude: ["mat_khau"] },
    });

    return responseSuccess(
      res,
      updatedUser,
      "Cập nhật ảnh đại diện thành công",
    );
  } catch (e) {
    return responseError(res, "Lỗi Server: " + e.message, 500);
  }
};

module.exports = {
  getUserInfo,
  getSavedImages,
  getCreatedImages,
  updateUserInfo,
  updateAvatar,
};
