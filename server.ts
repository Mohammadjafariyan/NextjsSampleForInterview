// ESM
import Fastify from 'fastify'



const app = Fastify({
  logger: true
})



app.get('/', async (request, reply) => {
  return { hello: 'world!!! thanks God' }
})
 
/**
 * Run the server!
 */
const start = async () => {
  try {
    await app.listen(3000, '0.0.0.0') // Bind to 0.0.0.0
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()


export default app