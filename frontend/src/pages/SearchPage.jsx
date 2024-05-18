import SearchBox from "../components/service/search/metadata/SearchBox";
import FileBox from "../components/service/search/file/FileBox";
import { FileProvider } from "../contexts/FileContext";

export default function Search() {
    return (
        <FileProvider>
            <SearchBox />
            <FileBox />
        </FileProvider>
    );
}