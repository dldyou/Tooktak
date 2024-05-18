import {Button} from "../../../commons/Button";
import {useInitFile} from "../../../../contexts/FileContext";
import {getFileList} from "../../../../services/searchApi";
import {useResetAttribute} from "../../../../contexts/MetadataContext";

export default function SearchButtons() {
    const initFile=useInitFile();
    const resetAttribute= useResetAttribute();
    const onSearch =()=> getFileList().then((fileList) => {
        initFile(fileList);
    });
    return (
        <>
            <Button color="red" onClick={resetAttribute}>Reset</Button>
            <Button color="green" onClick={onSearch}>Search</Button>
        </>
    );
}