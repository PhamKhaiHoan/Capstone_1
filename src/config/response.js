const responseSuccess = (res, data, message = "Success", statusCode = 200) => {
  return res.status(statusCode).json({
    statusCode,
    message,
    content: data,
    dateTime: new Date().toISOString(),
  });
};

const responseError = (res, message = "Error", statusCode = 500) => {
  return res.status(statusCode).json({
    statusCode,
    message,
    content: null,
    dateTime: new Date().toISOString(),
  });
};

module.exports = { responseSuccess, responseError };
