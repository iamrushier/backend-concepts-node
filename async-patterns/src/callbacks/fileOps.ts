// src/callbacks/fileOps.ts
import fs from "fs";

// Reads a file using callback-based async API.
export function readFileCallback(
  path: string,
  callback: (err: NodeJS.ErrnoException | null, data?: string) => void
) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) callback(err);
    callback(null, data);
  });
}

// Writes content to a file using callbacks.
export function writeFileCallback(
  path: string,
  content: string,
  callback: (err: NodeJS.ErrnoException | null) => void
) {
  fs.writeFile(path, content, "utf8", (err) => {
    callback(err);
  });
}
