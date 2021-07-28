import RNFS from "react-native-fs";
import {
  getActionData,
  loggingMiddleware,
  putDataInState,
} from "../loggingMiddleware";
import { state } from "../PeripheralState";
import configureStore from "redux-mock-store";

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
    putDataInState({
      error: "Error",
      meta: "MetaData",
      payload: { data: "Data" },
      type: "TYPE",
    })();

    expect(state.addData).toHaveBeenCalledWith(
      '2016-06-20 17:38:10,TYPE,{"data":"Data"},MetaData,Error\n'
    );
  });

  it("Should call the react-native-fs write function with correct arguments if action type is not a part of actionsToIgnore array.", () => {
    const middleware = [loggingMiddleware([], [], "test.csv")];
    const mockStore = configureStore(middleware);
    const store = mockStore({});
    store.dispatch({ type: "TYPE1" });

    expect(RNFS.write).toHaveBeenCalledWith(
      "DirectoryPath/test.csv",
      '2016-06-20 17:38:10,TYPE1,"",,\n',
      -1,
      "utf8"
    );
  });

  it("Should note call the react-native-fs write function if action type is  a part of the actionsToIgnore array.", () => {
    const middleware = [loggingMiddleware(["TYPE1"], [], "test")];
    const mockStore = configureStore(middleware);
    const store = mockStore({});
    store.dispatch({ type: "TYPE1" });

    expect(RNFS.write).toHaveBeenCalledTimes(0);
  });

  it("Should get the action data.", () => {
    expect(
      getActionData(["TYPE1"], {
        type: "TYPE1",
        payload: "SOME_PAYLOAD",
        error: "SOME_ERROR",
        meta: "SOME_META",
      })
    ).toStrictEqual({
      type: "TYPE1",
      payload: "",
      error: "",
      meta: "",
    });

    expect(
      getActionData(["TYPE2"], {
        type: "TYPE1",
        payload: "SOME_PAYLOAD",
        error: "SOME_ERROR",
        meta: "SOME_META",
      })
    ).toStrictEqual({
      type: "TYPE1",
      payload: "SOME_PAYLOAD",
      error: "SOME_ERROR",
      meta: "SOME_META",
    });
  });
});
