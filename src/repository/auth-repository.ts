import { UserRecord } from "firebase-admin/auth";
import { auth } from "../config/firebase-config";
import admin from "firebase-admin";

export default class AuthRepository {

    async getUserByEmail(email: string): Promise<UserRecord> {
        return await auth.getUserByEmail(email)
    }

    async createUser(email: string, password: string, name: string): Promise<UserRecord> {
        const userRecord = await auth.createUser({ email, password, displayName: name })
        return userRecord
    }

    async updateAuthUser(id: string, authData: Partial<admin.auth.UpdateRequest>): Promise<void> {
        if (Object.keys(authData).length > 0) {
            await auth.updateUser(id, authData);
        }
    }

    async deleteUser(id: string) {
        await auth.deleteUser(id)
    }
}