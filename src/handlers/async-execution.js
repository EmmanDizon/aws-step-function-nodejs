const { ExecutionToken } = require("../models/token");
const { SEND_TOKEN } = require("../common/constants/step-functions-constants");

const { StateMachineResponse } = require("../utils/state-machine-response");
const { StateMachineWorkflow } = require("../utils/state-machine-workflows");

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const { executionId } = body;
  const success = body.success;

  const token = await ExecutionToken.get(executionId);

  const stateMachine = new StateMachineWorkflow(token);

  success
    ? await stateMachine.execute(SEND_TOKEN.SUCCESS)
    : await stateMachine.execute(SEND_TOKEN.FAILED);

  token.delete();

  const stateMachineResponse = new StateMachineResponse(executionId);
  return await stateMachineResponse.render();
};
