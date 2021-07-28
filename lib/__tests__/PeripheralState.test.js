"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PeripheralState_1 = require("../PeripheralState");
describe("PeripheralState class works as expected.", () => {
    const state = new PeripheralState_1.PeripheralState("");
    beforeEach(() => {
        state.removeAllData();
    });
    it("Should make the state empty when initialized.", () => {
        expect(state.getData).toStrictEqual("");
    });
    it("Should add data to the state correctly.", () => {
        state.addData('TYPE,{"data":"Data"},MetaData,Error\n');
        expect(state.getData).toStrictEqual('TYPE,{"data":"Data"},MetaData,Error\n');
    });
    it("Should remove all the data correctly.", () => {
        state.addData('TYPE,{"data":"Data"},MetaData,Error\n');
        state.removeAllData();
        expect(state.getData).toStrictEqual("");
    });
});
