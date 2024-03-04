"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
// Utility function to hash passwords
async function hashPassword(password) {
    const saltRounds = 10;
    let hash = bcrypt_1.default.hash(password, saltRounds);
    return hash;
}
exports.hashPassword = hashPassword;
// Verifying a password
async function verifyPassword(password, hashedPassword) {
    return await bcrypt_1.default.compare(password, hashedPassword);
}
exports.verifyPassword = verifyPassword;
