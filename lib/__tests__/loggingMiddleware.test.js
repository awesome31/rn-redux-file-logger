"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_fs_1 = __importDefault(require("react-native-fs"));
const loggingMiddleware_1 = require("../loggingMiddleware");
const PeripheralState_1 = require("../PeripheralState");
const redux_mock_store_1 = __importDefault(require("redux-mock-store"));
jest.mock("../PeripheralState", () => ({
    state: {
        addData: jest.fn(),
        removeAllData: jest.fn(),
        getData: "",
    },
}));
jest.mock("react-native-fs", () => ({
    write: jest
        .fn()
        .mockResolvedValueOnce(() => ({}))
        .mockRejectedValueOnce(() => ({})),
    DocumentDirectoryPath: "DirectoryPath",
}));
// @ts-ignore
let spyOn;
describe("Logging middlware functions test.", () => {
    beforeEach(() => jest.clearAllMocks());
    beforeAll(() => {
        const mockDate = new Date(1466424490000);
        // @ts-ignore
        spyOn = jest.spyOn(global, "Date").mockImplementation(() => mockDate);
    });
    afterAll(() => {
        // @ts-ignore
        spyOn.mockRestore();
    });
    it("Should call the addData method when putDataInState function is called.", () => {
        loggingMiddleware_1.putDataInState({
            error: "Error",
            meta: "MetaData",
            payload: { data: "Data" },
            type: "TYPE",
        })();
        expect(PeripheralState_1.state.addData).toHaveBeenCalledWith('2016-06-20 17:38:10,TYPE,{"data":"Data"},MetaData,Error\n');
    });
    it("Should call the react-native-fs write function with correct arguments if action type is not a part of actionsToIgnore array.", () => {
        const middleware = [loggingMiddleware_1.loggingMiddleware([], [], "test.csv")];
        const mockStore = redux_mock_store_1.default(middleware);
        const store = mockStore({});
        store.dispatch({ type: "TYPE1" });
        expect(react_native_fs_1.default.write).toHaveBeenCalledWith("DirectoryPath/test.csv", '2016-06-20 17:38:10,TYPE1,"",,\n', -1, "utf8");
    });
    it("Should note call the react-native-fs write function if action type is  a part of the actionsToIgnore array.", () => {
        const middleware = [loggingMiddleware_1.loggingMiddleware(["TYPE1"], [], "test")];
        const mockStore = redux_mock_store_1.default(middleware);
        const store = mockStore({});
        store.dispatch({ type: "TYPE1" });
        expect(react_native_fs_1.default.write).toHaveBeenCalledTimes(0);
    });
    it("Should get the action data.", () => {
        expect(loggingMiddleware_1.getActionData(["TYPE1"], {
            type: "TYPE1",
            payload: "SOME_PAYLOAD",
            error: "SOME_ERROR",
            meta: "SOME_META",
        })).toStrictEqual({
            type: "TYPE1",
            payload: "",
            error: "",
            meta: "",
        });
        expect(loggingMiddleware_1.getActionData(["TYPE2"], {
            type: "TYPE1",
            payload: "SOME_PAYLOAD",
            error: "SOME_ERROR",
            meta: "SOME_META",
        })).toStrictEqual({
            type: "TYPE1",
            payload: "SOME_PAYLOAD",
            error: "SOME_ERROR",
            meta: "SOME_META",
        });
    });
});
