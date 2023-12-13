import jwt from "jsonwebtoken";
import { envs } from "./envs";

interface UserToken {
  id: string;
  name: string;
  email: string;
}

export class JwtAdapter {
  static async generateJwt(
    user: UserToken,
    duration: string = "2h"
  ): Promise<string | null> {
    
    const { name, email, id} = user;
    return new Promise((resolve) => {
      jwt.sign(
        {
          name,
          email,
          id
        },
        envs.JWT_SECRET,
        { expiresIn: duration },
        (error, token) => {
          if (error) return resolve(null);

          return resolve(token!);
        }
      );
    });
  }
}
