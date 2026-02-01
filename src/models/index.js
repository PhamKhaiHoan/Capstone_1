const { sequelize } = require("../config/db_connect");

const UserModel = require("./User");
const ImageModel = require("./Image");
const CommentModel = require("./Comment");
const SaveImageModel = require("./SaveImage");

const User = UserModel(sequelize);
const Image = ImageModel(sequelize);
const Comment = CommentModel(sequelize);
const SaveImage = SaveImageModel(sequelize);

const initModels = () => {
  User.hasMany(Image, { foreignKey: "nguoi_dung_id", as: "CreatedImages" });
  Image.belongsTo(User, { foreignKey: "nguoi_dung_id" });

  User.hasMany(Comment, { foreignKey: "nguoi_dung_id" });
  Comment.belongsTo(User, { foreignKey: "nguoi_dung_id" });

  Image.hasMany(Comment, { foreignKey: "hinh_id" });
  Comment.belongsTo(Image, { foreignKey: "hinh_id" });

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
