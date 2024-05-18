import {fileDummy, metadataDummy} from "./dummyData";

export function getMetadata() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(metadataDummy);
        }, 1000);
    });
}


export function getFileList(filter) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(fileDummy);
        }, 1000);
    });
}