export function getFileName(): {
    fileName: string;
    filePath: string;
};
export function setupLoggingMiddleware(actionsToIgnore: string[], actionsToSkipPayload: string[], fileName?: string | undefined): Middleware;
export function deleteFile(): Promise<any>;
export function getFileContent(encoding?: ('utf8' | 'base64' | 'ascii')): Promise<string>;
export function purgeFileContent(noOfDays?: number | undefined): void;
import { Middleware } from "redux";
