export class PeripheralState {
    /**
     * Constructor to create the local state.
     * @param {string} data
     */
    constructor(data: string);
    data: string;
    get getData(): string;
    /**
     * String data to add in the state.
     * @param {string} data
     */
    addData(data: string): void;
    /**
     * Function to remove all the data from the state.
     */
    removeAllData(): void;
}
export const state: PeripheralState;
