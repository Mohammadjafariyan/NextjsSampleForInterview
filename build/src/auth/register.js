"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const hashPassword_1 = require("../util/hashPassword");
const ajv_1 = __importDefault(require("ajv"));
const ajv = new ajv_1.default();
/* ----------------------------------- */
/* register */
/* ----------------------------------- */
async function register(fastify, options) {
    /* ----------------------------------- */
    /* configure posts on /register */
    /* ----------------------------------- */
    fastify.post('/register', {
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
                        token: { type: 'string' },
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
            /* get data from body  */
            /* ----------------------------------- */
            const { username, password } = request.body;
            // Hash the password
            const hashedPassword = await (0, hashPassword_1.hashPassword)(password);
            /* ----------------------------------- */
            /* log in debug  */
            /* ----------------------------------- */
            console.log('hashing... ->', request.body.password, hashedPassword);
            /* ----------------------------------- */
            /* db connection */
            /* ----------------------------------- */
            const prisma = new client_1.PrismaClient();
            /* ----------------------------------- */
            /* find user for dublicate check */
            /* ----------------------------------- */
            let user = await prisma.user.findFirst({
                where: { username: request.body.username }
            });
            /* ----------------------------------- */
            /* if user found return failed */
            /* ----------------------------------- */
            if (user) {
                reply.send({
                    message: 'another User with the same username is exists ',
                    body: `Username: ${user.username}`
                });
                return;
            }
            /* ----------------------------------- */
            /* if dublicate user not exists then go forward and create new user  */
            /* ----------------------------------- */
            user = await prisma.user.create({
                data: {
                    username: username,
                    password: hashedPassword
                }
            });
            /* ----------------------------------- */
            /* return success */
            /* ----------------------------------- */
            reply.send({
                message: 'User registered successfully',
                body: `Username: ${user.username}`
            });
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
exports.default = register;
