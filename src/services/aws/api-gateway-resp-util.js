const httpStatus = require("http-status");

module.exports.success = (data, code) => {
  const statusCode = httpStatus.OK;
  return {
    statusCode,
    body: JSON.stringify({
      status: statusCode,
      code,
      data,
    }),
  };
};
