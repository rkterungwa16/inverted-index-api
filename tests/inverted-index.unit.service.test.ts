import chai from "chai";
import chaiAsPromised from "chai-as-promised"
import path from "path";
import { FileService } from "../src/file.service";
import { InvertedIndexService } from "../src/inverted-index.service";
const { expect } = chai;
chai.use(chaiAsPromised);

const baseDir = path.join(__dirname, "/./fixtures");
const fileService = new FileService();
fileService.baseDir = baseDir;

const invertedIndexService = new InvertedIndexService();
invertedIndexService.fileService = fileService;

describe("Inverted Index Service: ", () => {
    describe("Extract Book from Json file", () => {
        it("should return upload json", async () => {
            const filePath = `${baseDir}/uploaded.json`;
            const jsonFile = await invertedIndexService.extractBookJsonFromFile(filePath, "application/json");
            expect(typeof jsonFile).to.equal("string");
        });
        it("should return error for wrong mime type. mime type must be application/json", async () => {
            const filePath = `${baseDir}/none.json`;
            await expect(invertedIndexService.extractBookJsonFromFile(filePath, "")).to.be.rejected
        });
    });

    describe("Extract Unique all words from book", () => {
        it("should return all unique words in book", () => {
            const books = [{ title: "bible", text: "this is the book of mathew " }];
            const uniqueWords = invertedIndexService.extractTotalUniqueWordsForEachBook(books);
            const containsBible = uniqueWords[0].includes(books[0].title);
            expect(containsBible).to.equal(true);
        });
    });

    describe("Ensure valid book document", () => {
        it("should return error for an empty book", () => {
            expect(() => { throw invertedIndexService.ensureValidBookFormat([]) }).to.throw();
        });

        it("should confirm that book document is valid", () => {
            const isValid = invertedIndexService.ensureValidBookFormat([{ title: "a", text: "b" }]);
            expect(Boolean(isValid)).to.equal(true);
        });
    });

    describe("Create Index", () => {
        it("should create index for an uploaded book json", async () => {
            const filePath = `${baseDir}/uploaded.json`;
            await expect(invertedIndexService.createIndex(filePath, "application/json", "users")).to.be.ok;
        });

        it("should throw an error for wrong mimetype input", async () => {
            const filePath = `${baseDir}/uploaded.json`;
            await expect(invertedIndexService.createIndex(filePath, "", "user")).to.be.rejected;
        });
    });

    describe("Search index", () => {
        it("should search for the correct word", async () => {
            await expect(invertedIndexService.search("the", "invertedIndex")).to.be.ok;
        });

        it("should return error message for item not in index", async () => {
            await expect(invertedIndexService.search("this", "invertedIndex")).to.be.rejected;
        });
    });
});
