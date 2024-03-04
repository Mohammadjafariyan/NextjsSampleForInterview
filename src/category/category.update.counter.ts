import { PrismaClient } from '@prisma/client'
import Ajv, { JSONSchemaType } from 'ajv'
import { ResponseStatusType } from '../util/constants'
const ajv = new Ajv()

// login users
async function updateCounterCategory (fastify: any, options: any) {
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
        console.log(validate.errors)

        return {
          message: 'error',
          validationErrors: validate.errors
        }
      }

      let model: icategory = {
        id: request.body.id,
        counter: request.body.counter
      }

      try {
        /* ----------------------------------- */
        /* db connection */
        /* ----------------------------------- */
        const prisma = new PrismaClient()

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
        })

        /* ----------------------------------- */
        /* return success */
        /* ----------------------------------- */
        return {
          message: 'successfuly updated',
          status: ResponseStatusType.SUCCESS
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

interface icategory {
  id: number
  counter: number
  // id        :number ;
}

const schema: JSONSchemaType<icategory> = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    counter: { type: 'number' }
  },
  required: ['id', 'counter'],
  additionalProperties: false
}

// validate is a type guard for MyData - type is inferred from schema type
const validate = ajv.compile(schema)

//ESM
export default updateCounterCategory
