// Khởi tạo models (init-models)
const { sequelize } = require("../config/db_connect");

// TODO: Import and initialize models here
// Example:
// const User = require('./User')(sequelize);
// const Image = require('./Image')(sequelize);

const initModels = () => {
  // Define associations here
  // Example:
  // User.hasMany(Image);
  // Image.belongsTo(User);
};

initModels();

module.exports = {
  sequelize,
  // Export models here
  // User,
  // Image,
};
