import { Middleware } from "redux";
import { loggingMiddleware } from "./loggingMiddleware";
import { unlinkFile, readFile, purgeFile } from "./fileHelpers";
import { getFilePath } from "./helpers";

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
export const getFileName = () => ({
  fileName: currentFileName,
  filePath: getFilePath(currentFileName),
});

/**
 * Function to setup the logging middleware.
 * @param {string[]} actionsToIgnore List of actions that need to be ignored to by the middleware.
 * @param {string[]} actionsToSkipPayload List of actions whose payload need to be ignored to by the middleware.
 * @param {string} [fileName] Name of the file where the logs are written. By default name is logs.
 * @returns {Middleware}
 */
export const setupLoggingMiddleware = (
  actionsToIgnore,
  actionsToSkipPayload,
  fileName = currentFileName
) => {
  setFileName(fileName);
  return loggingMiddleware(actionsToIgnore, actionsToSkipPayload, fileName);
};

/**
 * Function to delete the file.
 * @returns {Promise<any>}
 */
export const deleteFile = () => unlinkFile(currentFileName);

/**
 * Function that returns the file contents.
 * @param {('utf8' | 'base64' | 'ascii')} encoding
 */
export const getFileContent = (encoding = "utf8") =>
  readFile(encoding, currentFileName);

/**
 *
 * @param {number} [noOfDays] Number of days before the current date for which the content shoould be there. Default value is 2.
 * @returns {void}
 */
export const purgeFileContent = (noOfDays = 2) =>
  purgeFile(currentFileName, noOfDays);
