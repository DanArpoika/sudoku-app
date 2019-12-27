import querystring from 'querystring';
import aws from 'aws-sdk';
import uuidv4 from 'uuid';
import Sudoku from './sudoku.class';

export const handler = (event, context, callback) => {
  if (event.httpMethod !== "POST") {
    return callback(
      null,
      {
        statusCode: 405,
        body: "Method Not Allowed",
      },
    );
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
  const name = params.name;
  const seconds = params.seconds;

  // const game = Sudoku();

  // game.setLevel(difficulty);

  // game.newGame();

  // let safeMatrix;
  // try {
  //   safeMatrix = JSON.stringify(game.matrix);
  // } catch (stringifyError) {
  //   return callback(stringifyError, null);
  // }

  const gameKey = uuidv4();
  const ddbParams = {
    TableName: 'sudoku-games',
    Item: {
      'game-id': { S: gameKey },
      'game-score': { S: `${seconds}` },
      'game-name': { S: name },
      'game-difficulty': { S: `${difficulty}` },
    }
  };

  ddb.putItem(ddbParams, (err, data) => {
    if (err) return callback(err, null);

    callback(
      null,
      {
        statusCode: 200,
        body: gameKey,
      }
    );
  });
}
