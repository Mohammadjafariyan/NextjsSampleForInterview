import { PrismaClient } from '@prisma/client'
import { hashPassword, verifyPassword } from '../util/hashPassword'

// login users
async function login (fastify: any, options: any) {
  
    fastify.post('/login', async (request, reply) => {


    /* ----------------------------------- */
    /* db connection */
    /* ----------------------------------- */
    const prisma = new PrismaClient()

    

    /* ----------------------------------- */
    /* search for user */
    /* ----------------------------------- */
    const user = await prisma.user.findFirst({
      where: {
        username: request.body.username 
      }
    })

    

    /* ----------------------------------- */
    /* log */
    /* ----------------------------------- */
    console.log('user:', user)

    

    /* ----------------------------------- */
    /* if user is found and is password correct ?  */
    /* ----------------------------------- */
    const isPasswordCorrect = verifyPassword(request.body.password,user?.password);
    
    

    /* ----------------------------------- */
    /* if user is found and is password correct ?  */
    /* ----------------------------------- */
    if (user && isPasswordCorrect) {

        

    /* ----------------------------------- */
    /* sign in user */
    /* ----------------------------------- */
      const token = fastify.jwt.sign({ username: user.username })

      return {
        message: 'Login Successful',
        token: token
      }
    } else {

        
    /* ----------------------------------- */
    /* login failed */
    /* ----------------------------------- */
      return {
        message: 'Login Failed',
        token: null
      }
    }
  })
}

//ESM
export default login
