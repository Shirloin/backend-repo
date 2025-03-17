import { FIREBASE_AUTH_URI, FIREBASE_CLIENT_EMAIL, FIREBASE_CLIENT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_PRIVATE_KEY_ID, FIREBASE_PROJECT_ID, FIREBASE_TOKEN_URI } from "./env-config";
import admin from "firebase-admin";



const serviceAccount = {
    projectId: FIREBASE_PROJECT_ID,
    privateKeyId: FIREBASE_PRIVATE_KEY_ID,
    privateKey: FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    clientEmail: FIREBASE_CLIENT_EMAIL,
    clientId: FIREBASE_CLIENT_ID,
    authUri: FIREBASE_AUTH_URI,
    tokenUri: FIREBASE_TOKEN_URI
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore();
const auth = admin.auth();

export { db, auth }