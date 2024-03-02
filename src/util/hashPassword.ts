import bcrypt from 'bcrypt';

// Utility function to hash passwords

export async function hashPassword(password) {
    const saltRounds = 10;

    let hash= bcrypt.hash(password, saltRounds);
    return hash;
}


// Verifying a password
export async function verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}