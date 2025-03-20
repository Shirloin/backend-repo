
import admin from "firebase-admin";
import { AUTH_URI, CLIENT_EMAIL, CLIENT_ID, FUNCTIONS_EMULATOR, PRIVATE_KEY, PRIVATE_KEY_ID, PROJECT_ID, TOKEN_URI } from "./env-config";

const isEmulator = FUNCTIONS_EMULATOR === "true";


const serviceAccount = {
    projectId: PROJECT_ID,
    privateKeyId: PRIVATE_KEY_ID,
    privateKey: PRIVATE_KEY?.replace(/\\n/g, "\n"),
    clientEmail: CLIENT_EMAIL,
    clientId: CLIENT_ID,
    authUri: AUTH_URI,
    tokenUri: TOKEN_URI
};
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: PROJECT_ID
    });
    if (isEmulator) {
        process.env.FIREBASE_AUTH_EMULATOR_HOST = "localhost:9099";
        process.env.FIREBASE_FIRESTORE_EMULATOR_HOST = "localhost:8080";
        const db = admin.firestore();
        db.settings({
            host: "localhost:8080",
            ssl: false
        })
    }
}



const db = admin.firestore();
const auth = admin.auth();




export { db, auth, }