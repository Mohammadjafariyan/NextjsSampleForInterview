import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../util/hashPassword'

async function register (fastify: any, options: any) {
  fastify.post('/register', async (request, reply) => {
    const { username, password } = request.body

    // Hash the password
    const hashedPassword = await hashPassword(password)

    console.log('hashing... ->',request.body.password , hashedPassword)


    // In a real-world scenario, you would store the hashed password in a database
    // instead of logging it
    fastify.log.info(
      `fastify.log.info --> Username: ${username}, Hashed Password: ${hashedPassword}`
    )

    const prisma = new PrismaClient()

    let user = await prisma.user.findFirst({
      where: { username: request.body.username  }
      
    })

    if (user) {
      reply.send({
        message: 'another User with the same username is exists ',
        body: `Username: ${user.username}`
      })
      return
    }

    user = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword
      }
    })




    reply.send({
      message: 'User registered successfully',
      body: `Username: ${user.username}`
    })
  })
}

//ESM
export default register
