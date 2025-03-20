"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FUNCTIONS_EMULATOR = exports.TOKEN_URI = exports.AUTH_URI = exports.CLIENT_ID = exports.CLIENT_EMAIL = exports.PRIVATE_KEY = exports.PRIVATE_KEY_ID = exports.PROJECT_ID = exports.SECRET_KEY = exports.CREDENTIALS = exports.PORT = exports.NODE_ENV = void 0;
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
(0, dotenv_1.config)({ path: path_1.default.resolve(__dirname, "../.env.local") });
_a = process.env, exports.NODE_ENV = _a.NODE_ENV, exports.PORT = _a.PORT, exports.CREDENTIALS = _a.CREDENTIALS, exports.SECRET_KEY = _a.SECRET_KEY, exports.PROJECT_ID = _a.PROJECT_ID, exports.PRIVATE_KEY_ID = _a.PRIVATE_KEY_ID, exports.PRIVATE_KEY = _a.PRIVATE_KEY, exports.CLIENT_EMAIL = _a.CLIENT_EMAIL, exports.CLIENT_ID = _a.CLIENT_ID, exports.AUTH_URI = _a.AUTH_URI, exports.TOKEN_URI = _a.TOKEN_URI, exports.FUNCTIONS_EMULATOR = _a.FUNCTIONS_EMULATOR;
