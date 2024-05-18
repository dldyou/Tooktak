import { useStep } from "../../../contexts/UploadFileContext";
import XlsxReader from "./XlsxReader";
import DirectoryBox from "./DirectoryBox";
import DirectoryReader from "./DirectoryReader";


export default function UploadBox() {
    const step = useStep();
    switch (step) {
        case "xlsx":
            return <XlsxReader />;
        case "directory":
            return <DirectoryReader />;
        case "upload":
            return <DirectoryBox />
        default:
            return null;
    }
}