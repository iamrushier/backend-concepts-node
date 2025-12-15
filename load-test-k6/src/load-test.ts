// src/load-test.ts
import http from "k6/http";
import { check, sleep } from "k6";

// Test settings, 5 fake users for 10 sec
export const options = {
  vus: 5,
  duration: "10s",
};

export default function () {
  const response = http.get("http://localhost:3000/tasks");
  check(response, { "status is 200": (r) => r.status === 200 }); // check
  sleep(1); // Wait 1 sec before next request
}
