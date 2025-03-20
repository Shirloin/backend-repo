"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.db = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const env_config_1 = require("./env-config");
const isEmulator = env_config_1.FUNCTIONS_EMULATOR === "true";
const serviceAccount = {
    projectId: env_config_1.PROJECT_ID,
    privateKeyId: env_config_1.PRIVATE_KEY_ID,
    privateKey: env_config_1.PRIVATE_KEY === null || env_config_1.PRIVATE_KEY === void 0 ? void 0 : env_config_1.PRIVATE_KEY.replace(/\\n/g, "\n"),
    clientEmail: env_config_1.CLIENT_EMAIL,
    clientId: env_config_1.CLIENT_ID,
    authUri: env_config_1.AUTH_URI,
    tokenUri: env_config_1.TOKEN_URI
};
if (!firebase_admin_1.default.apps.length) {
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert(serviceAccount),
        projectId: env_config_1.PROJECT_ID
    });
    if (isEmulator) {
        process.env.FIREBASE_AUTH_EMULATOR_HOST = "localhost:9099";
        process.env.FIREBASE_FIRESTORE_EMULATOR_HOST = "localhost:8080";
        const db = firebase_admin_1.default.firestore();
        exports.db = db;
        db.settings({
            host: "localhost:8080",
            ssl: false
        });
    }
}
const db = firebase_admin_1.default.firestore();
exports.db = db;
const auth = firebase_admin_1.default.auth();
exports.auth = auth;
