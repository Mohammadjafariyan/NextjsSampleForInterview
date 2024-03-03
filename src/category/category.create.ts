import { PrismaClient } from '@prisma/client'
import Ajv, { JSONSchemaType } from 'ajv'
import { ResponseStatusType } from '../util/constants'
const ajv = new Ajv()

// login users
async function createCategory (fastify: any, options: any) {
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
            id:{type:'number'},
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
        category: request.body.category,
        counter: request.body.counter,
        latitude: request.body.latitude,
        longitude: request.body.longitude
      }

      try {
        /* ----------------------------------- */
        /* db connection */
        /* ----------------------------------- */
        const prisma = new PrismaClient()

        /* ----------------------------------- */
        /* create new category */
        /* ----------------------------------- */
        const category = await prisma.category.create({
          data: model
        })

        /* ----------------------------------- */
        /* return success */
        /* ----------------------------------- */
        return {
          message: 'successfuly created',
          status: ResponseStatusType.SUCCESS,
          id:category.id
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
  latitude: number
  longitude: number
  category: string
  counter: number
  // id        :number ;
}

const schema: JSONSchemaType<icategory> = {
  type: 'object',
  properties: {
    latitude: { type: 'number' },
    longitude: { type: 'number' },
    category: { type: 'string' },
    counter: { type: 'number' }
  },
  required: ['category', 'counter'],
  additionalProperties: false
}

// validate is a type guard for MyData - type is inferred from schema type
const validate = ajv.compile(schema)

//ESM
export default createCategory
