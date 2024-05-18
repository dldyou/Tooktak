import { Button } from "../../commons/Button"
import { useQueryParams } from "../../../contexts/Querycontext";
import { useLogs } from "../../../contexts/LogContext";

export function LogNextPage() {
    const params = useQueryParams();
    const pageNum = params.queryParams.page;
    const logsPerPage = 5;
    const { logsCount, updateAndFetchLogs } = useLogs();


    const handleNextPage = (e) => {
        e.preventDefault();
        if (logsPerPage === logsCount) {
            updateAndFetchLogs("page", pageNum + 1);
        }
    };
    return (
        <>
            <Button
                color="purple"
                onClick={handleNextPage} children={"next page"} />
        </>
    )
}