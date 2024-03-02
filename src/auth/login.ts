import { PrismaClient } from '@prisma/client'
import { hashPassword, verifyPassword } from '../util/hashPassword'

async function login (fastify: any, options: any) {
  fastify.post('/login', async (request, reply) => {
    
      

    const prisma = new PrismaClient()

    const user = await prisma.user.findFirst({
      where: {
        username: request.body.username 
      }
    })

    console.log('user:', user)

    const isPasswordCorrect = verifyPassword(request.body.password,user?.password);
    
    if (user && isPasswordCorrect) {
      const token = fastify.jwt.sign({ username: user.username })

      return {
        message: 'Login Successful',
        token: token
      }
    } else {
      return {
        message: 'Login Failed',
        token: null
      }
    }
  })
}

//ESM
export default login
