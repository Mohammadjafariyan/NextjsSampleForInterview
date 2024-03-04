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
async function getAllCategory(fastify, options) {
    fastify.get('/category/getall', {
        preHandler: fastify.auth([fastify.authenticate]),
        schema: {
            tags: ['category'],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        status: { type: 'number' },
                        message: { type: 'string' },
                        list: { type: 'array' },
                        validationErrors: { type: 'string' }
                    }
                }
            }
        },
        handler: async (request, reply) => {
            /* ----------------------------------- */
            /* data validation */
            /* ----------------------------------- */
            try {
                /* ----------------------------------- */
                /* db connection */
                /* ----------------------------------- */
                const prisma = new client_1.PrismaClient();
                /* ----------------------------------- */
                /* create new category */
                /* ----------------------------------- */
                const categories = await prisma.category.findMany();
                /* ----------------------------------- */
                /* return success */
                /* ----------------------------------- */
                return {
                    message: 'successfuly created',
                    status: constants_1.ResponseStatusType.SUCCESS,
                    list: categories
                };
            }
            catch (error) {
                return {
                    message: error,
                    status: constants_1.ResponseStatusType.FAIL,
                    list: []
                };
            }
        }
    });
}
//ESM
exports.default = getAllCategory;
