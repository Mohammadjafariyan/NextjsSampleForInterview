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
async function deleteCategory(fastify, options) {
    fastify.post('/category/delete', {
        preHandler: fastify.auth([fastify.authenticate]),
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'number' }
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
                id: request.body.id
            };
            try {
                /* ----------------------------------- */
                /* db connection */
                /* ----------------------------------- */
                const prisma = new client_1.PrismaClient();
                /* ----------------------------------- */
                /* deletecategory */
                /* ----------------------------------- */
                const deletedCategory = await prisma.category.delete({
                    where: { id: model.id }, // Specify the condition to find the record you want to delete
                });
                /* ----------------------------------- */
                /* return success */
                /* ----------------------------------- */
                return {
                    message: 'successfuly created',
                    status: constants_1.ResponseStatusType.SUCCESS,
                    id: deletedCategory.id
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
        id: { type: 'number' }
    },
    required: ['id'],
    additionalProperties: false
};
// validate is a type guard for MyData - type is inferred from schema type
const validate = ajv.compile(schema);
//ESM
exports.default = deleteCategory;
