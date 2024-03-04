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
async function updateCounterCategory(fastify, options) {
    fastify.post('/category/updateCounter', {
        preHandler: fastify.auth([fastify.authenticate]),
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
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
                id: request.body.id,
                counter: request.body.counter
            };
            try {
                /* ----------------------------------- */
                /* db connection */
                /* ----------------------------------- */
                const prisma = new client_1.PrismaClient();
                /* ----------------------------------- */
                /* create new category */
                /* ----------------------------------- */
                // Update multiple records
                const updatedRecord = await prisma.category.update({
                    where: { id: model.id }, // Specify the condition to find the records you want to update
                    data: {
                        // Define the fields you want to update and their new values
                        counter: model.counter
                        // Add more fields as needed...
                    }
                });
                /* ----------------------------------- */
                /* return success */
                /* ----------------------------------- */
                return {
                    message: 'successfuly updated',
                    status: constants_1.ResponseStatusType.SUCCESS
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
        id: { type: 'number' },
        counter: { type: 'number' }
    },
    required: ['id', 'counter'],
    additionalProperties: false
};
// validate is a type guard for MyData - type is inferred from schema type
const validate = ajv.compile(schema);
//ESM
exports.default = updateCounterCategory;
