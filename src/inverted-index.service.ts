import { Inject } from "typescript-ioc";
import { FileService } from "./file.service";
import { IBook, ICreatedIndex, IFileService, IInvertedIndexService } from "./types";
export class InvertedIndexService implements IInvertedIndexService {
    @Inject
    private fileService!: FileService;

    public extractBookJsonFromFile = async (filePath: string, mimetype: string): Promise<string> => {
        if (mimetype !== "application/json") {
            throw new Error("Only json files allowed");
        }
        return (await this.fileService.readUploadedFile(filePath)) as string;
    };

    public extractTotalUniqueWordsForEachBook = (books: IBook[]): Array<[string]> => {
        return books.map(book => {
            const words = book.title.split(" ").concat(book.text.split(" "));
            const uniqueTotalWordsInBook = new Set(words);
            return Array.from(uniqueTotalWordsInBook) as [string];
        });
    };

    public ensureValidBookFormat = (books: IBook[]): boolean => {
        const collectionIsValid = books.every(book => {
            return book.text && book.title;
        });

        if (!collectionIsValid) {
            throw new Error("All books in collection must have text and title");
        }
        return collectionIsValid;
    };

    public createIndex = async (
        filePath: string,
        mimetype: string,
        booksCollectionName: string,
    ): Promise<{
        createdIndex: ICreatedIndex;
    }> => {
        try {
            const bookJson = await this.extractBookJsonFromFile(filePath, mimetype);
            const books = JSON.parse(bookJson) as IBook[];
            this.ensureValidBookFormat(books);
            const createdIndex = {} as ICreatedIndex;
            this.extractTotalUniqueWordsForEachBook(books).forEach((book, bookIndex) => {
                book.forEach((word: string) => {
                    if (createdIndex[word]) {
                        createdIndex[word] = createdIndex[word].concat([bookIndex]);
                    } else {
                        createdIndex[word] = [bookIndex];
                    }
                });
            });

            await this.fileService.create(booksCollectionName, JSON.stringify(createdIndex));
            // TODO create file that contains created index
            return { createdIndex };
        } catch (err) {
            throw err;
        }
    };

    public search = async (searchTerm: string, bookCollectionName: string): Promise<{ [x: string]: number[] }> => {
        try {
            const indexForCurrentBookCollection = JSON.parse(await this.fileService.readIndexFile(bookCollectionName));
            const searchTerms = searchTerm.split(" ");
            const searchIndexItems = Object.keys(indexForCurrentBookCollection).filter(indexItem => {
                return searchTerms.includes(indexItem);
            });
            if (!searchIndexItems) {
                throw new Error("Book collections does not contain search items");
            }
            let searchResultValue = [] as number[];

            searchIndexItems.forEach(item => {
                searchResultValue = searchResultValue.concat(indexForCurrentBookCollection[item]);
            });
            return {
                [searchTerm]: Array.from(new Set(searchResultValue)),
            };
        } catch (err) {
            throw err;
        }
    };
}
