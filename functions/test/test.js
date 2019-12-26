const querystring = require('querystring');
const aws = require('aws-sdk');
const uuidv4 = require('uuid/v4');
const Sudoku = require('./sudoku.class');

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const awsConfig = new aws.Config({
    credentials: {
      accessKeyId: process.env.ENV_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.ENV_AWS_SECRET_ACCESS_KEY,
    },
    region: 'us-east-1',
  });

  // Create the DynamoDB service object
  const ddb = new aws.DynamoDB(awsConfig);

  const params = querystring.parse(event.body);
  const difficulty = params.difficulty || 0;

  const game = new Sudoku();

  game.setLevel(difficulty);

  let safeMatrix;
  try {
    safeMatrix = JSON.stringify(game.matrix);
  } catch (stringifyError) {
    console.log(stringifyError);
  }

  const gameKey = uuidv4();
  const ddbParams = {
    TableName: 'sudoku-games',
    Item: {
      'game-id': gameKey,
      'game-board': safeMatrix,
      'game-hints-count': 0,
    }
  };

  ddbParams.putItem(params, (err, data) => {
    let statusCode = 200;

    if (err) {
      statusCode = 400;
    }

    return {
      statusCode,
      response: data,
      ...(gameKey ? { gameKey } : {}),
    };
  });
}
