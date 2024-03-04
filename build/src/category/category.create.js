"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const ajv_1 = __importDefault(require("ajv"));
const constants_1 = require("../util/constants");
const ajv = new ajv_1.default();
// login users
async function createCategory(fastify, options) {
    fastify.post('/category/create', {
        preHandler: fastify.auth([fastify.authenticate]),
        schema: {
            body: {
                type: 'object',
                properties: {
                    latitude: { type: 'number' },
                    longitude: { type: 'number' },
                    category: { type: 'string' },
                    counter: { type: 'number' }
                }
            },
            tags: ['category'],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        status: { type: 'number' },
                        message: { type: 'string' },
                        id: { type: 'number' },
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
                    message: 'error',
                    validationErrors: validate.errors
                };
            }
            let model = {
                category: request.body.category,
                counter: request.body.counter,
                latitude: request.body.latitude,
                longitude: request.body.longitude
            };
            try {
                /* ----------------------------------- */
                /* db connection */
                /* ----------------------------------- */
                const prisma = new client_1.PrismaClient();
                /* ----------------------------------- */
                /* create new category */
                /* ----------------------------------- */
                const category = await prisma.category.create({
                    data: model
                });
                /* ----------------------------------- */
                /* return success */
                /* ----------------------------------- */
                return {
                    message: 'successfuly created',
                    status: constants_1.ResponseStatusType.SUCCESS,
                    id: category.id
                };
            }
            catch (error) {
                return {
                    message: error,
                    status: constants_1.ResponseStatusType.FAIL
                };
            }
        }
    });
}
const schema = {
    type: 'object',
    properties: {
        latitude: { type: 'number' },
        longitude: { type: 'number' },
        category: { type: 'string' },
        counter: { type: 'number' }
    },
    required: ['category', 'counter'],
    additionalProperties: false
};
// validate is a type guard for MyData - type is inferred from schema type
const validate = ajv.compile(schema);
//ESM
exports.default = createCategory;
