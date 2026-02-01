const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const SaveImage = sequelize.define(
    "SaveImage",
    {
      nguoi_dung_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "nguoi_dung",
          key: "nguoi_dung_id",
        },
      },
      hinh_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "hinh_anh",
          key: "hinh_id",
        },
      },
      ngay_luu: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "luu_anh",
      timestamps: false,
    },
  );

  return SaveImage;
};
