// src/utils/cpuIntensive.ts
// Simulate real work
export function heavyComputation(iterations: number = 1000000): number {
  let result = 0;
  for (let i = 0; i < iterations; i++) {
    result += Math.sqrt(i) + Math.sin(i) + Math.cos(i);
  }
  return result;
}

// Simulate data processing
export function processData(size: number = 10000): string[] {
  const data: string[] = [];
  for (let i = 0; i < size; i++) {
    data.push(Buffer.from(String(i)).toString("base64"));
  }
  return data;
}

// Simulate password hashing
export function simulateHashing(rounds: number = 1000000): string {
  let hash = "initial";
  for (let i = 0; i < rounds; i++) {
    hash = Buffer.from(hash + i).toString("base64");
  }
  return hash;
}
