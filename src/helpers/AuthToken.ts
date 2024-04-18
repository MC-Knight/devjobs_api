import jwt, { type JwtPayload, type Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class TokenAUth {
  static generateToken(data: { id: number; role: string }): string {
    const token = jwt.sign(data, process.env.JWT_ACCESS_KEY as Secret, {
      expiresIn: "24h",
    });

    return token;
  }

  static verifyToken(token: string): JwtPayload | string {
    try {
      const data = jwt.verify(token, process.env.JWT_ACCESS_KEY as Secret);
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Invalid token");
    }
  }
}

export { TokenAUth };
