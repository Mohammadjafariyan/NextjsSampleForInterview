async function login (fastify: any, options: any) {
  fastify.post('/login', async (request, reply) => {
    const token = fastify.jwt.sign({ username: 'user123' })
    return {
      message: 'Login Successful',
      token: token
    }
  })
}

//ESM
export default login
