import { readFileCallback, writeFileCallback } from "./callbacks/fileOps.js";
import { readFilePromise, writeFilePromise } from "./promises/fileOps.js";
import { readFileAsync, writeFileAsync } from "./asyncAwait/fileOps.js";

const sampleFile = "./src/sample.txt";

console.log("\n=== Callback Version ===");

readFileCallback(sampleFile, (err, data) => {
  if (err) return console.error("Callback Read Err:", err);
  console.log("Callback read:", data);

  const newContent = data + "\n[Callback] file updated successfully";

  writeFileCallback(sampleFile, newContent, (err) => {
    if (err) return console.error("Callback Write Error:", err);
    console.log("Callback write: Success!");
  });
});

console.log("\n=== Promise Version ===");
readFilePromise(sampleFile)
  .then((data) => {
    console.log("Promise read:", data);
    const newContent = data + "\n[Promise] File updated!";
    return writeFilePromise(sampleFile, newContent);
  })
  .then(() => {
    console.log("Promise Write: Success!");
  })
  .catch((err) => {
    console.error("Promise Error:", err);
  });

console.log("\n=== Async/Await Version ===");

async function runAsyncAwaitDemo() {
  try {
    const data = await readFileAsync(sampleFile);
    console.log("Async/Await Read:", data);

    const newContent = data + "\n[Async/Await] File updated!";
    await writeFileAsync(sampleFile, newContent);

    console.log("Async/Await Write: Success!");
  } catch (err) {
    console.error("Async/Await Error:", err);
  }
}

runAsyncAwaitDemo();
