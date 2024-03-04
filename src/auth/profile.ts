/* ----------------------------------- */
/* get authenticated user info */
/* ----------------------------------- */
async function profile (fastify: any, options: any) {
  // Protected route to get user profile
  fastify.get('/profile', {
    preHandler: fastify.auth([fastify.authenticate]),
    schema: {
      headers: {
        Authorization: {
          type: 'string'
        }
      },
      tags: ['index'],
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            token: { type: 'string' },
            validationErrors: { type: 'string' },
            profile: {
              type: 'object',
              properties: {
                username: { type: 'string' }
              }
            }
          }
        }
      }
    },

    handler: async (request, reply) => {
      // Access user information from request
      const userProfile = request.user

      /* ----------------------------------- */
      /* return user info  */
      /* ----------------------------------- */
      reply.send({ profile: userProfile })
    }
  })
}

//ESM
export default profile
