import { PrismaClient } from '@prisma/client'
import { hashPassword, verifyPassword } from '../util/hashPassword'

import Ajv, { JSONSchemaType } from 'ajv'
const ajv = new Ajv()

// login users
async function login (fastify: any, options: any) {
  fastify.post('/login', {
    schema: {
      body: {
        type: 'object',
        properties: {
          username: { type: 'string' },
          password: { type: 'string' }
        }
      },
      tags: ['auth'],
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            token: { type: ['string', 'null'] },
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
          message: 'Login Failed',
          token: null,
          validationErrors: validate.errors
        }
      }

      /* ----------------------------------- */
      /* db connection */
      /* ----------------------------------- */
      const prisma = new PrismaClient()

      /* ----------------------------------- */
      /* search for user */
      /* ----------------------------------- */
      const user = await prisma.user.findFirst({
        where: {
          username: request.body.username
        }
      })

      /* ----------------------------------- */
      /* log */
      /* ----------------------------------- */
      console.log('user:', user)

      /* ----------------------------------- */
      /* if user is found and is password correct ?  */
      /* ----------------------------------- */
      let isPasswordCorrect = false

      if (!user) {
        isPasswordCorrect = false
      } else {
        isPasswordCorrect = await verifyPassword(
          request.body.password,
          user?.password
        )
      }

      /* ----------------------------------- */
      /* if user is found and is password correct ?  */
      /* ----------------------------------- */
      if (user && isPasswordCorrect) {
        /* ----------------------------------- */
        /* sign in user */
        /* ----------------------------------- */
        const token = fastify.jwt.sign({ username: user.username })

        return {
          message: 'Login Successful',
          token: token
        }
      } else {
        /* ----------------------------------- */
        /* login failed */
        /* ----------------------------------- */
        return {
          message: 'Login Failed',
          token: null
        }
      }
    }
  })
}

interface MyData {
  username: string
  password: string
}

const schema: JSONSchemaType<MyData> = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' }
  },
  required: ['username', 'password'],
  additionalProperties: false
}

// validate is a type guard for MyData - type is inferred from schema type
const validate = ajv.compile(schema)

//ESM
export default login
