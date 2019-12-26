exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      body: `Hello, Dan`
    };
  }
};
