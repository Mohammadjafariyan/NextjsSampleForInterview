"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugModeSingleton = exports.ResponseStatusType = void 0;
var ResponseStatusType;
(function (ResponseStatusType) {
    ResponseStatusType[ResponseStatusType["SUCCESS"] = 0] = "SUCCESS";
    ResponseStatusType[ResponseStatusType["FAIL"] = 1] = "FAIL";
})(ResponseStatusType || (exports.ResponseStatusType = ResponseStatusType = {}));
class DebugModeSingleton {
    constructor() {
        this.DEBUG_MODE = false;
        // Private constructor to prevent instantiation from outside
    }
    static getInstance() {
        if (!DebugModeSingleton.instance) {
            DebugModeSingleton.instance = new DebugModeSingleton();
        }
        return DebugModeSingleton.instance;
    }
    isDebugMode() {
        return this.DEBUG_MODE;
    }
    setDebugMode(mode) {
        console.log('debug mode : ' + mode);
        this.DEBUG_MODE = mode;
    }
}
exports.DebugModeSingleton = DebugModeSingleton;
