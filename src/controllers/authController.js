const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { responseSuccess, responseError } = require("../config/response");

const login = async (req, res) => {
  try {
    const { email, mat_khau } = req.body;

    if (!email || !mat_khau) {
      return responseError(res, "Email và mật khẩu không được để trống", 400);
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return responseError(res, "Email không tồn tại", 400);
    }

    const checkPass = bcrypt.compareSync(mat_khau, user.mat_khau);
    if (!checkPass) {
      return responseError(res, "Mật khẩu không đúng", 400);
    }

    const token = jwt.sign(
      { id: user.nguoi_dung_id },
      process.env.JWT_SECRET || "hoan_secret_key_123",
      { expiresIn: "1d" },
    );

    const userData = {
      nguoi_dung_id: user.nguoi_dung_id,
      email: user.email,
      ho_ten: user.ho_ten,
      tuoi: user.tuoi,
      anh_dai_dien: user.anh_dai_dien,
    };

    return responseSuccess(
      res,
      { token, user: userData },
      "Đăng nhập thành công",
    );
  } catch (e) {
    return responseError(res, "Lỗi Server: " + e.message, 500);
  }
};

const signup = async (req, res) => {
  try {
    const { email, mat_khau, ho_ten, tuoi } = req.body;

    if (!email || !mat_khau) {
      return responseError(res, "Email và mật khẩu không được để trống", 400);
    }

    const checkUser = await User.findOne({ where: { email } });
    if (checkUser) {
      return responseError(res, "Email đã tồn tại", 400);
    }

    const hashPass = bcrypt.hashSync(mat_khau, 10);
    const newUser = await User.create({
      email,
      mat_khau: hashPass,
      ho_ten: ho_ten || "",
      tuoi: tuoi || null,
      anh_dai_dien: "",
    });

    return responseSuccess(
      res,
      { nguoi_dung_id: newUser.nguoi_dung_id },
      "Đăng ký thành công",
      201,
    );
  } catch (e) {
    return responseError(res, "Lỗi Server: " + e.message, 500);
  }
};

module.exports = { login, signup };
