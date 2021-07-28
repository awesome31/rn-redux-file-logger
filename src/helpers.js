import RNFS from "react-native-fs";
import moment from "moment";
import { ActionType } from "./loggingMiddleware";

/**
 * Function that creates the text that needs to be appended in the file.
 * @param {ActionType} action Action that needs to be logged.
 * @param {string} stateData The data in the peripheral state.
 * @returns {string}
 */
export const createFileText = (action, stateData) =>
  `${stateData}${prepareData(getCurrentDate())},${action.type},${prepareData(
    JSON.stringify(action.value ? action.value : action.payload || "")
  )},${prepareData(action.meta || "")},${prepareData(action.error || "")}\n`;

/**
 * Function that creates the file name.
 * @param {string} fileName Name of the file.
 * @returns {String}
 */
export const getFilePath = (fileName) =>
  `${RNFS.DocumentDirectoryPath}/${fileName}`;

/**
 * Function to prepare the data to put in the file by removing all commas.
 * @param {string} data
 */
export const prepareData = (data) => data.split(",").join(";");

/**
 * Function to get the current date in the YYYY-MM-DD HH:mm:ss format.
 * @returns {string}
 */
export const getCurrentDate = () =>
  moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

/**
 * Function to remove outdated row.
 * @param {Date} currentDate Current Date
 * @param {number} noOfDays Number of days before the current date for which the content shoould be there. Default value is 2.
 * @return {(acc: string, row: string) => string}
 */
export const removeOutdatedRow = (currentDate, noOfDays) => (acc, row) => {
  const columns = row.split(",");
  const rowDate = moment(columns[0]);
  const dateNow = moment(currentDate, "YYYY-MM-DD HH:mm:ss");

  if (dateNow.diff(rowDate, "days") >= noOfDays) {
    return acc;
  }
  return acc + row + "\n";
};

/**
 * Function that removes outdated content from the file.
 * @param {number} noOfDays Number of days before the current date for which the content shoould be there. Default value is 2.
 * @returns {(res: string) => string}
 */
export const removeOutdatedContent = (noOfDays) => (res) =>
  res
    .slice(0, -1)
    .split("\n")
    .reduce(removeOutdatedRow(new Date(), noOfDays), "");
