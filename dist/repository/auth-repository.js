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
const firebase_config_1 = require("../config/firebase-config");
class AuthRepository {
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield firebase_config_1.auth.getUserByEmail(email);
        });
    }
    createUser(email, password, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRecord = yield firebase_config_1.auth.createUser({ email, password, displayName: name });
            return userRecord;
        });
    }
    updateAuthUser(id, authData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Object.keys(authData).length > 0) {
                yield firebase_config_1.auth.updateUser(id, authData);
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield firebase_config_1.auth.deleteUser(id);
        });
    }
}
exports.default = AuthRepository;
