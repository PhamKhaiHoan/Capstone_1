// Auth Controller
const { responseSuccess, responseError } = require("../config/response");

const register = async (req, res) => {
  try {
    // TODO: Implement register logic
    responseSuccess(res, null, "Register successfully", 201);
  } catch (error) {
    responseError(res, error.message);
  }
};

const login = async (req, res) => {
  try {
    // TODO: Implement login logic
    responseSuccess(res, null, "Login successfully");
  } catch (error) {
    responseError(res, error.message);
  }
};

module.exports = { register, login };
