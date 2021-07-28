"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purgeFileContent = exports.getFileContent = exports.deleteFile = exports.setupLoggingMiddleware = exports.getFileName = void 0;
const loggingMiddleware_1 = require("./loggingMiddleware");
const fileHelpers_1 = require("./fileHelpers");
const helpers_1 = require("./helpers");
/**
 * @type {string}
 */
let currentFileName = "logs.csv";
/**
 * Function to set the file name.
 * @param {string} nameOfFile
 */
const setFileName = (nameOfFile) => {
    currentFileName = nameOfFile;
};
/**
 * Function to get the file name and the file path.
 * @returns {{fileName: string; filePath: string}}
 */
const getFileName = () => ({
    fileName: currentFileName,
    filePath: helpers_1.getFilePath(currentFileName),
});
exports.getFileName = getFileName;
/**
 * Function to setup the logging middleware.
 * @param {string[]} actionsToIgnore List of actions that need to be ignored to by the middleware.
 * @param {string[]} actionsToSkipPayload List of actions whose payload need to be ignored to by the middleware.
 * @param {string} [fileName] Name of the file where the logs are written. By default name is logs.
 * @returns {Middleware}
 */
const setupLoggingMiddleware = (actionsToIgnore, actionsToSkipPayload, fileName = currentFileName) => {
    setFileName(fileName);
    return loggingMiddleware_1.loggingMiddleware(actionsToIgnore, actionsToSkipPayload, fileName);
};
exports.setupLoggingMiddleware = setupLoggingMiddleware;
/**
 * Function to delete the file.
 * @returns {Promise<any>}
 */
const deleteFile = () => fileHelpers_1.unlinkFile(currentFileName);
exports.deleteFile = deleteFile;
/**
 * Function that returns the file contents.
 * @param {('utf8' | 'base64' | 'ascii')} encoding
 */
const getFileContent = (encoding = "utf8") => fileHelpers_1.readFile(encoding, currentFileName);
exports.getFileContent = getFileContent;
/**
 *
 * @param {number} [noOfDays] Number of days before the current date for which the content shoould be there. Default value is 2.
 * @returns {void}
 */
const purgeFileContent = (noOfDays = 2) => fileHelpers_1.purgeFile(currentFileName, noOfDays);
exports.purgeFileContent = purgeFileContent;
