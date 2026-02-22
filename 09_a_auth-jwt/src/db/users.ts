// src/db/users.ts
import type { User } from "../types/user.js";

export const users: User[] = [];
export let idCounter = 1;

export function getNextId() {
  return idCounter++; // The counter is mutated ONLY within this file
}
