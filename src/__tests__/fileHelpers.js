import { unlinkFile, readFile } from "../fileHelpers";
import RNFS from "react-native-fs";

jest.mock("react-native-fs", () => ({
  DocumentDirectoryPath: "DirectoryPath",
  unlink: jest.fn().mockResolvedValueOnce("someValue"),
  readFile: jest.fn(),
}));

describe("File Deletion tests.", () => {
  it("Should call the unlink function and delete the file.", () => {
    unlinkFile("test.csv");

    expect(RNFS.unlink).toHaveBeenCalledWith("DirectoryPath/test.csv");
  });

  it("Shoud call the readFile function with the correct arguments.", () => {
    readFile("ascii", "test.csv");

    expect(RNFS.readFile).toHaveBeenCalledWith(
      "DirectoryPath/test.csv",
      "ascii"
    );
  });
});
