const Enum = require("enum");

const httpResponseCodes = new Enum({
  OPEN_TD_EXECUTION_START: "OPEN_TD_EXECUTION_START",
});

module.exports = {
  httpResponseCodes,
};
