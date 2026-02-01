const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Image = sequelize.define(
    "Image",
    {
      hinh_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ten_hinh: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      duong_dan: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      mo_ta: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      nguoi_dung_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "nguoi_dung",
          key: "nguoi_dung_id",
        },
      },
    },
    {
      tableName: "hinh_anh",
      timestamps: false,
    },
  );

  return Image;
};
