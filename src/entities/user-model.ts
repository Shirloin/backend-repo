import { Timestamp, FieldValue } from "firebase-admin/firestore";

export interface User {
    id: string;
    email: string;
    name: string;
}
