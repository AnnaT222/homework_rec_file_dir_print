const fs = require("node:fs/promises");
const path = require("node:path");

let givenPath: string;
const mainDirPath: string = path.resolve(__dirname, "..");
const inputDir: string | undefined = process.argv[2];
if (inputDir == undefined) {
  givenPath = mainDirPath;
} else {
  givenPath = path.join(mainDirPath, inputDir);
}

async function listDirsAndFiles(dir: string | null): Promise<void> {
  try {
    const files = await fs.readdir(dir, { withFileTypes: true });
    for (const file of files) {
      const currentFile = path.join(dir, file.name);
      if (file.isDirectory()) {
        await listDirsAndFiles(currentFile);
      } else {
        console.log(`[FILE] ${path.parse(currentFile).name}`);
      }
    }
  } catch (err) {
    console.error("Error reading directory:", err);
  }
}

listDirsAndFiles(givenPath);