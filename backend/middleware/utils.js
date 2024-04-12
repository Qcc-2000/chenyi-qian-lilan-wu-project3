import jwt from "jsonwebtoken";
const SECRET_KEY = "PASSWORD_SECRET_KEY";
const signToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY);
};

// Middleware function to verify a JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null; // Return null if verification fails
  }
};
export { signToken, verifyToken };
