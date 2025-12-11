// src/services/user.service.ts
import { db } from "../utils/db.js";
import type { User } from "../models/user.model.js";

class UserService {
  getAll(): User[] {
    return db.users;
  }

  create(name: string, email: string): User {
    const newUser: User = {
      id: Date.now(),
      name,
      email,
    };
    db.users.push(newUser);
    return newUser;
  }
}

export default new UserService();
