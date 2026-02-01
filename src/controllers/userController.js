// User Controller
const { responseSuccess, responseError } = require("../config/response");

const getUsers = async (req, res) => {
  try {
    // TODO: Implement get users logic
    responseSuccess(res, [], "Get users successfully");
  } catch (error) {
    responseError(res, error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    // TODO: Implement get user by id logic
    responseSuccess(res, null, "Get user successfully");
  } catch (error) {
    responseError(res, error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    // TODO: Implement update user logic
    responseSuccess(res, null, "Update user successfully");
  } catch (error) {
    responseError(res, error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    // TODO: Implement delete user logic
    responseSuccess(res, null, "Delete user successfully");
  } catch (error) {
    responseError(res, error.message);
  }
};

module.exports = { getUsers, getUserById, updateUser, deleteUser };
