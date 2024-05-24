const AWS = require("aws-sdk");
const stepFunctions = new AWS.StepFunctions();

const {
  STATUS,
  MESSAGE,
} = require("../common/constants/step-functions-constants");

class StateMachineResponse {
  #executionId;

  constructor(executionId) {
    this.#executionId = executionId;
  }
  #body(status) {
    const body =
      status === STATUS.SUCCESS
        ? JSON.stringify({
            status: 200,
            message: MESSAGE.OPEN_TD_SUCCESS,
          })
        : undefined;

    return {
      statusCode: 200,
      body,
    };
  }

  async render() {
    try {
      const { status } = await stepFunctions
        .describeExecution({ executionArn: this.#executionId })
        .promise();

      return this.#body(status);
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = { StateMachineResponse };
