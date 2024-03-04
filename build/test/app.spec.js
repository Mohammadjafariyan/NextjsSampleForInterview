"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../server"));
const request = require('supertest');
/* ----------------------------------- */
/* app test*/
/* ----------------------------------- */
describe('GET /', function () {
    it('return json response', function () {
        return request(server_1.default.server)
            .get('/')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect('{"hello":"world!!! thanks God"}');
    });
});
