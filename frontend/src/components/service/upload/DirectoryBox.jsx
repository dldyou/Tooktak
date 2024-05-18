import {useDirectory} from "../../../contexts/UploadFileContext";
import {Directory} from "../../commons/Directory";
import {Grid} from "../../layout/Grid";

export default function DirectoryBox() {
    const directoryList = useDirectory();
    return <Grid min={8}>
        {Object.entries(directoryList).map(([key, value]) =>
            <Directory key={key} directory={value} path={key}/>
        )}
    </Grid>;
}