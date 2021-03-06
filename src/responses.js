const { publishToSNSSuccess, publishToSNSUnsuccessfull } = require('./publishSNSHelper');

const sendResponse = async (event, responseData) => {
  await publishToSNSSuccess({ ...event, ...responseData });
  return {
    statusCode: responseData.status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      location: responseData.headers ? responseData.headers.location : undefined,
    },
    body: JSON.stringify(responseData.body ? responseData.body : responseData),
    isBase64Encoded: false,
  };
};

const sendError = async (event, error) => {
  await publishToSNSUnsuccessfull({ ...event, ...error });
  return {
    statusCode: 502,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(error),
    isBase64Encoded: false,
  };
};

module.exports = {
  sendResponse,
  sendError,
};
