"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fileHelpers_1 = require("../fileHelpers");
const react_native_fs_1 = __importDefault(require("react-native-fs"));
jest.mock("react-native-fs", () => ({
    DocumentDirectoryPath: "DirectoryPath",
    unlink: jest.fn().mockResolvedValueOnce("someValue"),
    readFile: jest.fn(),
}));
describe("File Deletion tests.", () => {
    it("Should call the unlink function and delete the file.", () => {
        fileHelpers_1.unlinkFile("test.csv");
        expect(react_native_fs_1.default.unlink).toHaveBeenCalledWith("DirectoryPath/test.csv");
    });
    it("Shoud call the readFile function with the correct arguments.", () => {
        fileHelpers_1.readFile("ascii", "test.csv");
        expect(react_native_fs_1.default.readFile).toHaveBeenCalledWith("DirectoryPath/test.csv", "ascii");
    });
});
