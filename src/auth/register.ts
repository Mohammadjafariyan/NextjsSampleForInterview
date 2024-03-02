import bcrypt from 'bcrypt'

// Utility function to hash passwords
async function hashPassword (password) {
  const saltRounds = 10
  return bcrypt.hash(password, saltRounds)
}

async function register (fastify: any, options: any) {
  fastify.post('/register', async (request, reply) => {
    const { username, password } = request.body

    // Hash the password
    const hashedPassword = await hashPassword(password)

    // In a real-world scenario, you would store the hashed password in a database
    // instead of logging it
    fastify.log.info(
      `Username: ${username}, Hashed Password: ${hashedPassword}`
    )

    reply.send({ message: 'User registered successfully',body:`Username: ${username}, Hashed Password: ${hashedPassword}` })
  })
}

//ESM
export default register
