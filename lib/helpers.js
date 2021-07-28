"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeOutdatedContent = exports.removeOutdatedRow = exports.getCurrentDate = exports.prepareData = exports.getFilePath = exports.createFileText = void 0;
const react_native_fs_1 = __importDefault(require("react-native-fs"));
const moment_1 = __importDefault(require("moment"));
/**
 * Function that creates the text that needs to be appended in the file.
 * @param {ActionType} action Action that needs to be logged.
 * @param {string} stateData The data in the peripheral state.
 * @returns {string}
 */
const createFileText = (action, stateData) => `${stateData}${exports.prepareData(exports.getCurrentDate())},${action.type},${exports.prepareData(JSON.stringify(action.value ? action.value : action.payload || ""))},${exports.prepareData(action.meta || "")},${exports.prepareData(action.error || "")}\n`;
exports.createFileText = createFileText;
/**
 * Function that creates the file name.
 * @param {string} fileName Name of the file.
 * @returns {String}
 */
const getFilePath = (fileName) => `${react_native_fs_1.default.DocumentDirectoryPath}/${fileName}`;
exports.getFilePath = getFilePath;
/**
 * Function to prepare the data to put in the file by removing all commas.
 * @param {string} data
 */
const prepareData = (data) => data.split(",").join(";");
exports.prepareData = prepareData;
/**
 * Function to get the current date in the YYYY-MM-DD HH:mm:ss format.
 * @returns {string}
 */
const getCurrentDate = () => moment_1.default(new Date()).format("YYYY-MM-DD HH:mm:ss");
exports.getCurrentDate = getCurrentDate;
/**
 * Function to remove outdated row.
 * @param {Date} currentDate Current Date
 * @param {number} noOfDays Number of days before the current date for which the content shoould be there. Default value is 2.
 * @return {(acc: string, row: string) => string}
 */
const removeOutdatedRow = (currentDate, noOfDays) => (acc, row) => {
    const columns = row.split(",");
    const rowDate = moment_1.default(columns[0]);
    const dateNow = moment_1.default(currentDate, "YYYY-MM-DD HH:mm:ss");
    if (dateNow.diff(rowDate, "days") >= noOfDays) {
        return acc;
    }
    return acc + row + "\n";
};
exports.removeOutdatedRow = removeOutdatedRow;
/**
 * Function that removes outdated content from the file.
 * @param {number} noOfDays Number of days before the current date for which the content shoould be there. Default value is 2.
 * @returns {(res: string) => string}
 */
const removeOutdatedContent = (noOfDays) => (res) => res
    .slice(0, -1)
    .split("\n")
    .reduce(exports.removeOutdatedRow(new Date(), noOfDays), "");
exports.removeOutdatedContent = removeOutdatedContent;
