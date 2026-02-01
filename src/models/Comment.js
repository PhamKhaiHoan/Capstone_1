const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Comment = sequelize.define(
    "Comment",
    {
      binh_luan_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nguoi_dung_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "nguoi_dung",
          key: "nguoi_dung_id",
        },
      },
      hinh_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "hinh_anh",
          key: "hinh_id",
        },
      },
      ngay_binh_luan: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      noi_dung: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "binh_luan",
      timestamps: false,
    },
  );

  return Comment;
};
