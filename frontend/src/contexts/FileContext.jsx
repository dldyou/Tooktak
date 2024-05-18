import { createContext, useContext, useReducer } from "react";
import { fileReducer } from "./FileReducer";

const initialState = {
    hospital: "",
    attributes: [],
    files: [],
};

const FileContext = createContext(null);
const FileDispatchContext = createContext(null);

export function FileProvider({ children }) {
    const [fileList, dispatch] = useReducer(fileReducer, initialState);
    return (
        <FileContext.Provider value={fileList}>
            <FileDispatchContext.Provider value={dispatch}>
                {children}
            </FileDispatchContext.Provider>
        </FileContext.Provider>
    );
}

export function useFileHospital() {
    const data = useContext(FileContext);
    return data.hospital ? data.hospital : "";
}

export function useFileAttribute() {
    const data = useContext(FileContext);
    return data.attributes ? data.attributes : [];
}

export function useFileList() {
    const data = useContext(FileContext);
    return data.files ? data.files : [];
}

export function useInitFile() {
    const dispatch = useContext(FileDispatchContext);
    return (fileList) => {
        dispatch({ type: "INIT_FILE_LIST", fileList: fileList });
    }
}


export function useSelectFile() {
    const dispatch = useContext(FileDispatchContext);
    const select = (file_id) => {
        dispatch({ type: "SELECT_FILE", file_id: file_id });
    };
    const selectAll = () => {
        dispatch({ type: "SELECT_ALL" });
    };
    const unselectAll = () => {
        dispatch({ type: "UNSELECT_ALL" });
    };
    return { select, selectAll, unselectAll };
}