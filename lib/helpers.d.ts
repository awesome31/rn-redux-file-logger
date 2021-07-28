export function createFileText(action: ActionType, stateData: string): string;
export function getFilePath(fileName: string): string;
export function prepareData(data: string): string;
export function getCurrentDate(): string;
export function removeOutdatedRow(currentDate: Date, noOfDays: number): (acc: string, row: string) => string;
export function removeOutdatedContent(noOfDays: number): (res: string) => string;
import { ActionType } from "./loggingMiddleware";
