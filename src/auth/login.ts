


async function login (fastify:any, options:any) {
    fastify.get('/login', async (request, reply) => {
        const token = fastify.jwt.sign({ username: 'user123' })
        return { hello: token }
    })
  }
  
  //ESM
  export default login;
  