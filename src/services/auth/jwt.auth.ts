import { JWT_SECRET } from "../../models/database/secrets"; // Importing JWT_SECRET from secrets
import jwt from "jsonwebtoken"; // Importing jsonwebtoken library
import { TOKEN_EXPIRE, REFRESH_TOKEN_EXPIRE } from "../../models/database/secrets"; // Importing TOKEN_EXPIRE and REFRESH_TOKEN_EXPIRE from secrets

// Function to generate a JWT access token
export async function jwtToken(user: any) {
  const userForToken = { id: user.id, email: user.email, name: user.name }; // Creating payload for JWT token
  const token = jwt.sign(userForToken, JWT_SECRET || "", { // Signing the token with JWT_SECRET and setting expiration
    expiresIn: TOKEN_EXPIRE, // Setting expiration time for access token
  });
  return token; // Returning the generated access token
}

// Function to generate a JWT refresh token
export async function jwtRefreshToken(userid: any) {
  const userForToken = { id: userid }; // Creating payload for JWT refresh token
  const refreshToken = jwt.sign(userForToken, JWT_SECRET || "", { // Signing the token with JWT_SECRET and setting expiration
    expiresIn: REFRESH_TOKEN_EXPIRE, // Setting expiration time for refresh token
  });
  return refreshToken; // Returning the generated refresh token
}
