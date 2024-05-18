import { createContext, useContext, useReducer, useRef, useState } from "react";
import uploadFileReducer from "./UploadFileReducer";

const DirectoryContext = createContext(null);
const XlsxContext = createContext(null);
const FileContext = createContext(null);
const StepContext = createContext(null);

export function UploadFileProvider({ children }) {
    const [directoryList, dispatch] = useReducer(uploadFileReducer, {});
    const [step, setStep] = useState("xlsx");
    const xlsxRef = useRef(null);
    const fileRef = useRef(null);
    return (
        <XlsxContext.Provider value={xlsxRef}>
            <FileContext.Provider value={fileRef}>
                <DirectoryContext.Provider value={{ directoryList, dispatch }}>
                    <StepContext.Provider value={{ step, setStep }}>
                        {children}
                    </StepContext.Provider>
                </DirectoryContext.Provider>
            </FileContext.Provider>
        </XlsxContext.Provider>)
}

export function useInitXlsx() {
    const xlsxData = useContext(XlsxContext);
    const { setStep } = useContext(StepContext);
    return (data) => {
        xlsxData.current = data;
        setStep("directory");
    };
}

export function useInitFile() {
    const file = useContext(FileContext);
    const { setStep } = useContext(StepContext);
    const xlsxData = useContext(XlsxContext);
    const { dispatch } = useContext(DirectoryContext);
    return (files) => {
        const directory = {};
        Object.entries(files).forEach(([_, data]) => {
            const path = data.webkitRelativePath.split("/");
            const key = path[1] + "/" + path[2] + "/" + path[3];
            directory[key] = (data);
        })
        file.current = directory;
        dispatch({ type: "INIT_DATA", xlsx: xlsxData.current, file: file.current });
        setStep("upload");
    }
}

export function useDirectory() {
    const { directoryList } = useContext(DirectoryContext);
    return directoryList;
}

export function useStep() {
    const { step } = useContext(StepContext);
    return step;
}