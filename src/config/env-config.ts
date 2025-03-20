import { config } from "dotenv";
import path from "path";

config({ path: path.resolve(__dirname, "../.env.local") })
export const {
    NODE_ENV,
    PORT,
    CREDENTIALS,
    SECRET_KEY,
    PROJECT_ID,
    PRIVATE_KEY_ID,
    PRIVATE_KEY,
    CLIENT_EMAIL,
    CLIENT_ID,
    AUTH_URI,
    TOKEN_URI,
    FUNCTIONS_EMULATOR
} = process.env