import { Request } from "express";
export interface IMRequest extends Request {
    file: File;
}
// mimetypes: application/json, text/plain, text/csv, text/css
export interface File {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    location: string;
    filename: string;
    path: string;
    buffer: Buffer;
}
export interface IBook {
    title: string;
    text: string;
}

export interface ICreatedIndex {
    [x: string]: number[];
}

export interface IFileService {
    readUploadedFile(filePath: string): Promise<string>;
    openFile(fileName: string, data: string, flag: string): Promise<{ fileDescriptor: number; fileData: string }>;
    writeIntoFile(fileDescriptor: number, stringData: string): Promise<boolean>;
    create(fileName: string, data: string): Promise<boolean>;
    readIndexFile(fileName: string): Promise<string>;
    delete(fileName: string): Promise<boolean>;
}

export interface IInvertedIndexService {
    extractBookJsonFromFile(filePath: string, mimetype: string): Promise<string>;
    extractTotalUniqueWordsForEachBook(books: IBook[]): Array<[string]>;
    ensureValidBookFormat(books: IBook[]): boolean;
    createIndex(filePath: string, mimetype: string, booksCollectionName: string): Promise<{ createdIndex: ICreatedIndex }>;
    search(searchTerm: string, bookCollectionName: string): Promise<{ [x: string]: number[] }>;
}
