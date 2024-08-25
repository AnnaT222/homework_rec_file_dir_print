"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fs = require("node:fs/promises");
const path = require("node:path");
let givenPath;
const mainDirPath = path.resolve(__dirname, "..");
const inputDir = process.argv[2];
if (inputDir == undefined) {
    givenPath = mainDirPath;
}
else {
    givenPath = path.join(mainDirPath, inputDir);
}
function listDirsAndFiles(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const files = yield fs.readdir(dir, { withFileTypes: true });
            for (const file of files) {
                const currentFile = path.join(dir, file.name);
                if (file.isDirectory()) {
                    yield listDirsAndFiles(currentFile);
                }
                else {
                    console.log(`[FILE] ${path.parse(currentFile).name}`);
                }
            }
        }
        catch (err) {
            console.error("Error reading directory:", err);
        }
    });
}
listDirsAndFiles(givenPath);
