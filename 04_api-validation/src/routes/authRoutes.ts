import { Router } from "express";
import { validateBody } from "../middleware/validate.js";
import { userRegistrationSchema } from "../schemas/userSchema.js";

const router: Router = Router();

router.post("/register", validateBody(userRegistrationSchema), (req, res) => {
  const { username, email } = req.body;

  res.status(201).json({
    message: "User registration successful",
    user: { username, email },
  });
});

export default router;
