// src/load-test.ts
import http from "k6/http";
import { check, sleep } from "k6";

// Test settings
export const options = {
  stages: [
    { duration: "10s", target: 10 }, // Ramp to 10 users
    { duration: "20s", target: 50 }, // Ramp to 50 users
    { duration: "10s", target: 1000 }, // Ramp to 100 users
    { duration: "10s", target: 0 }, // Cool down
  ],
};

export default function () {
  const response = http.get("http://localhost:3000/tasks");
  check(response, { "status is 200": (r) => r.status === 200 }); // check
  sleep(1); // Wait 1 sec before next request
}
