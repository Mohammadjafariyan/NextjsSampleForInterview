import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../util/hashPassword'


/* ----------------------------------- */
/* register */
/* ----------------------------------- */
async function register (fastify: any, options: any) {
    
/* ----------------------------------- */
/* configure posts on /register */
/* ----------------------------------- */
  fastify.post('/register', async (request, reply) => {

    
    /* ----------------------------------- */
    /* get data from body  */
    /* ----------------------------------- */
    const { username, password } = request.body

    // Hash the password
    const hashedPassword = await hashPassword(password)


    
    /* ----------------------------------- */
    /* log in debug  */
    /* ----------------------------------- */
    console.log('hashing... ->',request.body.password , hashedPassword)


  
    /* ----------------------------------- */
    /* db connection */
    /* ----------------------------------- */
    const prisma = new PrismaClient()

    
    /* ----------------------------------- */
    /* find user for dublicate check */
    /* ----------------------------------- */
    let user = await prisma.user.findFirst({
      where: { username: request.body.username  }
      
    })

    
    /* ----------------------------------- */
    /* if user found return failed */
    /* ----------------------------------- */
    if (user) {
      reply.send({
        message: 'another User with the same username is exists ',
        body: `Username: ${user.username}`
      })
      return
    }

    
    /* ----------------------------------- */
    /* if dublicate user not exists then go forward and create new user  */
    /* ----------------------------------- */
    user = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword
      }
    })


    
    /* ----------------------------------- */
    /* return success */
    /* ----------------------------------- */

    reply.send({
      message: 'User registered successfully',
      body: `Username: ${user.username}`
    })
  })
}

//ESM
export default register
