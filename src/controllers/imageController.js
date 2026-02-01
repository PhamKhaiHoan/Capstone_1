// Image Controller
const { responseSuccess, responseError } = require("../config/response");

const getImages = async (req, res) => {
  try {
    // TODO: Implement get images logic
    responseSuccess(res, [], "Get images successfully");
  } catch (error) {
    responseError(res, error.message);
  }
};

const getImageById = async (req, res) => {
  try {
    // TODO: Implement get image by id logic
    responseSuccess(res, null, "Get image successfully");
  } catch (error) {
    responseError(res, error.message);
  }
};

const uploadImage = async (req, res) => {
  try {
    // TODO: Implement upload image logic
    responseSuccess(res, null, "Upload image successfully", 201);
  } catch (error) {
    responseError(res, error.message);
  }
};

const deleteImage = async (req, res) => {
  try {
    // TODO: Implement delete image logic
    responseSuccess(res, null, "Delete image successfully");
  } catch (error) {
    responseError(res, error.message);
  }
};

module.exports = { getImages, getImageById, uploadImage, deleteImage };
