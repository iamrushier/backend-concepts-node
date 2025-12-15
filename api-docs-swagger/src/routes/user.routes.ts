// src/routes/user.routes.ts
import { Router } from "express";
const router: Router = Router();

/**
 * @openapi
 * /users:
 *  get:
 *   summary: Get all users
 *   description: Returns list of users
 *   responses:
 *    200:
 *     description: Successful response
 */
router.get("/", (req, res) => {
  res.json([
    { id: 1, name: "Rushi" },
    { id: 2, name: "Alex" },
  ]);
});

/**
 * @openapi
 * /users:
 *  post:
 *   summary: Create a user
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       required: [name]
 *       properties:
 *        name:
 *         type: string
 *   responses:
 *    201:
 *     description: User created
 */
router.post("/", (req, res) => {
  res.status(201).json({
    id: Date.now(),
    name: req.body.name,
  });
});

export default router;
