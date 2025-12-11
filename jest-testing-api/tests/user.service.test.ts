// tests/user.service.test.ts
// Unit test
import userService from "../src/services/user.service.js";
import { db } from "../src/utils/db.js";

describe("User Service Unit Tests", () => {
  beforeEach(() => {
    db.users = [];
  });

  it("should create a user", () => {
    const user = userService.create("Rushi", "rushi@test.com");
    expect(user).toHaveProperty("id");
    expect(user.name).toBe("Rushi");
    expect(db.users.length).toBe(1);
  });

  it("should return all users", () => {
    userService.create("A", "a@test.com");
    userService.create("B", "b@test.com");
    const users = userService.getAll();
    expect(users.length).toBe(2);
  });
});
