/* ----------------------------------- */
/* get authenticated user info */
/* ----------------------------------- */
async function profile (fastify: any, options: any) {
  // Protected route to get user profile
  fastify.get(
    '/profile',
    { preHandler: fastify.auth([fastify.authenticate]) },

    async (request, reply) => {
      // Access user information from request
      const userProfile = request.user

      /* ----------------------------------- */
      /* return user info  */
      /* ----------------------------------- */
      reply.send({ profile: userProfile })
    }
  )
}

//ESM
export default profile
