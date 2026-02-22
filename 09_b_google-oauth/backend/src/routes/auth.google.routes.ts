// src/routes/auth.google.routes.ts
import { Router } from "express";
import { GoogleService } from "../services/google.service.js";
import { JwtService } from "../services/jwt.service.js";

const router: Router = Router();

router.get("/google", (req, res) => {
  return res.redirect(GoogleService.getAuthUrl());
});

router.get("/google/callback", async (req, res) => {
  try {
    const code = req.query.code as string;
    if (!code) return res.status(400).json({ error: "Missing code" });
    const tokens = await GoogleService.getTokens(code);
    const profile = GoogleService.decodeIdToken(tokens.id_token);

    // Create app's own JWT
    const appToken = JwtService.sign({
      email: profile.email,
      name: profile.name,
      picture: profile.picture,
    });

    // return res.json({
    //   message: "Google login success",
    //   googleUser: profile,
    //   appToken,
    // });
    // instead of returning JSON
    return res.redirect(
      `http://localhost:5173?token=${appToken}`
    );
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: "Google login failed" });
  }
});
export default router;
