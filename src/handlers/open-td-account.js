const AWS = require("aws-sdk");
const stepfunctions = new AWS.StepFunctions();
const secrets = require("config-dug").default;

const { httpResponseCodes } = require("../utils/response-codes");
const { MESSAGE } = require("../common/constants/step-functions-constants");
const { success } = require("../services/aws/api-gateway-resp-util");

const { StateMachineWorkflow } = require("../utils/state-machine-workflows");

const startWorkflowExecution = async () => {
  const params = {
    stateMachineArn: secrets.STATE_MACHINE_ARN,
  };

  const startExecutionResponse = await stepfunctions
    .startExecution(params)
    .promise();

  const data = {
    message: MESSAGE.START_EXECUTION,
    executionId: startExecutionResponse.executionArn,
  };

  return success(data, httpResponseCodes.OPEN_TD_EXECUTION_START.value);
};

const ringfence = async (event) => {
  const stateMachine = new StateMachineWorkflow(event);

  await stateMachine.saveToken();
};

const openTdAccount = async (event) => {
  const stateMachine = new StateMachineWorkflow(event);

  await stateMachine.saveToken();
};

const transferFunds = async (event) => {
  const stateMachine = new StateMachineWorkflow(event);

  await stateMachine.saveToken();
};

const release = async (event) => {
  const stateMachine = new StateMachineWorkflow(event);

  await stateMachine.saveToken();
};

const stateErroHandler = async (event) => {
  return {
    statusCode: 400,
    body: JSON.stringify(event),
  };
};

module.exports = {
  ringfence,
  openTdAccount,
  transferFunds,
  release,
  startWorkflowExecution,
  stateErroHandler,
};
