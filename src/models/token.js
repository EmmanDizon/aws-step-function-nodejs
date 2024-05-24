const dynamoose = require("dynamoose");
const schema = new dynamoose.Schema({ executionId: String, taskToken: String });
const ExecutionToken = dynamoose.model("ExecutionToken", schema);

module.exports = { ExecutionToken };
