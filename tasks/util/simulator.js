"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.delay = exports.playSimulation = exports.provider = void 0;
var Game__factory_1 = require("./../../typechain-types/factories/Game__factory");
var ethers_1 = require("ethers");
var wallet_1 = require("@ethersproject/wallet");
var game_config_json_1 = require("../game.config.json");
// simulates a player movement by moving the player back and fourth
// this is the first step towards building simulation infrastructure
var PLAYER_PK = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";
exports.provider = new ethers_1.providers.StaticJsonRpcProvider(game_config_json_1["default"].RPC_URL);
var playSimulation = function () { return __awaiter(void 0, void 0, void 0, function () {
    var signer, gameContract;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                signer = new wallet_1.Wallet(PLAYER_PK, exports.provider);
                gameContract = Game__factory_1.Game__factory.connect(game_config_json_1["default"].GAME_ADDRESS, signer);
                console.log("Hello");
                console.log(gameContract);
                return [4 /*yield*/, exports.delay(1000)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.playSimulation = playSimulation;
exports.playSimulation();
var delay = function (ms) { return new Promise(function (res) { return setTimeout(res, ms); }); };
exports.delay = delay;
