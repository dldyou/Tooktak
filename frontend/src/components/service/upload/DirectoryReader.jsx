import {useInitFile} from "../../../contexts/UploadFileContext";
import {DirectoryInputBox} from "../../commons/DirectoryInputBox";

export default function DirectoryReader(){
    const initDirectory=useInitFile();
    const handleDirectoryChange = event => {
        initDirectory(event.target.files);
    };

    return <DirectoryInputBox
        color="yellow"
        label="폴더 선택"
        onChange={handleDirectoryChange}
        directory={true}
    />
}