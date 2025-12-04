import { promises as fs } from "fs";

export function readFilePromise(path: string): Promise<string> {
  return fs.readFile(path, "utf8");
}

export function writeFilePromise(path: string, content: string): Promise<void> {
  return fs.writeFile(path, content, "utf8");
}
