// ESM
import Fastify from 'fastify'
import jwt from 'fastify-jwt'
import login from './src/auth/login'
import register from './src/auth/register'
import profile from './src/auth/profile'
import fastifyAuth from '@fastify/auth'

// -------------------------------------------------------------
// swagger
// -------------------------------------------------------------
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import index from './src'
import { config } from 'dotenv'
import { DebugModeSingleton } from './src/util/constants'
import { registerCategoryRoutes } from './src/category/category.register'

// Load environment variables from .env file
config()

// Define the port to listen on
const port = process.env.PORT || 3000 // Default port is 3000 if PORT is not defined in .env
const HOST = process.env.HOST || '0.0.0.0' // Default port is 3000 if PORT is not defined in .env

const swaggerOptions = {
  swagger: {
    info: {
      title: 'My Title',
      description: 'My Description.',
      version: '1.0.0'
    },
    host: `${HOST}:${port}`,
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [{ name: 'Default', description: 'Default' }]
  }
}

const swaggerUiOptions = {
  routePrefix: '/docs',
  exposeRoute: true
}
// -------------------------------------------------------------
// swagger end
// -------------------------------------------------------------

const app = Fastify({
  logger: true
})

// -------------------------------------------------------------
// swagger
// -------------------------------------------------------------

if (DebugModeSingleton.getInstance().isDebugMode() == false) {
  app.register(fastifySwagger, swaggerOptions)
  app.register(fastifySwaggerUi, swaggerUiOptions)
}

// -------------------------------------------------------------
// swagger end
// -------------------------------------------------------------

// Register the fastify-jwt plugin
app.register(jwt, { secret: 'supersecret' })
app.register(fastifyAuth)

app.register(profile)
app.register(login)
app.register(register)
app.register(index)


registerCategoryRoutes(app)


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
    await app.listen(port, HOST) // Bind to 0.0.0.0
  } catch (err) {
    app.log.error(err)

    process.exit(1)
  }
}
start()

export default app
