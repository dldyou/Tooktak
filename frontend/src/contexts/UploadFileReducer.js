export default function uploadFileReducer(state, action) {
    switch (action.type) {
        case "INIT_DATA":
            const directoryList = {};
            // 1. xlsx 파일의 데이터를 읽어서 attributeList와 directoryList를 만든다.
            Object.entries(action.xlsx).forEach(([key, value]) => {
                directoryList[key] = {attributes: value, state: "xlsxOnly", files: {}};
            });
            directoryList["no_xlsx_data"] = {state: "fileOnly", files: {}};
            //2. file의 데이터를 읽어서 directoryList에 추가한다.
            Object.entries(action.file).forEach(([key, value]) => {
                const path = key.split("/");
                const dirPath = path[0] + "/" + path[1];
                if (directoryList[dirPath]) {
                    directoryList[dirPath].files[key] = value;
                    directoryList[dirPath].state = "ready";
                } else {
                    directoryList["no_xlsx_data"].files[key] = value;
                }
            });
            return directoryList;
        default:
            return state;
    }
}