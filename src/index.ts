// our-first-route.js


/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function index (fastify:any, options:any) {
    fastify.get('/index', async (request, reply) => {
      return { hello: '1333333333333333333' }
    })
  }
  
  //ESM
  export default index;
  