import { User } from "shared";
import { db } from "../config/firebase-config";

export class UserRepository {
    private collection = db.collection("USERS")

    async createUser(uid: string, email: string, name: string = ""): Promise<User> {

        const newUser: User = {
            id: uid,
            email,
            name,
        };

        await this.collection.doc(uid).set(newUser);
        return newUser;
    }

    async getAllUsers(): Promise<User[]> {
        const snapshot = await this.collection.get()
        if (snapshot.empty) return []
        const users = snapshot.docs.map(doc => ({
            id: doc.id,
            ...(doc.data() as Omit<User, "id">),
        }));
        return users
    }

    async getUserById(id: string): Promise<User | null> {
        const userDoc = await this.collection.doc(id).get();
        const userData = userDoc.data() as User;
        return userData;
    }

    async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
        const userRef = this.collection.doc(id);
        await userRef.update(userData);
        return (await userRef.get()).data() as User;
    }

    async deleteUser(id: string) {
        await this.collection.doc(id).delete()
    }


}