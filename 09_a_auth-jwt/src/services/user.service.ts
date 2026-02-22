// src/services/user.service.ts
import bcrypt from "bcryptjs";
import { users, idCounter, getNextId } from "../db/users.js";
import type { User } from "../types/user.js";
export class UserService {
  static async register(
    email: string,
    password: string,
    role: "user" | "admin"
  ) {
    const exists = users.find((u) => u.email === email);
    if (exists) throw new Error("User already exists");
    const hashed = await bcrypt.hash(password, 10);
    const newUser: User = {
      id: getNextId(),
      email,
      password: hashed,
      role,
    };
    users.push(newUser);
    return newUser;
  }
  static async validateLogin(email: string, password: string) {
    const user = users.find((u) => u.email === email);
    if (!user) throw new Error("Invalid email or password");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid email or password");
    return user;
  }
}
