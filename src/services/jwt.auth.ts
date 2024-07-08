import { JWT_SECRET } from "../models/database/secrets";
import jwt from "jsonwebtoken";
import { TOKEN_EXPIRE, REFRESH_TOKEN_EXPIRE } from "../models/database/secrets";

export async function jwtToken(user: any) {
  const userForToken = { id: user.id, email: user.email, name: user.name };
  const token = jwt.sign(userForToken, JWT_SECRET || "", {
    expiresIn: TOKEN_EXPIRE,
  });
  return token;
}
export async function jwtRefreshToken(userid: any) {
  const userForToken = { id: userid };
  const refreshToken = jwt.sign(userForToken, JWT_SECRET || "", {
    expiresIn: REFRESH_TOKEN_EXPIRE,
  });
  return refreshToken;
}
