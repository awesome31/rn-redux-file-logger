"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingMiddleware = exports.getActionData = exports.putDataInState = void 0;
const react_native_fs_1 = __importDefault(require("react-native-fs"));
const helpers_1 = require("./helpers");
const PeripheralState_1 = require("./PeripheralState");
/**
 * @typedef {(actionsToIgnore: string[], actionsToSkipPayload: string[], fileName: string) => Middleware} LoggingMiddlewareType
 */
/**
 * @typedef {object} ActionType
 * @property {string} type
 * @property {any} [payload]
 * @property {string} [meta]
 * @property {string} [error]
 * @property {any} [value]
 */
/**
 * @param {ActionType} action
 * @returns
 */
const putDataInState = (action) => () => PeripheralState_1.state.addData(helpers_1.createFileText(action, ""));
exports.putDataInState = putDataInState;
/**
 *
 * @param {string[]} actionToSkipPayload
 * @param {ActionType} action
 * @return {ActionType}
 */
const getActionData = (actionToSkipPayload, action) => {
    if (actionToSkipPayload.includes(action.type)) {
        return { type: action.type, payload: "", error: "", meta: "" };
    }
    return action;
};
exports.getActionData = getActionData;
/**
 * The logging middleware that will write logs to the file.
 * @type {LoggingMiddlewareType}
 */
const loggingMiddleware = (actionsToIgnore, actionsToSkipPayload, fileName) => () => (next) => (
/**
 * @type {ActionType}
 */
action) => {
    if (!actionsToIgnore.includes(action.type)) {
        react_native_fs_1.default.write(helpers_1.getFilePath(fileName), helpers_1.createFileText(exports.getActionData(actionsToSkipPayload, action), PeripheralState_1.state.getData), -1, "utf8")
            .then(PeripheralState_1.state.removeAllData)
            .catch(exports.putDataInState(action));
    }
    next(action);
};
exports.loggingMiddleware = loggingMiddleware;
