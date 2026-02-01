// Khởi tạo models (init-models)
const { sequelize } = require("../config/db_connect");

// Import models
const UserModel = require("./User");
const ImageModel = require("./Image");
const CommentModel = require("./Comment");
const SaveImageModel = require("./SaveImage");

// Initialize models with sequelize instance
const User = UserModel(sequelize);
const Image = ImageModel(sequelize);
const Comment = CommentModel(sequelize);
const SaveImage = SaveImageModel(sequelize);

// Define associations (quan hệ giữa các bảng)
const initModels = () => {
  // User - Image: 1 user có nhiều ảnh đã tạo
  User.hasMany(Image, { foreignKey: "nguoi_dung_id", as: "CreatedImages" });
  Image.belongsTo(User, { foreignKey: "nguoi_dung_id" });

  // User - Comment: 1 user có nhiều bình luận
  User.hasMany(Comment, { foreignKey: "nguoi_dung_id" });
  Comment.belongsTo(User, { foreignKey: "nguoi_dung_id" });

  // Image - Comment: 1 ảnh có nhiều bình luận
  Image.hasMany(Comment, { foreignKey: "hinh_id" });
  Comment.belongsTo(Image, { foreignKey: "hinh_id" });

  // User - SaveImage - Image: Many-to-Many (lưu ảnh)
  User.belongsToMany(Image, {
    through: SaveImage,
    foreignKey: "nguoi_dung_id",
    otherKey: "hinh_id",
    as: "SavedImages",
  });
  Image.belongsToMany(User, {
    through: SaveImage,
    foreignKey: "hinh_id",
    otherKey: "nguoi_dung_id",
    as: "SavedByUsers",
  });

  // Direct associations for SaveImage
  SaveImage.belongsTo(User, { foreignKey: "nguoi_dung_id" });
  SaveImage.belongsTo(Image, { foreignKey: "hinh_id" });
};

initModels();

module.exports = {
  sequelize,
  User,
  Image,
  Comment,
  SaveImage,
};
