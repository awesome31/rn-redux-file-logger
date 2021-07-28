export class PeripheralState {
  /**
   * Constructor to create the local state.
   * @param {string} data
   */
  constructor(data) {
    this.data = data;
  }

  get getData() {
    return this.data;
  }

  /**
   * String data to add in the state.
   * @param {string} data
   */
  addData(data) {
    this.data = `${this.data}${data}`;
  }

  /**
   * Function to remove all the data from the state.
   */
  removeAllData() {
    this.data = "";
  }
}

export const state = new PeripheralState("");
