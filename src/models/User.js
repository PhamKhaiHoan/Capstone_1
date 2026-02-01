const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      nguoi_dung_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      mat_khau: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      ho_ten: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      tuoi: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      anh_dai_dien: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "nguoi_dung",
      timestamps: false,
    },
  );

  return User;
};
