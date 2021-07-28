import {
  getFilePath,
  createFileText,
  prepareData,
  getCurrentDate,
  removeOutdatedContent,
  removeOutdatedRow,
} from "../helpers";

jest.mock("react-native-fs", () => ({
  DocumentDirectoryPath: "DirectoryPath",
}));

describe("Helpers test.", () => {
  beforeAll(() => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date(1466424490000));
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  it("Should get the correct file name.", () => {
    expect(getFilePath("test.csv")).toStrictEqual("DirectoryPath/test.csv");
  });

  it("Should replace all commas with ; ", () => {
    expect(prepareData("Thisismyname,")).toStrictEqual("Thisismyname;");
  });

  it("Should return the correct date.", () => {
    expect(getCurrentDate()).toStrictEqual("2016-06-20 17:38:10");
  });

  it("Should create the file text correctly.", () => {
    expect(
      createFileText(
        {
          error: undefined,
          meta: undefined,
          payload: undefined,
          type: "TYPE",
        },
        ""
      )
    ).toStrictEqual('2016-06-20 17:38:10,TYPE,"",,\n');
    expect(
      createFileText(
        {
          error: "Error",
          meta: "MetaData",
          payload: { data: "Data", someOtherData: "DataTwo" },
          type: "TYPE",
        },
        ""
      )
    ).toStrictEqual(
      '2016-06-20 17:38:10,TYPE,{"data":"Data";"someOtherData":"DataTwo"},MetaData,Error\n'
    );

    expect(
      createFileText(
        {
          error: "Error",
          meta: "MetaData",
          payload: { data: "Data", someOtherData: "DataTwo" },
          type: "TYPE",
          value: { data: "Data", someOtherData: "DataThree" },
        },
        ""
      )
    ).toStrictEqual(
      '2016-06-20 17:38:10,TYPE,{"data":"Data";"someOtherData":"DataThree"},MetaData,Error\n'
    );
    expect(
      createFileText(
        {
          error: "Error",
          meta: "MetaData",
          payload: { data: "Data" },
          type: "TYPE",
        },
        'OTHER_DATA,{"otherData":"OtherData"},OtherMetaData,OtherError\n'
      )
    ).toStrictEqual(
      'OTHER_DATA,{"otherData":"OtherData"},OtherMetaData,OtherError\n2016-06-20 17:38:10,TYPE,{"data":"Data"},MetaData,Error\n'
    );
  });
});

describe("Row purging helpers.", () => {
  it("Should remove the outdated row correctly if the time difference between row data and current date is greater than the supplied no of days.", () => {
    const result = removeOutdatedRow(new Date(1466424490000), 2)(
      "",
      '2016-06-17 17:38:10,TYPE,{"data":"Data";"someOtherData":"DataTwo"},MetaData,Error'
    );

    expect(result).toStrictEqual("");
  });

  it("Should not remove the outdated row correctly if the time difference between row data and current date is less than the supplied no of days.", () => {
    const result = removeOutdatedRow(new Date(1466424490000), 2)(
      "",
      '2016-06-19 17:38:10,TYPE,{"data":"Data";"someOtherData":"DataTwo"},MetaData,Error'
    );

    expect(result).toStrictEqual(
      '2016-06-19 17:38:10,TYPE,{"data":"Data";"someOtherData":"DataTwo"},MetaData,Error\n'
    );
  });
});

describe("File purging helpers.", () => {
  beforeAll(() => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date(1466424490000));
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  it("Should remove all outdated rows and return new file content.", () => {
    const newFileContent = removeOutdatedContent(2)(
      '2016-06-17 17:38:10,TYPE,{"data":"Data";"someOtherData":"DataTwo"},MetaData,Error\n2016-06-19 17:38:10,TYPE,{"data":"Data";"someOtherData":"DataTwo"},MetaData,Error\n2016-06-18 20:38:10,TYPE,{"data":"Data";"someOtherData":"DataTwo"},MetaData,Error\n2016-06-18 15:38:00,TYPE,{"data":"Data";"someOtherData":"DataTwo"},MetaData,Error\n'
    );

    expect(newFileContent).toStrictEqual(
      '2016-06-19 17:38:10,TYPE,{"data":"Data";"someOtherData":"DataTwo"},MetaData,Error\n2016-06-18 20:38:10,TYPE,{"data":"Data";"someOtherData":"DataTwo"},MetaData,Error\n'
    );
  });
});
