import chai from "chai";
import chaiAsPromised from "chai-as-promised"
import path from "path";
import { FileService } from "../src/file.service";
const { expect } = chai;
chai.use(chaiAsPromised);

const baseDir = path.join(__dirname, "/./fixtures");
const fileService = new FileService();
fileService.baseDir = baseDir;

describe("File Service: ", () => {
    describe("Read Uploaded File", () => {
        it("should return a json file that exists when a file path is passed", async () => {
            const filePath = `${baseDir}/uploaded.json`;
            const jsonFile = await fileService.readUploadedFile(filePath);
            expect(typeof jsonFile).to.equal("string");
        });
        it("should return error on promise rejection for a file that does not exist when file path is passed", async () => {
            const filePath = `${baseDir}/none.json`;
            await expect(fileService.readUploadedFile(filePath)).to.be.rejected
        });
    });

    describe("Read Inverted Index File", () => {
        it("should return a json file that exists when a file path is passed", async () => {
            const jsonFile = await fileService.readIndexFile("invertedIndex");
            expect(typeof jsonFile).to.equal("string");
        });
        it("should return error on promise rejection for a file that does not exist when file path is passed", async () => {
            await expect(fileService.readIndexFile("invert")).to.be.rejected
        });
    });

    describe("Create File", () => {
        it("should create a json file with a specified file name", async () => {
            const isCreated = fileService.create("user", JSON.stringify({ "name": "Richard "}));
            await expect(isCreated).to.be.ok;
        });

        it("should return error on promise rejection for file already existing", async () => {
            const isCreated = fileService.create("user", JSON.stringify({ "name": "Richard "}));
            await expect(isCreated).to.be.rejected;
        });
    });

    describe("Delete File", () => {
        it("should delete an existing json file", async () => {
            const isDeleted = fileService.delete("user");
            await expect(isDeleted).to.be.ok;
        });

        it("should return error on promise rejection for file not existing", async () => {
            const doesNotExist = fileService.delete("user");
            await expect(doesNotExist).to.be.rejected;
        });
    });
});
