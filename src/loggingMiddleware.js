import { Middleware } from "redux";
import RNFS from "react-native-fs";
import { createFileText, getFilePath } from "./helpers";
import { state } from "./PeripheralState";

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
export const putDataInState = (action) => () =>
  state.addData(createFileText(action, ""));

/**
 *
 * @param {string[]} actionToSkipPayload
 * @param {ActionType} action
 * @return {ActionType}
 */
export const getActionData = (actionToSkipPayload, action) => {
  if (actionToSkipPayload.includes(action.type)) {
    return { type: action.type, payload: "", error: "", meta: "" };
  }

  return action;
};

/**
 * The logging middleware that will write logs to the file.
 * @type {LoggingMiddlewareType}
 */
export const loggingMiddleware =
  (actionsToIgnore, actionsToSkipPayload, fileName) =>
  () =>
  (next) =>
  (
    /**
     * @type {ActionType}
     */
    action
  ) => {
    if (!actionsToIgnore.includes(action.type)) {
      RNFS.write(
        getFilePath(fileName),
        createFileText(
          getActionData(actionsToSkipPayload, action),
          state.getData
        ),
        -1,
        "utf8"
      )
        .then(state.removeAllData)
        .catch(putDataInState(action));
    }

    next(action);
  };
