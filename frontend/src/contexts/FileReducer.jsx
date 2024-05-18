export function fileReducer(state, action) {
    switch (action.type) {
        case "INIT_FILE_LIST":
            return {
                ...action.fileList,
                files: action.fileList.files.map((file) => {
                    file.selected = false;
                    return file;
                }),
            };
        case "SELECT_FILE":
            return {
                ...state,
                files: state.files.map((file) => {
                    if (file.file_id === action.file_id) {
                        return {
                            ...file,
                            selected: !file.selected
                        };
                    }
                    return file;
                }),
            };
        case "SELECT_ALL":
            return {
                ...state,
                files: state.files.map((file) => {
                        return {
                            ...file,
                            selected: !file.selected
                        };
                }),
            };
        case "UNSELECT_ALL":
            return {
                ...state,
                files: state.files.map((file) => {
                    return {...file, selected: false};
                }),
            };
        default:
            return state;
    }
}