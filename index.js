const fs = require("node:fs/promises");
const path = require("node:path");

const startPath = __dirname;

async function listDirsAndFiles(dir) {
  try {
    const files = await fs.readdir(dir, { withFileTypes: true });
    for (const file of files) {
      const currentFile = path.join(dir, file.name);
      if (file.isDirectory()) {
        console.log(`[DIRECTORY] ${path.parse(currentFile).name}`);
        
        await listDirsAndFiles(currentFile);
      } else {
        console.log(`[FILE] ${path.parse(currentFile).name}`);
      }
    }
  } catch (err) {
    console.error("Error reading directory:", err);
  }
}

listDirsAndFiles(startPath);