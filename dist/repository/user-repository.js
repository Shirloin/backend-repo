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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const firebase_config_1 = require("../config/firebase-config");
class UserRepository {
    constructor() {
        this.collection = firebase_config_1.db.collection("USERS");
    }
    createUser(uid_1, email_1) {
        return __awaiter(this, arguments, void 0, function* (uid, email, name = "") {
            const newUser = {
                id: uid,
                email,
                name,
            };
            yield this.collection.doc(uid).set(newUser);
            return newUser;
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const snapshot = yield this.collection.get();
            if (snapshot.empty)
                return [];
            const users = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
            return users;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDoc = yield this.collection.doc(id).get();
            const userData = userDoc.data();
            return userData;
        });
    }
    updateUser(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRef = this.collection.doc(id);
            yield userRef.update(userData);
            return (yield userRef.get()).data();
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.collection.doc(id).delete();
        });
    }
}
exports.UserRepository = UserRepository;
