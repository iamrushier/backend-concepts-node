import { promises as fs } from "fs";

export async function readFileAsync(path: string): Promise<string> {
  return await fs.readFile(path, "utf8");
}

export async function writeFileAsync(
  path: string,
  content: string
): Promise<void> {
  await fs.writeFile(path, content, "utf8");
}
