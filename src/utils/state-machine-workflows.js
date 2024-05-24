const AWS = require("aws-sdk");
const stepFunctions = new AWS.StepFunctions();

const { ExecutionToken } = require("../models/token");
const { SEND_TOKEN } = require("../common/constants/step-functions-constants");

class StateMachineWorkflow {
  #executionId;
  #taskToken;

  constructor(event) {
    this.#executionId = event?.executionId;
    this.#taskToken = event?.taskToken;
  }
  async saveToken() {
    const options = { upsert: true };

    await ExecutionToken.update(
      { executionId: this.#executionId },
      { taskToken: this.#taskToken },
      options
    );
  }

  async execute(type) {
    const output = type === SEND_TOKEN.SUCCESS ? "{}" : undefined;

    await stepFunctions[type]({
      taskToken: this.#taskToken,
      output,
    }).promise();
  }
}

module.exports = { StateMachineWorkflow };
