"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var querystring = require('querystring');

var aws = require('aws-sdk');

var uuidv4 = require('uuid/v4');

var Sudoku = require('./sudoku.class');

exports.handler =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(event, context) {
    var awsConfig, ddb, params, difficulty, game, safeMatrix, gameKey, ddbParams;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(event.httpMethod !== "POST")) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", {
              statusCode: 405,
              body: "Method Not Allowed"
            });

          case 2:
            awsConfig = new aws.Config({
              credentials: {
                accessKeyId: process.env.ENV_AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.ENV_AWS_SECRET_ACCESS_KEY
              },
              region: 'us-east-1'
            }); // Create the DynamoDB service object

            ddb = new aws.DynamoDB(awsConfig);
            params = querystring.parse(event.body);
            difficulty = params.difficulty || 0;
            game = new Sudoku();
            game.setLevel(difficulty);

            try {
              safeMatrix = JSON.stringify(game.matrix);
            } catch (stringifyError) {
              console.log(stringifyError);
            }

            gameKey = uuidv4();
            ddbParams = {
              TableName: 'sudoku-games',
              Item: {
                'game-id': gameKey,
                'game-board': safeMatrix,
                'game-hints-count': 0
              }
            };
            ddbParams.putItem(params, function (err, data) {
              var statusCode = 200;

              if (err) {
                statusCode = 400;
              }

              return _objectSpread({
                statusCode: statusCode,
                response: data
              }, gameKey ? {
                gameKey: gameKey
              } : {});
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();