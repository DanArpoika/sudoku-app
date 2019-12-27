"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = void 0;

var _querystring = _interopRequireDefault(require("querystring"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _uuid = require("uuid");

var _sudoku = _interopRequireDefault(require("./sudoku.class"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }

  const awsConfig = new _awsSdk.default.Config({
    credentials: {
      accessKeyId: process.env.ENV_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.ENV_AWS_SECRET_ACCESS_KEY
    },
    region: 'us-east-1'
  }); // Create the DynamoDB service object

  const ddb = new _awsSdk.default.DynamoDB(awsConfig);

  const params = _querystring.default.parse(event.body);

  const difficulty = params.difficulty || 0;
  const game = new _sudoku.default();
  game.setLevel(difficulty);
  let safeMatrix;

  try {
    safeMatrix = JSON.stringify(game.matrix);
  } catch (stringifyError) {
    console.log(stringifyError);
  }

  const gameKey = (0, _uuid.uuidv4)();
  const ddbParams = {
    TableName: 'sudoku-games',
    Item: {
      'game-id': gameKey,
      'game-board': safeMatrix,
      'game-hints-count': 0
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
      ...(gameKey ? {
        gameKey
      } : {})
    };
  });
};

exports.handler = handler;