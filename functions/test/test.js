import querystring from 'querystring';
import aws from 'aws-sdk';
import uuidv4 from 'uuid';
import Sudoku from './sudoku.class';

export const handler = async (event, context) => {
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

  console.log(difficulty)

  const game = Sudoku();

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
      'game-id': { S: gameKey },
      'game-board': { S: safeMatrix },
      'game-hints-count': { N: 0 },
    }
  };

  console.log(ddbParams);

  ddb.putItem(ddbParams, (err, data) => {
    let statusCode = 200;

    if (err) {
      console.log(err);
      statusCode = 400;
    }

    return {
      statusCode,
      response: data,
      ...(gameKey ? { gameKey } : {}),
    };
  });
}
