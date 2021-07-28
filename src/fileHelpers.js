import RNFS from "react-native-fs";
import { getFilePath, removeOutdatedContent } from "./helpers";

/**
 * Function to delete the file.
 * @param {string} fileName Name of the file.
 * @returns {Promise<any>}
 */
export const unlinkFile = (fileName) =>
  RNFS.unlink(getFilePath(fileName))
    .then((res) => ({ res }))
    .catch((error) => ({ error }));

/**
 * Function that returns the file contents.
 * @param {('utf8' | 'base64' | 'ascii')} encoding Encoding for the read file operation.
 * @param {string} fileName Name of the file.
 */
export const readFile = (encoding, fileName) =>
  RNFS.readFile(getFilePath(fileName), encoding);

/**
 * Function to purge the file contents.
 * @param {string} fileName Name of the file.
 * @param {number} noOfDays Number of days before the current date for which the content shoould be there.
 * @return {void}
 */
export const purgeFile = (fileName, noOfDays) => {
  readFile("utf8", fileName)
    .then(removeOutdatedContent(noOfDays))
    .then((newContent) => RNFS.writeFile(getFilePath(fileName), newContent))
    .then(console.log)
    .catch((e) => {
      console.log("Error purging the file: ", e);
    });
};
