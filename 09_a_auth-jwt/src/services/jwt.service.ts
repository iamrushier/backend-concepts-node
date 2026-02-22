// src/services/jwt.service.ts
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import ms from "ms";

export class JwtService {
  static generateAccessToken(payload: object) {
    return jwt.sign(payload, env.accessSecret, {
      expiresIn: env.accessExpires as ms.StringValue,
    });
  }

  static generateRefreshToken(payload: object) {
    return jwt.sign(payload, env.refreshSecret, {
      expiresIn: env.refreshExpires as ms.StringValue,
    });
  }

  static verifyAccess(token: string) {
    return jwt.verify(token, env.accessSecret);
  }

  static verifyRefresh(token: string) {
    return jwt.verify(token, env.refreshSecret);
  }
}
