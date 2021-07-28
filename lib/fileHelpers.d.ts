export function unlinkFile(fileName: string): Promise<any>;
export function readFile(encoding: ('utf8' | 'base64' | 'ascii'), fileName: string): Promise<string>;
export function purgeFile(fileName: string, noOfDays: number): void;
