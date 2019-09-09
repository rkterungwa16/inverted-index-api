import fs from "fs";
import path from "path";
import { IFileService } from "./types";

export class FileService implements IFileService {
    public baseDir: string;
    constructor() {
        this.baseDir = path.join(__dirname, "/../.data");
    }
    public readUploadedFile = (filePath: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, "utf8", (err, uploadedBooks) => {
                if (!err && uploadedBooks) {
                    resolve(uploadedBooks);
                }
                reject(err);
            });
        });
    };

    public openFile = (
        fileName: string,
        data: string,
        flag: string,
    ): Promise<{
        fileDescriptor: number;
        fileData: string;
    }> => {
        return new Promise((resolve, reject) => {
            fs.open(`${this.baseDir}/${fileName}.json`, flag, (err, fileDescriptor) => {
                if (err) {
                    const fileAlreadyExistsError = new Error();
                    fileAlreadyExistsError.message = "Could not create new file, it may already exist";
                    return reject(fileAlreadyExistsError);
                }
                return resolve({
                    fileDescriptor,
                    fileData: data,
                });
            });
        });
    };

    public writeIntoFile = (fileDescriptor: number, stringData: string): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            fs.writeFile(fileDescriptor, stringData, () => {
                return resolve(true);
            });
        });
    };

    public create = async (fileName: string, data: string): Promise<boolean> => {
        try {
            const openedFile = await this.openFile(fileName, data, "wx");
            const writtenData = await this.writeIntoFile(openedFile.fileDescriptor, openedFile.fileData);
            return writtenData;
        } catch (err) {
            throw err;
        }
    };

    public readIndexFile = (fileName: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            fs.readFile(`${this.baseDir}/${fileName}.json`, "utf8", (err, indexValues) => {
                if (!err && indexValues) {
                    return resolve(indexValues);
                }
                return reject(new Error("Index not yet created for this collection"));
            });
        });
    };

    public delete = (fileName: string): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            fs.unlink(`${this.baseDir}/${fileName}.json`, err => {
                if (err) {
                    const deleteUserError = new Error("Could not delete specified file");
                    return reject(deleteUserError);
                }

                return resolve(true);
            });
        });
    };
}
