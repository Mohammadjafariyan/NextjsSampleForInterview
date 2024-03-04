import { PrismaClient } from '@prisma/client'
import Ajv, { JSONSchemaType } from 'ajv'
import { ResponseStatusType } from '../util/constants'
const ajv = new Ajv()

// login users
async function getSingleByPropertyCategory (fastify: any, options: any) {
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

      const { latitude, longitude, category, counter, id } = request.query

      const query = {latitude, longitude, category, counter, id  }

      console.log('querystring:',query);
    
    
      // Remove undefined values from the query object
      const cleanedQuery = Object.fromEntries(
        Object.entries(query).filter(([_, v]) => v !== undefined)
      )

      console.log('cleanedQuery:',cleanedQuery);

      try {
        /* ----------------------------------- */
        /* db connection */
        /* ----------------------------------- */
        const prisma = new PrismaClient()

        /* ----------------------------------- */
        /* create new category */
        /* ----------------------------------- */
        const category = await prisma.category.findFirst({
          where: cleanedQuery
        })


        console.log('categories find first :',category);
        /* ----------------------------------- */
        /* return success */
        /* ----------------------------------- */
        return {
          message: 'successfuly created',
          status: ResponseStatusType.SUCCESS,
          single: category
        }
      } catch (error) {
        return {
          message: error,
          status: ResponseStatusType.FAIL
        }
      }
    }
  })
}

//ESM
export default getSingleByPropertyCategory
