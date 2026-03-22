import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key";

export function generateToken(userId: string, role: string) {
  return jwt.sign(
    {
      id: userId,
      role: role
    },
    JWT_SECRET,
    { expiresIn: "7d" } // token valid for 7 days
  );
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}