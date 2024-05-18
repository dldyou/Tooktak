import {FileInputBox} from "../../commons/FileInputBox";
import {useInitXlsx, useStep} from "../../../contexts/UploadFileContext";
import {handleFileUpload} from "../../../utility/xlsx";


export default function XlsxReader() {
    const initXlsx=useInitXlsx();
    const onChange=(event)=>{
        handleFileUpload(event,initXlsx);
    }
    return <FileInputBox onChange={onChange} accept=".xlsx, .xls"  color={"blue"} label={"엑셀파일"}/>
}