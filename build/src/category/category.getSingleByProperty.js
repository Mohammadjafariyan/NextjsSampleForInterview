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
async function getSingleByPropertyCategory(fastify, options) {
    fastify.get('/category/getSingleByProperty', {
        //  preHandler: fastify.auth([fastify.authenticate]),
        schema: {
            tags: ['category'],
            querystring: {
                type: 'object',
                properties: {
                    latitude: { type: 'number' },
                    longitude: { type: 'number' },
                    category: { type: 'string' },
                    id: { type: 'number' },
                    counter: { type: 'number' }
                },
                required: [] // Adjust required parameters as needed
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        status: { type: 'number' },
                        message: { type: 'string' },
                        single: { type: 'object' },
                        validationErrors: { type: 'string' }
                    }
                }
            }
        },
        handler: async (request, reply) => {
            /* ----------------------------------- */
            /* data validation */
            /* ----------------------------------- */
            const { latitude, longitude, category, counter, id } = request.query;
            const query = { latitude, longitude, category, counter, id };
            console.log('querystring:', query);
            // Remove undefined values from the query object
            const cleanedQuery = Object.fromEntries(Object.entries(query).filter(([_, v]) => v !== undefined));
            console.log('cleanedQuery:', cleanedQuery);
            try {
                /* ----------------------------------- */
                /* db connection */
                /* ----------------------------------- */
                const prisma = new client_1.PrismaClient();
                /* ----------------------------------- */
                /* create new category */
                /* ----------------------------------- */
                const category = await prisma.category.findFirst({
                    where: cleanedQuery
                });
                console.log('categories find first :', category);
                /* ----------------------------------- */
                /* return success */
                /* ----------------------------------- */
                return {
                    message: 'successfuly created',
                    status: constants_1.ResponseStatusType.SUCCESS,
                    single: category
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
//ESM
exports.default = getSingleByPropertyCategory;
