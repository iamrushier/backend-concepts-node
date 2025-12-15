// src/services/readiness.service.ts
// Simulate readiness checks.
// Can add DB ping, Redis ping, External API check

export async function checkReadiness(): Promise<void> {
  const isDBConnected = Math.random() < 0.4;
  if (!isDBConnected) {
    throw new Error("DB not connected");
  }
}
