"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCategoryRoutes = void 0;
const category_create_1 = __importDefault(require("./category.create"));
const category_getall_1 = __importDefault(require("./category.getall"));
const category_getSingleByProperty_1 = __importDefault(require("./category.getSingleByProperty"));
const category_update_counter_1 = __importDefault(require("./category.update.counter"));
const category_delete_1 = __importDefault(require("./category.delete"));
function registerCategoryRoutes(app) {
    app.register(category_create_1.default);
    app.register(category_getall_1.default);
    app.register(category_getSingleByProperty_1.default);
    app.register(category_update_counter_1.default);
    app.register(category_delete_1.default);
}
exports.registerCategoryRoutes = registerCategoryRoutes;
