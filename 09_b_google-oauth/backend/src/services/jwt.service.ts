// src/services/jwt.service.ts
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import ms from "ms";

export class JwtService {
  static sign(payload: object) {
    return jwt.sign(payload, env.jwt.secret, {
      expiresIn: env.jwt.expires as ms.StringValue,
    });
  }
}
