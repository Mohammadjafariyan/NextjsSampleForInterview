import { PrismaClient } from '@prisma/client'
import Ajv, { JSONSchemaType } from 'ajv'
import { ResponseStatusType } from '../util/constants'
const ajv = new Ajv()

// login users
async function getAllCategory (fastify: any, options: any) {
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
        const prisma = new PrismaClient()

        /* ----------------------------------- */
        /* create new category */
        /* ----------------------------------- */
        const categories = await prisma.category.findMany()

        /* ----------------------------------- */
        /* return success */
        /* ----------------------------------- */
        return {
          message: 'successfuly created',
          status: ResponseStatusType.SUCCESS,
          list:categories
        }
      } catch (error) {
        return {
          message: error,
          status: ResponseStatusType.FAIL,
          list:[]
        }
      }
    }
  })
}



//ESM
export default getAllCategory
