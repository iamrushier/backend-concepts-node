// src/config/env.js
import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: Number(process.env.PORT || 4000),
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID!,
    secret: process.env.GOOGLE_CLIENT_SECRET!,
    redirectUri: process.env.GOOGLE_REDIRECT_URI!,
  },
  jwt: {
    secret: process.env.JWT_ACCESS_SECRET!,
    expires: process.env.ACCESS_EXPIRES_IN || "1h",
  },
};
