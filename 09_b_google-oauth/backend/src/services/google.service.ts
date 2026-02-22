// src/services/google.service.ts
import axios from "axios";
import { env } from "../config/env.js";
import { URLSearchParams } from "url";

export class GoogleService {
  static getAuthUrl() {
    const root = "https://accounts.google.com/o/oauth2/v2/auth";
    const params = new URLSearchParams({
      client_id: env.google.clientId,
      redirect_uri: env.google.redirectUri,
      response_type: "code",
      scope: "openid email profile",
      prompt: "select_account",
    });
    return `${root}?${params.toString()}`;
  }

  static async getTokens(code: string) {
    const url = "https://oauth2.googleapis.com/token";
    const body = {
      code,
      client_id: env.google.clientId,
      client_secret: env.google.secret,
      redirect_uri: env.google.redirectUri,
      grant_type: "authorization_code",
    };

    const res = await axios.post(url, body, {
      headers: { "Content-Type": "application/json" },
    });

    return res.data;
  }

  static decodeIdToken(idToken: string) {
    const parts = idToken.split(".");
    if (parts.length !== 3 || !parts[1]) throw new Error("Invalid ID token");
    return JSON.parse(Buffer.from(parts[1], "base64").toString());
  }
}
