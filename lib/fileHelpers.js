"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purgeFile = exports.readFile = exports.unlinkFile = void 0;
const react_native_fs_1 = __importDefault(require("react-native-fs"));
const helpers_1 = require("./helpers");
/**
 * Function to delete the file.
 * @param {string} fileName Name of the file.
 * @returns {Promise<any>}
 */
const unlinkFile = (fileName) => react_native_fs_1.default.unlink(helpers_1.getFilePath(fileName))
    .then((res) => ({ res }))
    .catch((error) => ({ error }));
exports.unlinkFile = unlinkFile;
/**
 * Function that returns the file contents.
 * @param {('utf8' | 'base64' | 'ascii')} encoding Encoding for the read file operation.
 * @param {string} fileName Name of the file.
 */
const readFile = (encoding, fileName) => react_native_fs_1.default.readFile(helpers_1.getFilePath(fileName), encoding);
exports.readFile = readFile;
/**
 * Function to purge the file contents.
 * @param {string} fileName Name of the file.
 * @param {number} noOfDays Number of days before the current date for which the content shoould be there.
 * @return {void}
 */
const purgeFile = (fileName, noOfDays) => {
    exports.readFile("utf8", fileName)
        .then(helpers_1.removeOutdatedContent(noOfDays))
        .then((newContent) => react_native_fs_1.default.writeFile(helpers_1.getFilePath(fileName), newContent))
        .then(console.log)
        .catch((e) => {
        console.log("Error purging the file: ", e);
    });
};
exports.purgeFile = purgeFile;
