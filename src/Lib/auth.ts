import bcrypt from "bcryptjs";

// Simulating a user database (Replace this with actual database)
const users = [
  {
    username: "admin",
    passwordHash: bcrypt.hashSync("admin321", 10), // Hashed password
  },
  {
    username: "user1",
    passwordHash: bcrypt.hashSync("password123", 10),
  },
];

// Verify the password using bcrypt
export async function verifyPassword(password: string, storedHash: string) {
  return bcrypt.compare(password, storedHash);
}

// Verify the credentials
export async function verifyCredentials(username: string, password: string) {
  const user = users.find((u) => u.username === username);
  if (!user) return false; // User not found

  return await verifyPassword(password, user.passwordHash);
}
