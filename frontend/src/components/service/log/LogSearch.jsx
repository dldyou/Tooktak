import { Button } from "../../commons/Button"
import { useQueryParams } from "../../../contexts/Querycontext";
import { useSyncQueryParams } from "../../../services/log";
import { useLogs } from "../../../contexts/LogContext";
export function LogSearch() {
    const params = useQueryParams();
    const pageNum = params.queryParams.page;
    const syncQueryParams = useSyncQueryParams();
    const { fetchLogs } = useLogs();

    console.log(pageNum);
    const handleSearch = (e) => {
        e.preventDefault();
        syncQueryParams(params);
        fetchLogs();
    };
    return (
        <>
            <Button onClick={handleSearch} children={"search"} />
        </>
    )
}