import { PrismaClient } from '@prisma/client'
import Ajv, { JSONSchemaType } from 'ajv'
import { ResponseStatusType } from '../util/constants'
const ajv = new Ajv()

// login users
async function deleteCategory (fastify: any, options: any) {
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
        console.log(validate.errors)

        return {
          message: 'error',
          validationErrors: validate.errors
        }
      }

      let model: icategory = {
        id: request.body.id
      }

      try {
        /* ----------------------------------- */
        /* db connection */
        /* ----------------------------------- */
        const prisma = new PrismaClient()

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
          status: ResponseStatusType.SUCCESS,
          id:deletedCategory.id
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
}

const schema: JSONSchemaType<icategory> = {
  type: 'object',
  properties: {
    id: { type: 'number' }
  },
  required: [ 'id'],
  additionalProperties: false
}

// validate is a type guard for MyData - type is inferred from schema type
const validate = ajv.compile(schema)

//ESM
export default deleteCategory
