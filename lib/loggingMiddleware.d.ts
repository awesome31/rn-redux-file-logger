export function putDataInState(action: ActionType): () => void;
export function getActionData(actionToSkipPayload: string[], action: ActionType): ActionType;
/**
 * The logging middleware that will write logs to the file.
 * @type {LoggingMiddlewareType}
 */
export const loggingMiddleware: LoggingMiddlewareType;
export type LoggingMiddlewareType = (actionsToIgnore: string[], actionsToSkipPayload: string[], fileName: string) => Middleware;
export type ActionType = {
    type: string;
    payload?: any;
    meta?: string | undefined;
    error?: string | undefined;
    value?: any;
};
import { Middleware } from "redux";
