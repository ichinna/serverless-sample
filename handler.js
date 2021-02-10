'use strict';

const { datadog, sendDistributionMetric } = require("datadog-lambda-js");
const bunyan = require('bunyan');
const log = bunyan.createLogger({
  name: 'sample',
  stream: process.stdout,
  level: 'debug'
});


const exec = async event => {
  sendDistributionMetric(
    "formulaExecution", // Metric name
    1,                      // Metric value
    "stage:dev",            // Associated tag
    "region:us-east-1",             // Another tag
    "service:sample"
  );

  log.debug({formulaExecutionsId: 1, formulaInstanceId: 2}, "This is execution invoke");

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.hello = datadog(exec);