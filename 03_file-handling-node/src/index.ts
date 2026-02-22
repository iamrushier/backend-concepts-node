// file-handling-node/src/index.ts
import { readFile, writeFile, appendFile, unlink, copyFile } from "fs/promises";
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Getting filename and dirname as per ESM logic
console.log(__filename)
console.log(__dirname)


// Get absolute path to files
const oldFilePath = path.join(__dirname, "files", "sample.txt")
const newFilePath = path.join(__dirname, "files", "newFile.txt")
const copyFilePath = path.join(__dirname, "files", "copyFile.txt")
// async function for file handling logic
async function fileHandling() {

    //  readFile takes filepath and encoding, returns file content
    const content = await readFile(oldFilePath, "utf-8")
    console.log(content)

    //  writeFile takes filePath, textContent
    await writeFile(newFilePath, "Newly created file. Created at:" + Date.now())
    const newFileContent = await readFile(newFilePath, "utf-8")
    console.log(newFileContent)

    //  appendFile takes filePath, textContentToAppend
    await appendFile(newFilePath, "File updated at: " + Date.now())
    const updatedContent = await readFile(newFilePath, "utf-8")
    console.log(updatedContent)

    // copyFile takes sourceFilePath, destinationFilePath
    await copyFile(oldFilePath, copyFilePath)
    const copiedContent = await readFile(copyFilePath, "utf-8")
    console.log(copiedContent)

    //  unlink function takes filePath to be deleted
    await unlink(copyFilePath)
    console.log("copyFile deleted")

}

fileHandling()