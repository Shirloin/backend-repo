import { config } from "dotenv";

config({ path: '.env' })
export const {
    NODE_ENV,
    PORT,
    FIREBASE_CREDENTIALS,
    SECRET_KEY,
    FIREBASE_PROJECT_ID,
    FIREBASE_PRIVATE_KEY_ID,
    FIREBASE_PRIVATE_KEY,
    FIREBASE_CLIENT_EMAIL,
    FIREBASE_CLIENT_ID,
    FIREBASE_AUTH_URI,
    FIREBASE_TOKEN_URI
} = process.env