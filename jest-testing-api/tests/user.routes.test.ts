// tests/user.routes.test.ts
// Integration tests for routes
import request from "supertest";
import app from "../src/app.js";
import { db } from "../src/utils/db.js";

describe("User Routes Integration Tests", () => {
  beforeEach(() => {
    db.users = [];
  });

  it("GET /users should return empty list initially", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(0);
  });

  it("POST /users should create user", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Rushi", email: "rushi@test.com" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Rushi");

    const getRes = await request(app).get("/users");
    expect(getRes.body.length).toBe(1);
  });
});
