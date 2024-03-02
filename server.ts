// ESM
import Fastify from 'fastify'
import jwt from 'fastify-jwt'
import login from './src/auth/login'
import register from './src/auth/register'
import profile from './src/auth/profile'
import fastifyAuth from '@fastify/auth'



const app = Fastify({
  logger: true
})



// Register the fastify-jwt plugin
app.register(jwt, { secret: 'supersecret' })
app.register(fastifyAuth)

app.register(profile)
app.register(login)
app.register(register)

app.get('/', async (request, reply) => {
  return { hello: 'world!!! thanks God' }
})
 


// Decorate Fastify instance with authentication method
app.decorate('authenticate', async function (request, reply) {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.send(err)
  }
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