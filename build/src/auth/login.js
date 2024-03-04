"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const hashPassword_1 = require("../util/hashPassword");
const ajv_1 = __importDefault(require("ajv"));
const ajv = new ajv_1.default();
// login users
async function login(fastify, options) {
    fastify.post('/login', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    username: { type: 'string' },
                    password: { type: 'string' }
                }
            },
            tags: ['auth'],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                        token: { type: ['string', 'null'] },
                        validationErrors: { type: 'string' }
                    }
                }
            }
        },
        handler: async (request, reply) => {
            /* ----------------------------------- */
            /* data validation */
            /* ----------------------------------- */
            if (!validate(request.body)) {
                // data is MyData here
                console.log(validate.errors);
                return {
                    message: 'Login Failed',
                    token: null,
                    validationErrors: validate.errors
                };
            }
            /* ----------------------------------- */
            /* db connection */
            /* ----------------------------------- */
            const prisma = new client_1.PrismaClient();
            /* ----------------------------------- */
            /* search for user */
            /* ----------------------------------- */
            const user = await prisma.user.findFirst({
                where: {
                    username: request.body.username
                }
            });
            /* ----------------------------------- */
            /* log */
            /* ----------------------------------- */
            console.log('user:', user);
            /* ----------------------------------- */
            /* if user is found and is password correct ?  */
            /* ----------------------------------- */
            let isPasswordCorrect = false;
            if (!user) {
                isPasswordCorrect = false;
            }
            else {
                isPasswordCorrect = await (0, hashPassword_1.verifyPassword)(request.body.password, user === null || user === void 0 ? void 0 : user.password);
            }
            /* ----------------------------------- */
            /* if user is found and is password correct ?  */
            /* ----------------------------------- */
            if (user && isPasswordCorrect) {
                /* ----------------------------------- */
                /* sign in user */
                /* ----------------------------------- */
                const token = fastify.jwt.sign({ username: user.username });
                return {
                    message: 'Login Successful',
                    token: token
                };
            }
            else {
                /* ----------------------------------- */
                /* login failed */
                /* ----------------------------------- */
                return {
                    message: 'Login Failed',
                    token: null
                };
            }
        }
    });
}
const schema = {
    type: 'object',
    properties: {
        username: { type: 'string' },
        password: { type: 'string' }
    },
    required: ['username', 'password'],
    additionalProperties: false
};
// validate is a type guard for MyData - type is inferred from schema type
const validate = ajv.compile(schema);
//ESM
exports.default = login;
